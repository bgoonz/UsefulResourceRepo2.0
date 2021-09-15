export function getClue(callback){
    const xml = new XMLHttpRequest();

    xml.addEventListener("readystatechange", (event) => {
        if(xml.readyState !== XMLHttpRequest.DONE){
            return
        }
        if(xml.status !== 200){
            callback(xml.status)
        } else {
            const data = JSON.parse(xml.responseText);
            console.log("right before callback")
            callback(null,data);
        }
    })
    xml.open('GET','https://jservice.xyz/api/random-clue')
    xml.send();
}
