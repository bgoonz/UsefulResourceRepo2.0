import { getClue as getClueFromCallback } from './callback-version.js'
import { getClue as getClueFromPromise } from './promise-version.js'
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'

const buttonOne = document.getElementById('use-callback');
const buttonPromise = document.getElementById('use-promise');
const buttonAsync = document.getElementById('use-async-await');
const buttonResponse = document.getElementById('check-response');
const playerResponse = document.getElementById('player-response');


function setHtml(clue){
    let answer = document.getElementById('answer')
    let value = document.getElementById('value')
    let question = document.getElementById('question')
    let categoryTitle = document.getElementById('category-title')
    let invalidCount = document.getElementById("invalid-count")

    answer.innerHTML = clue.answer;
        value.innerHTML = clue.value;
        question.innerHTML = clue.question;
        categoryTitle.innerHTML = clue.category.title;
        if(clue.invalid_count && clue.inalid_count > 0){
            invalidCount.innerHTML = "invalid"
        }else{
            invalidCount.innerHTML = "valid"
        }

    answer.classList.add('is-hidden')
}

window.addEventListener("DOMContentLoaded", event =>{

    buttonOne.addEventListener('click', (event) => {
        getClueFromCallback((err,clue) => {
            if (err !== null) {
                console.error(err);
            }
            setHtml(clue)
        })

        buttonResponse.classList.remove('is-hidden');
        playerResponse.value = "";
    })

    buttonPromise.addEventListener("click", (event) => {
        getClueFromPromise()
            .then(clue => {
                setHtml(clue)
            })
            .catch(error => {
                console.error(error.message)
            })

        buttonResponse.classList.remove('is-hidden');
        playerResponse.value = "";
    })

    buttonAsync.addEventListener('click', async (event) => {
        try {
            let clue = await getClueFromAsyncFunction();
            setHtml(clue);
        } catch (error) {
            console.error(error.message);
        }

        buttonResponse.classList.remove('is-hidden');
        playerResponse.value = "";
    })

    buttonResponse.addEventListener('click', (event) => {
        let answer = document.getElementById('answer')
        let value = document.getElementById('value')
        let score = document.getElementById('score')
        let buttonResponse = document.getElementById('check-response');

        if(playerResponse.value.trim() === answer.innerHTML.trim()){
            score.innerHTML += value.innerHTML;
        } else {
            score.innerHTML -= value.innerHTML;
        }

        answer.classList.remove('is-hidden')
        buttonResponse.classList.add('is-hidden')
    })
})
