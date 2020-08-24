import React, { useState } from 'react';
import { fetchQuizQuestions, Question } from './API'
import { QuestionState, Difficulty } from './API'
import QuestionCard from './components/QuestionCards';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)
  const TOTAL_QUESTIONS = 10;

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user Answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //score if its correct
      if (correct) setScore(prev => prev + 1);
      //save answer in array of userAnswer
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, AnswerObject]);
    }
  }

  const nextQuestion = () => {
    //move to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="main-card">
      <h1>React Typescript Quiz</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <p className="description">Hi everybody this is a entertainment web application. It is so easy, Come on just show your knowledge.</p>
            <button className="btn-start" onClick={startTrivia}>
              Start now!
            </button>
          </>
        ) : null
      }
      {loading && (<div className="loading"><p>loading</p></div>)}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} />)
      }
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="btn-next" onClick={nextQuestion}>
            Next question
          </button>) : null
      }
            {!gameOver ? <p className="score">My score: {score}</p> : null}
    </div>
  );
}

export default App;
