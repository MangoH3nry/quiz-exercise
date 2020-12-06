import React, {useState, useEffect} from 'react';
import fetchQuestions from './services/fetchQuestions';
import formatQuestions from './utils/formatQuestions';
import Question from './components/Question';
import Results from './components/Results';

function App(){

  const [isLoading, setIsLoading] = useState(true);
  const [showingResults, setShowingResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

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

  const checkResults = () => {
    let score = 0;
    userAnswers.forEach(answer =>{
      if(answer.correctlyAnswered === true){
        score++
      }
    })
    setScore(score);
    setShowingResults(true);
  }

   const resetGame = async () => {
    setIsLoading(true)
    setShowingResults(false);
    setUserAnswers([]);
    setScore(0);

    const response = await fetchQuestions();
    const formatedQuestion = formatQuestions(response.data.results);
    setQuestions(formatedQuestion); 
    setIsLoading(false);
  }

  return(
    <div>
      <main className="container p-0 mt-5 border shadow-sm" role="main">
        <div className="py-1 px-2 bg-dark text-white">
          <h1>Quiz App</h1>
        </div>
        <div>
          {isLoading ? 
            <h2>Loading...</h2> :
            <div className="pt-2 px-3">
              {showingResults ?
                <Results score={score} resetGame={resetGame}/> :
                <div>
                  {questions.map(question => (
                    <Question
                      key={question.id}
                      id={question.id}
                      question={question.question}
                      answers={question.answers}
                      correct_answer={question.correct_answer}
                      saveUserAnswer={saveUserAnswer}
                      removeUserAnswer={removeUserAnswer}/>
                  ))}
                  <div className="text-center">
                    <button className="btn btn-success mb-3" onClick={checkResults}>Check Results</button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </main>
    </div>
  )

}

export default App;