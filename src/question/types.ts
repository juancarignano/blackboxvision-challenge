export interface Question {
  category: string;
  type: "boolean" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
