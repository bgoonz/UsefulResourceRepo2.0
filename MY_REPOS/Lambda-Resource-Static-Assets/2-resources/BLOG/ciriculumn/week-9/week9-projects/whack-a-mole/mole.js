// window.addEventListener('DOMContentLoaded', () => {

//     setInterval(() => {
//       const moleHeads = document.querySelectorAll('.wgs__mole-head');
//       for (let moleHead of moleHeads) {
//         moleHead.classList.toggle('whackable-game-space__mole-head--hidden');
//       }
//     }, 1000);

//   });

function popUpRandomMole() {
    let moleHeads = document.querySelectorAll(".wgs__mole-head:not(.wgs__mole-head--whacked)");
    if(moleHeads.length === 0){
        alert('winner');
        return
    }

    let randomNumber = Math.floor(Math.random() * moleHeads.length);
    let randomMole = moleHeads[randomNumber];

    randomMole.classList.remove("wgs__mole-head--hidden");

    setTimeout(() => {
        hideMole(randomMole);
    }, 3000);
}
function hideMole(randomMole) {
    randomMole.classList.add("wgs__mole-head--hidden");
    setTimeout(() => {
        popUpRandomMole();
    }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
    let moleHeads = document.querySelectorAll(".wgs__mole-head");
    console.log(moleHeads)
    moleHeads.forEach(element => {
        element.addEventListener('click', (event) =>{
            event.target.classList.add("wgs__mole-head--hidden")
            event.target.classList.add('wgs__mole-head--whacked')

        })
    });
    setTimeout(() => {
        popUpRandomMole();
    }, 0);
})
