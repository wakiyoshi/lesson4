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
  setNextQuiz(quiz, index);
  
  console.log(quizData);
  console.log(quiz.getCorrectAnswersNum)

}

  const setNextQuiz = (quiz, index) => {

    const answersArea = document.getElementById('answers');

    while (answersArea.firstChild) {
      answersArea.removeChild(answersArea.firstChild);
    }
    if (index <= quiz.getNumQuizzes()) {
      makeQuiz(quiz, index);
    } else {
      finishQuiz(quiz);
    }
  }
  const makeQuiz =  (quiz,index) => {
    const shuffleArray = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const buildAnswers = () => {
      const answers = [
        quiz.getQuizCorrectAnswer(index),
        ...quiz.getQuizIncorrectAnswers(index)
      ];
      return shuffleArray(answers);
    }
    buildAnswers();
  
    const answersArea = document.getElementById('answers');
    shuffleArray(buildAnswers()).forEach((a) => {
      const button = document.createElement('button')
      button.innerText = a;
      const br = document.createElement('br');
      answersArea.appendChild(button)
      answersArea.appendChild(br)

      button.addEventListener('click', answer =>{
          answer = a;
          quiz.countCorrectAnswers(index,answer);
            index++;
      console.log(quiz.getCorrectAnswersNum())
          setNextQuiz(quiz,index);
          
      })
    });
    title.innerText = `問題${index}`;
    
    const genre = document.getElementById('genre');
    genre.innerText = `【ジャンル】 ${quiz.getQuizCategory(index)}`;
    genre.style.display = 'block'
    
    const difficulty = document.getElementById('difficulty');
    difficulty.innerText = `【難易度】 ${quiz.getQuizDifficulty(index)}`;
    difficulty.style.display = 'block'

    const question = document.getElementById('questions');
    question.innerText = ` ${quiz.getQuizQuestion(index)}`;
  }
  const finishQuiz = (quiz) =>{
    const answersArea = document.getElementById('answers');
        
        title.innerText = `あなたの正解数は${quiz.getCorrectAnswersNum()}です！！！`;
    
        const genre = document.getElementById('genre');
        genre.style.display = 'none';
        
        const difficulty = document.getElementById('difficulty');
        difficulty.style.display = 'none';
      
        const question = document.getElementById('questions');
        question.innerText = `もう一度挑戦したい場合は以下をクリック！！`;
        
  
        const restartButton = document.createElement('button');
        restartButton.innerText = 'ホームへ戻る'
        restartButton.addEventListener('click', ()=>{
          document.getElementById("start").style.display = "block";
          restartButton.hidden = 'true';
          title.innerText = 'ようこそ'
          question.innerText = `以下のボタンをクリック`;
        });
        answersArea.appendChild(restartButton);
      }
      
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
       getQuizIncorrectAnswers(index){
        return this._quizzes[index - 1].incorrect_answers;//arrayを取得
       }
       countCorrectAnswers(index,answer){
        if(this._quizzes[index - 1].correct_answer  === answer
          ){
          this._correctAnswersNum++
        }
      }
        getNumQuizzes() {
          return this._quizzes.length;
        }
       
       getCorrectAnswersNum(){
       return this._correctAnswersNum;
       }
      }