import * as React from "react";

import styles from "./QuestionCard.module.scss";

interface Props {
    header: string;
    footer: string;
}

const QuestionCard: React.FC<Props> = ({header, children, footer}) => (
<div className={styles.container}>
    <header>{header}</header>
    <section>{children}</section>
    <footer>{footer}</footer>
</div>
);

export default QuestionCard;
