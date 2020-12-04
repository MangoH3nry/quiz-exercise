import axios from 'axios';

async function fetchQuestions(){
    try{
        return await axios.get("https://opentdb.com/api.php?amount=5");
      }catch(err){
        alert(err);
      }
}

export default fetchQuestions;