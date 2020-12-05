import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

function Question(props){
    
    const [displayedAnswers, setDisplayedAnswers] = useState(props.answers) //(!) Passing props to the state?

    const handleUserSelection = (e) => {
        //After this, we only gonna render the button with the user's choice.
        const {index, parent_id} = e.target.attributes; 
        setDisplayedAnswers(previosAnswers => [previosAnswers[index.value]]);
        
        //We create an answer object that's gonna subsequently saved in the state.
        const answerObject = {
            questionID : parent_id.value
        }

        if(props.correct_answer === e.target.value){
            answerObject.correctlyAnswered = true
        }else{
            answerObject.correctlyAnswered = false
        }

        props.saveUserAnswer(answerObject); //We also save the user's answer in the state.
    }

    const handleReset = (e) => {
        const {parent_id} = e.target.attributes;
        setDisplayedAnswers(props.answers); //We render all of the answer options again
        props.removeUserAnswer(parent_id.value); //We also remov user's answer from the state
    }


    return(
        <React.Fragment>
            <p>{props.question}</p>
            <div>
                {displayedAnswers.map((answer, index) => (
                    <button key={uuidv4()} index={index} parent_id={props.id} value={answer} onClick={handleUserSelection}>{answer}</button>
                ))}
            </div>
            <button parent_id={props.id} onClick={handleReset}>Reset</button>
        </React.Fragment>
    )
}

export default Question;