
const fetchQuizData = async (index) => {
  
  title.innerText = "取得中";
  
  questions.innerText = '少々お待ちください';

  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const quizData = await response.json();
  const quiz = new Quiz(quizData);
  console.log(quizData);
  const setNextQuiz = (quiz, index) => {
    while (answersArea.firstChild) {
      answersArea.removeChild(answersArea.firstChild);
    }
    if (index <= quiz.getNumQuizzes()) {
      makeQuiz(quiz, index);
    } else {
      finishQuiz(quiz);
    }
  }
  
  title.innerText = `問題${index}`;

  const genre = document.getElementById('genre');
  genre.innerText = `【ジャンル】 ${quiz.getQuizCategory(1)}`;
  
  const difficulty = document.getElementById('difficulty');
  difficulty.innerText = `【難易度】 ${quiz.getQuizDifficulty(1)}`;

  const question = document.getElementById('questions');
  question.innerText = ` ${quiz.getQuizQuestion(1)}`;

  const correctAnswers = quiz.getQuizCorrectAnswer(1);
  const incorrectAnswers = quiz.getQuizIncorrectAnswer(1);

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  for(let i = 0; i < 10; i++){
  console.log(shuffle(...correctAnswers,...incorrectAnswers));}
const answers = document.getElementById('answers');
// answers.innerHTML = ''
  const button = document.createElement('button');
  const br = document.createElement('br');
  
  button.innerText = ` ${quiz.getQuizCorrectAnswer(1)}`;
  answers.appendChild(button);
  answers.appendChild(br);


  
  button.addEventListener('click', ()=>{
    quiz.countCorrectAnswers(index);
      index++;

    setNextQuiz(quiz,index);
    // console.log(quiz.correctNum(1))
    // quiz._correctAnswersNum += 1
    // fetchQuizData();
  })


  quiz.getQuizIncorrectAnswer(1).forEach((a)=>{
    const button = document.createElement('button');
    const br = document.createElement('br');
    button.innerText = a;

    answers.appendChild(button);
    answers.appendChild(br);
    button.addEventListener('click', ()=>{
    
    })

  })
}
const startButton = document.getElementById('start');
startButton.addEventListener('click', ()=>{
  fetchQuizData(1);
  document.getElementById("start").style.display = "none";
});


class Quiz {
  constructor(quizData) {
   this._quizzes = quizData.results; //クイズデータ
   this._correctAnswersNum = 0;  //正解数
 }


 getNumQuizzes(index) {
   return this._quizzes[index]
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
 countCorrectAnswers(index,answer){
  return this.__quizzes;
 }
 getCorrectAnswersNum(index){
 return this.__correctAnswersNum+[index+1]

}

}



