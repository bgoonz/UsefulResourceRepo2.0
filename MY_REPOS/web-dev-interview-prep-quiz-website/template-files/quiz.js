const gotIt = [];
let isTablet = false;

function reset() {
    let hidden;
    if (isTablet) {
        hidden = sessionStorage.getItem("gotIt");
    } else {
      hidden = localStorage.getItem("gotIt");
    }
    if (hidden) {
        let hiddenElts = JSON.parse(hidden);

        for (let i=0; i < hiddenElts.length; i++) {
            let elt = document.getElementById(hiddenElts[i]);
            elt.style.display="block";
        }
        if (isTablet) {
            sessionStorage.removeItem("gotIt");
        } else {
            localStorage.removeItem("gotIt");
        }
    }
}

function hideAnswers() {

  let elList = document.getElementsByClassName("answer");
  for (i = 0; i < elList.length; i++) {
      elList[i].style.display = "none";
  }

}
function showAnswers() {
  let elList = document.getElementsByClassName("answer");
  for (i = 0; i < elList.length; i++) {
      elList[i].style.display = "block";
  }
}

function hideQuestion() {
    //console.log(event.target.id);
    let question = document.getElementById(event.target.id);

    question.style.display = "none";
}

function showQuestions() {
    let hidden;
    if (isTablet) {
         hidden = sessionStorage.getItem("gotIt");
    } else {
         hidden = localStorage.getItem("gotIt");
    }
    if (hidden != null) {
        hiddenQuestionsArr = JSON.parse(hidden);
        //console.log("HiddenQuestions:  ", hiddenQuestionsArr);
        for (let i = 0; i < hiddenQuestionsArr.length; i++) {
            let question = document.getElementById(hiddenQuestionsArr[i]);
            //console.log("Setting ", hiddenQuestionsArr[i], " to display=none");
            question.style.display = "none";
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    let quizBtn = document.getElementsByClassName("quizNbr")[0];

    //console.log("Quiz btn:  ", quizBtn.id);
    if (localStorage.getItem(quizBtn.id)) {
        quizBtn.style.display = "none"
        let quiz = document.getElementById("quiz");
        quiz.style.display = "inline-block";
    }

    //quizBtn.style.display = "inline-block";
    quizBtn.addEventListener("click", (event) => {
        quiz = event.target.id;
        if (localStorage.getItem(quiz) === null) {
            let thisQuizNbr = parseInt(quiz.slice(4));
            cleanLocalStorage(thisQuizNbr);
            reset();
            localStorage.setItem(quiz, "started");
            quizBtn.style.display = "none";
            let myQuiz = document.getElementById("quiz");
            myQuiz.style.display = "inline-block";
        };

    });


    const userAgent = navigator.userAgent.toLowerCase();
    isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    //console.log(isTablet)

    let resetBtn = document.getElementById("resetButton");
    resetBtn.addEventListener("click", reset);

    hideAnswers();

    showQuestions();

    function addEventListeners( ) {

        let hideQuestions = document.getElementsByClassName("hideButtonClass")
        for (let i = 0; i < hideQuestions.length; i++) {
            hideQuestions[i].addEventListener("click", (event) => {
                //console.log("Target id:  ", event.target.id);
                let parentID = event.target.parentElement.id;
                parentDiv = document.getElementById(parentID);
                parentDiv.style.display = "none";
                gotIt.push(parentID);
                localStorage.setItem("gotIt", JSON.stringify(gotIt));
            });
        }


        let myQuestions = document.getElementsByClassName("buttonClass");

        for (let i = 0; i < myQuestions.length; i++) {
            myQuestions[i].addEventListener( "click", (event) => {
                answerDiv = event.target.parentElement.getElementsByClassName("answer")[0];
                if (answerDiv !== undefined && answerDiv.style.display === "none") {
                    answerDiv.style.display="block";
                    event.target.innerHTML = "HIDE";
                } else if (answerDiv !== undefined ) {
                    answerDiv.style.display="none";
                    event.target.innerHTML ="SHOW";
                }
            });
         }
    }
    addEventListeners();

});

function cleanLocalStorage(currQuizNbr) {
    for (let i = 1; i < currQuizNbr; i++) {
            let lastQuizId = "quiz" + i;
            //console.log("removing ", lastQuizId, " from local storage...");
            localStorage.removeItem(lastQuizId);
    }
}
