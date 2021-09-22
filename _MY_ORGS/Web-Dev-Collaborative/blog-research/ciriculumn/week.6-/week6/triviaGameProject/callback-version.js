export function getClue(cb) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status !== 200){
            cb(xhr.status)
        }
        if(xhr.status === 200){
            let clue = JSON.parse(xhr.responseText)
            cb(null, clue)
        }
    })

    xhr.open('GET', 'https://jservice.xyz/api/random-clue')
    xhr.send()
}