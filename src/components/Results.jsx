import React from 'react';

function Results(props){
    return(
        <React.Fragment>
            <h2>You scored {props.score}/5 answers correclyt</h2>
            <button onClick={props.resetGame}>Play again!</button>
        </React.Fragment>
    )
}

export default Results;