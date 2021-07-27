import * as React from "react";

import api from "../question/api";
import QuestionCard from "../question/components/QuestionCard";
import {Question} from "../question/types";
import Button from "../ui/controls/Button";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [points, setPoints] = React.useState<number>(0);
  const [status, setStatus] = React.useState<"pending" | "resolved" | "finished">("pending");
  const question = questions[currentQuestion];

  function onAnswer(text: string) {
    if (question.correct_answer == text) {
      switch (question.type) {
        case "boolean":
          setPoints((points) => points + 5);
          break;
        case "multiple":
          setPoints((points) => points + 10);
          break;
      }
    } else {
      alert("Respuesta seleccionada incorrecta");
    }

    if (currentQuestion + 1 == questions.length) {
      setStatus("finished");
    } else {
      setCurrentQuestion((question) => question + 1);
    }
  }

  React.useEffect(() => {
    api.list().then((questions) => {
      setQuestions(questions);
      setStatus("resolved");
    });
  }, []);

  if (status == "pending") {
    return <span>Loading...</span>;
  }

  if (status == "finished") {
    return (
      <div>
        <span className="earnedPoints">You earned {points} points</span>
        <br />
        <button className="reloadButton" onClick={() => location.reload()}>
          Play again!
        </button>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <QuestionCard
        footer={` ${question.difficulty} | ${question.category}`}
        header={`${currentQuestion + 1}/ ${questions.length}`}
      >
        {unescape(question.question)}
      </QuestionCard>
      <nav className={styles.answers}>
        {[...question.incorrect_answers, question.correct_answer]
          .sort((a, b) => a.localeCompare(b))
          .map((answer) => (
            <Button key={answer} onClick={() => onAnswer(answer)}>
              {answer}
            </Button>
          ))}
      </nav>
    </main>
  );
};

export default App;
