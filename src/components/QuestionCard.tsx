import React from 'react';

//TYPES
import { AnswerObject } from '../App';

//STYLES
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'


//because of typescript we have to specify the props
//we are using for this component

type Props = {
    question: string;
    answers: string[];
    //the callback function below is from App.tsx Check Answer Function
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
}

//React.FC tells typescript that this is a functional component
//and we use <Props> to specify the props we want to use which are above

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNum, 
    totalQuestions,
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                    key={answer}
                    //? used below for optional chaining in typescript
                    //in case we dont have a value it will show undefined 
                    //instead of throwing an error
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;