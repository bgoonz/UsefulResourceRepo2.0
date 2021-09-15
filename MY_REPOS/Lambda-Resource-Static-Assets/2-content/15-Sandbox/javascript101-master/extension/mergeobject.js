const obj1 = {
    name: '大漠',
    url: 'w3cplus.com'
}
const obj2 = {
    name: 'airen',
    age: 30
}
const mergingObj = {...obj1, ...obj2};
console.log(mergingObj);


const array = [
    {
        name: '大漠',
        email: 'w3cplus@gmail.com'
    },
    {
        name: 'Airen',
        email: 'airen@gmail.com'
    }
]
const result = array.reduce((accumulator, item) => {
    return {
        ...accumulator,
        [item.name]: item.email
    }
}, {});
console.log(result);