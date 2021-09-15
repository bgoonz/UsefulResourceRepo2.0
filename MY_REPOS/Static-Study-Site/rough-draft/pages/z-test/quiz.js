let isHidden = false;
function reset() {
    if (isHidden === true) {
        isHidden = false;
    }
}
function hideAnswers() {
    let answerList = document.getElementsByClassName("answer");
    for (i = 0; i < answerList.length; i++) {
        answerList[i].style.display = "none";
    }
}
function showAnswers() {
    let answerList = document.getElementsByClassName("answer");
    for (i = 0; i < answerList.length; i++) {
        answerList[i].style.display = "block";
    }
}
function hideQuestion() {
    console.log(event.target.id);
    let question = document.getElementById(event.target.id);
    question.style.display = "none";
}
function showQuestions() {
    let hidden;
    if (hidden != null) {
        hiddenQuestionsArr = JSON.parse(hidden);
        // console.log("hidden: ", hidden);
        // console.log("HiddenQuestions:  ", hiddenQuestionsArr);
        for (let i = 0; i < hiddenQuestionsArr.length; i++) {
            let question = document.getElementById(hiddenQuestionsArr[i]);
            console.log("Setting ", hiddenQuestionsArr[i], " to display=none");
            question.style.display = "none";
        }
    }
}
window.addEventListener("DOMContentLoaded", (event) => {
    let quizBtn = document.getElementsByClassName("quizNbr")[0];
    console.log("Quiz btn:  ", quizBtn.id);
    let quiz = document.getElementById("quiz");
    quiz.style.display = "inline-block";
    hideAnswers();
    showQuestions();
    function addEventListeners() {
        let hideQuestions = document.getElementsByClassName("hideButtonClass");
        for (let i = 0; i < hideQuestions.length; i++) {
            hideQuestions[i].addEventListener("click", (event) => {
                console.log("Target id:  ", event.target.id);
                let parentID = event.target.parentElement.id;
                /*                
The parentElement property returns the parent element of the specified element.
The difference between parentElement and parentNode, is that parentElement returns null if the parent node is not an element node
*/

                parentDiv = document.getElementById(parentID);
                parentDiv.style.display = "none";
            });
        }
        let myQuestions = document.getElementsByClassName("buttonClass");
        for (let i = 0; i < myQuestions.length; i++) {
            myQuestions[i].addEventListener("click", (event) => {
                let answerDiv = event.target.parentElement.getElementsByClassName(
                    "answer"
                )[0];
                console.log(" answerDiv: ", answerDiv);
                if (
                    answerDiv !== undefined &&
                    answerDiv.style.display === "none"
                ) {
                    answerDiv.style.display = "block";
                    event.target.innerHTML = "HIDE";
                } else if (answerDiv !== undefined) {
                    answerDiv.style.display = "none";
                    event.target.innerHTML = "SHOW";
                }
            });
        }
    }
    addEventListeners();
});
