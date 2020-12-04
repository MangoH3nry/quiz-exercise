import { v4 as uuidv4 } from 'uuid';

function formatQuestions(data){
    return data.map(element =>{

        const question = element.question;
        const answers = element.incorrect_answers;
        const randomIndex = Math.floor(Math.random() * (answers.length + 1));
        
        answers.splice(randomIndex, 0, element.correct_answer);

        return element = {
            id: uuidv4(),
            question: question,
            answers: answers,
            correct_answer: element.correct_answer
        }
    })
}

export default formatQuestions;