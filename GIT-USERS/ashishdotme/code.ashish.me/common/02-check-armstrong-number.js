function checkArmstrong(num) {
  const digits = num.toString().split('')
  let sum = 0
  digits.forEach((value) => {
    sum += value ** digits.length
  })
  return sum === num
}

console.log(checkArmstrong(153))
