function generateAnswerObj(parent_id, correctAnswer, userAnswer) {
    const answerObject = {
        questionID : parent_id
    }

    console.log(correctAnswer);

    if(correctAnswer === userAnswer){
        answerObject.correctlyAnswered = true
    }else{
        answerObject.correctlyAnswered = false
    }

    return answerObject;
}

export default generateAnswerObj;