// const moneyBox = (coins) =>{
//     var saveCoins = 0;
//     saveCoins += coins;
//console.log(`Money box: $${saveCoins}`)
// } con esto no guarda los elementos

const moneyBox = () => {
  var saveCoins = 0;
  const countCoins = (coins) => {
    saveCoins += coins;
    console.log(`MoneyBox: $${saveCoins}`);
  };
  return countCoins;
};

let myMoneyBox = moneyBox();
myMoneyBox(5);
myMoneyBox(10);
