/*
*************************************

Phase 1

> On DOMContentLoaded we want to fetch from api as a GET request

> our req will be json so we will have to handle that to use img

> we then want to set the src to fetched image
*************************************
*/

// const errorHandler 

const responseHandle = async (res) => {
    let data = await res.json();
    console.log(data)
    return data
}



const fetchImage = async () => {
    try {
        const res = await fetch('http://localhost:3000/kitten/image')

        const data = responseHandle(res);

        document.querySelector('.cat-pic').src = data.src;
		document.querySelector('.score').innerHTML = data.score;
		document.querySelector('.comments').innerHTML = ''
    }
    catch (err) {
        
    }
}







document.addEventListener('DOMContentLoaded', (fetchImage))