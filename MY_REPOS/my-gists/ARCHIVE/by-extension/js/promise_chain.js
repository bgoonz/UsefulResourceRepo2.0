const cleanRoom = () => {
  return new Promise((resolve, reject) => {
    resolve('Clean room,');
  });
}

const takeTrash = (message) => {
  return new Promise((resolve, reject) => {
    resolve(message + ' Take out trash,');
  })
}

const getIceCream = (message) => {
  return new Promise((resolve, reject) => {
    resolve(message + ' Get Ice cream');
  })
}

cleanRoom()
.then((result) => {
  return takeTrash(result);
})
.then((result) => {
  return getIceCream(result);
})
.then((result) => {
  console.log(result)
})

// Only using resolve() 

const cleanRoom = () => Promise.resolve('Clean Room,')

const takeTrash = (message) => Promise.resolve(message + ' Take Trash,')

const getIceCream = (message) => Promise.resolve(message + ' Get Ice Cream')

cleanRoom()
.then((result) => {
  return takeTrash(result);
})
.then((result) => {
  return getIceCream(result);
})
.then((result) => {
  console.log(result)
})