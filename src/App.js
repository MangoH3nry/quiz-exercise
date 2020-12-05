import React, {useState, useEffect} from 'react';
import fetchQuestions from './services/fetchQuestions';
import formatQuestions from './utils/formatQuestions';
import Question from './components/Question';

function App(){

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([])

  useEffect(()=>{
   
    async function loadData(){
      const response = await fetchQuestions();
      const formatedQuestion = formatQuestions(response.data.results);
      setQuestions(formatedQuestion); 
      setIsLoading(false);
    }

    loadData();
  }, [])

  const saveUserAnswer = (userNewAnswer) => {

    const answerAlreadySaved = userAnswers.some(userAnswer => userAnswer.questionID === userNewAnswer.questionID);

    if(answerAlreadySaved){
      return null
    }

    setUserAnswers([...userAnswers, userNewAnswer])
  }

  const removeUserAnswer = (id) => {
    const updatedAnswers = userAnswers.filter(answer => answer.questionID !== id);
    setUserAnswers(updatedAnswers);
  }


  return (
    <div>
      <main role="main">
        <div>
          <h1>QuizBee</h1>
        </div>
        {isLoading ? <h2>Loading...</h2> : questions.map(question => (
          <Question 
            key={question.id} 
            id={question.id} 
            question={question.question} 
            answers={question.answers} 
            correct_answer={question.correct_answer}
            saveUserAnswer={saveUserAnswer}
            removeUserAnswer={removeUserAnswer}/>
        ))}
        <div>
          <button>Check results</button>
        </div>
      </main>
    </div>
  );

}

export default App;