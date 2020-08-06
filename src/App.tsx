import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';

//STYLES
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  //QuestionState and AnswerObject below is for typescript to know that
  //it is going to be an array of QuestionState and AnswerObject respectively
  const [questions, setQuestions ] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver ] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions (
      TOTAL_QUESTIONS, 
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users inputed answer
      const answer = e.currentTarget.value;

      //Compare Users inputed answer to correct answer
      const correct = questions[number].correct_answer === answer;

      //Increament Score if Users inputed Answer is correct
      if (correct) setScore(prev => prev + 1);

      //Save Users inputed answer in the User Answers array
      const answerObject = {
        question: questions[number].question,
        answer, //same as answer: answer since both are the same
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      //setUserAnswers below used to put the above in the answer array
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    //move onto the next question if the user is not on the last
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1>QUIZ APP</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button> )
        : null
      }

    {!gameOver ? <p className="score">Score: {score}</p> : null}

      {loading ? <p>Loading Questions...</p> : null}

      {!loading && !gameOver ? (
        <QuestionCard 
          //number + 1 because its used for an array and we want
          //questions to start at 1 not 0 from useState(0) above
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />)
        : null
      }
      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>)
        : null
      }
      </Wrapper>
    </>
  );
}

export default App;
