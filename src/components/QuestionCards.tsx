import React from 'react'
import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCards: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions 
}) =>(
    <div className="card">
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button className={`btn-option ${!!userAnswer ? "disabled" : ""}`} disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCards
