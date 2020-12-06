import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import generateAnswerObj from '../utils/generateAnswerObj';

function Question(props){
    
    const [displayedAnswers, setDisplayedAnswers] = useState(props.answers) //(!) Passing props to the state?

    const handleUserSelection = (e) => {
        //After this, we only gonna render the button with the user's choice.
        const {index, parent_id} = e.target.attributes; 
        setDisplayedAnswers(previosAnswers => [previosAnswers[index.value]]);
        
        //We create an answer object that's gonna subsequently saved in the state.
        const answerObject = generateAnswerObj(parent_id.value, props.correct_answer, e.target.value);

        props.saveUserAnswer(answerObject); //We also save the user's answer in the state.
    }

    const handleReset = (e) => {
        const {parent_id} = e.target.attributes;
        setDisplayedAnswers(props.answers); //We render all of the answer options again
        props.removeUserAnswer(parent_id.value); //We also remov user's answer from the state
    }


    return(
        <div className="border-bottom mb-3">
            <h2 className="h5">{props.question}</h2>
            <div className="d-flex justify-content-between align-content-between mb-3">
                <div>
                    {displayedAnswers.map((answer, index) => (
                        <button className="mr-3 btn btn-primary" key={uuidv4()} index={index} parent_id={props.id} value={answer} onClick={handleUserSelection}>{answer}</button>
                    ))}
                </div>
                <button className="btn btn-warning" parent_id={props.id} onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Question;