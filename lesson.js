const startButton = document.getElementById('start');
startButton.addEventListener('click', ()=>{
  fetchQuizData(1);
  document.getElementById("start").style.display = "none";
});

const fetchQuizData = async (index) => {
  
  title.innerText = "取得中";
  
  questions.innerText = '少々お待ちください';

  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const quizData = await response.json();
  const quiz = new Quiz(quizData);
  
  console.log(quizData);
    //問題文の表示
  title.innerText = `問題${index}`;

  const genre = document.getElementById('genre');
  genre.innerText = `【ジャンル】 ${quiz.getQuizCategory(1)}`;
  
  const difficulty = document.getElementById('difficulty');
  difficulty.innerText = `【難易度】 ${quiz.getQuizDifficulty(1)}`;

  const question = document.getElementById('questions');
  question.innerText = ` ${quiz.getQuizQuestion(1)}`;

  const correctAnswers = quiz.getQuizCorrectAnswer(1);
  const incorrectAnswers = quiz.getQuizIncorrectAnswer(1);

  //問題のシャッフル
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  for(let i = 0; i < 10; i++){
  console.log(shuffle(...correctAnswers,...incorrectAnswers));}
//問題をクリックした時の正誤判定
  button.addEventListener('click', ()=>{
    quiz.countCorrectAnswers(index);
      index++;

    setNextQuiz(quiz,index);

  })
//問題終了か、問題続行かの条件分岐
  const answersArea = document.getElementById('answers');
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
   
  //次の問題を表示
  const makeQuiz =  (quiz,index) => {
    fetchQuizData(quiz,index)
    }
//問題を終了して正解数を表示
    const finishQuiz = (quiz) =>{
      
    }
}


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
  if(this._quizzes[index - 1].correct_answer  === answer){
    this._correctAnswersNum++
  }
  
}
 getCorrectAnswersNum(){
 return this.__correctAnswersNum
 }


}



