
fetchQuizData = async (index) => {
  
  title.innerText = "取得中";
  
  questions.innerText = '少々お待ちください';

  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const quizData = await response.json();
  const quiz = new Quiz(quizData);
  const genre = document.getElementById('genre');
  console.log(quizData)
  title.innerText = `問題${Object.keys(quiz)}`;
genre.innerText = `【ジャンル】 ${quiz.getQuizCategory(1)}`;
const difficulty = document.getElementById('difficulty');
difficulty.innerText = `【難易度】 ${quiz.getQuizDifficulty(1)}`;
const question = document.getElementById('questions');
question.innerText = ` ${quiz.getQuizQuestion(1)}`;


const answers = document.getElementById('answers');
answers.innerHTML = ''
  const button = document.createElement('button');
  const br = document.createElement('br');
  
  button.innerText = ` ${quiz.getQuizCorrectAnswer(1)}`;
  answers.appendChild(button);
  answers.appendChild(br);
  
  button.addEventListener('click', ()=>{
    
    console.log(quiz.correctNum(1))
    quiz._correctAnswersNum += 1
    fetchQuizData();
  })
  
  quiz.getQuizIncorrectAnswer(1).forEach((a)=>{
    const button = document.createElement('button');
    const br = document.createElement('br');
    button.innerText = a;

    answers.appendChild(button);
    answers.appendChild(br);
    button.addEventListener('click', ()=>{
    
      console.log(quiz.correctNum(1))
      quiz._incorrectAnswersNum += 1
      fetchQuizData();
    })

  })
}
class Quiz {
  constructor(quizData) {
   this._quizzes = quizData.results; //クイズデータ
   this._correctAnswersNum = 0;  //正解数
   this._incorrectAnswersNum = 0; //不正解数
 }

correctNum(){
  return this._correctAnswersNum;
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


}
const startButton = document.getElementById('start');
startButton.addEventListener('click', ()=>{
  fetchQuizData();
  document.getElementById("start").style.display = "none";
});




