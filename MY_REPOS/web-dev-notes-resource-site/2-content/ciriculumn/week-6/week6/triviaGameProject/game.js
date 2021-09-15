import{ getClue as getClueFromCallback } from "./callback-version.js"
import{ getClue as getClueFromPromise } from "./promise-version.js"
import{ getClue as getClueFromAsyncFunction } from "./async-await-version.js"


const setInnerHTML= function(clue){
    document.getElementById('question').innerHTML = clue.question
    document.getElementById('answer').innerHTML = clue.answer
    document.getElementById('value').innerHTML = clue.value
    document.getElementById('category-title').innerHTML = clue.category.title

    if(clue.invalidCount > 0){
        document.getElementById('invalid-count').innerHTML = 'invalid'
    }else {
        document.getElementById('invalid-count').innerHTML = 'valid'
    }
}

document
    .getElementById("use-callback")
    .addEventListener("click", ()=> {
        getClueFromCallback((err, clue) => {
        if(err !== null) return console.error(err);
        setInnerHTML(clue);
        })
    })

document
    .getElementById("use-promise")
    .addEventListener("click", ()=> {
        getClueFromPromise()
        .then((clue) => {
            setInnerHTML(clue)
        })
        .catch((err) => console.error(err.message))
    })

document
    .getElementById("use-async-await")
    .addEventListener("click", async ()=> {
        try{
            let clue = await getClueFromAsyncFunction()
            setInnerHTML(clue)
        } catch(err){
            console.error(err.message)
        }
    })

    let score = 0

document
    .getElementById("check-response")
    .addEventListener("click", ()=> {
    let playerResponse = document.getElementById("player-response").value.trim().toLowerCase()
    let correctAnswer = document.getElementById('answer')
    let answerValue = correctAnswer.innerHTML.trim().toLowerCase()
    let value = Number(document.getElementById("value").innerHTML.trim())
        if (playerResponse === answerValue){score += value
        }else{score -= value}
    document.getElementById('score').innerHTML = score
    console.log(score)
    })
