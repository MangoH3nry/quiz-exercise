import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

function Question(props){
    
    const [displayedAnswers, setDisplayedAnswers] = useState(props.answers) //(!) Passing props to the state?

    const handleUserSelection = (e) => {
        const {index, parent_id} = e.target.attributes; 
        setDisplayedAnswers(previosAnswers => [previosAnswers[index.value]]);
        
        const answerObject = {
            questionID : parent_id.value,
            answer: e.target.value
        }

        props.saveUserAnswer(answerObject); //We also save the user's answer in the state.
    }

    const handleReset = (e) => {
        const {parent_id} = e.target.attributes;
        setDisplayedAnswers(props.answers); //We render all of the answer options again
        props.removeUserAnswer(parent_id.value); //We also remov user's answer from the state
    }


    return(
        <div>
            <p>{props.question}</p>
            <div>
                {displayedAnswers.map((answer, index) => (
                    <button key={uuidv4()} index={index} parent_id={props.id} value={answer} onClick={handleUserSelection}>{answer}</button>
                ))}
            </div>
            <button parent_id={props.id} onClick={handleReset}>Reset</button>
        </div>
    )
}

export default Question;