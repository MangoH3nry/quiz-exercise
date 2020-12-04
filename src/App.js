import React, {useState, useEffect} from 'react';
import fetchQuestions from './services/fetchQuestions';
import formatQuestions from './utils/formatQuestions';
import Question from './components/Question';

function App(){

  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
   
    async function loadData(){
      const response = await fetchQuestions();
      const formatedQuestion = formatQuestions(response.data.results);
      setQuestions(formatedQuestion);
    }

    loadData();
  }, [])

  return (
    <div>
      <main role="main">
        <div>
          <h1>QuizBee</h1>
        </div>
        {questions.map(question => (
          <Question key={question.id} id={question.id} question={question.question} answers={question.answers}/>
        ))}
      </main>
    </div>
  );

}




export default App;
