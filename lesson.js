
  
  
fetchQuizData = async () => {
  
  getData = () =>{
  const getData =  document.createElement('h1');
  getData.textContent = "取得中"
  const getting = document.getElementById('get');
  
  getting.appendChild(getData);
  }
  await getData();
  
  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const quizData = await response.json();
  const quiz = new Quiz(quizData);
  quiz.getQuizCategory;

}
fetchQuizData();

class Quiz {
  constructor(quizData) {
   this._quizzes = quizData.results; //クイズデータ
   this._correctAnswersNum = 0;  //正解数

 }

 
 getQuizCategory(index) {
   return this._quizzes[index - 1].category;
 }
 getQuizDifficulty(index){
   return this._quizzes[index - 1].difficulty;
 }
 getQuizQuestion(index){
  return this._quizzes[index - 1].question;
 }
 getQuizCorrectAnswer(index){
  return this._quizzes[index - 1].correct_answer;
 }
 getQuizIncorrectAnswer(index){
  return this._quizzes[index - 1].incorrect_answers;//arrayを取得
 }
 getQuizCorrectAnswer(index){
  return this._quizzes[index - 1].correct_answer;
 }

}


