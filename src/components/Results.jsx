import React from 'react';

function Results(props){
    return(
        <div className="text-center">
            <h2 className="text-center">You scored {props.score}/5 answers correclyt</h2>
            <button className="btn btn-success my-4" onClick={props.resetGame}>Play again!</button>
        </div>
    )
}

export default Results;