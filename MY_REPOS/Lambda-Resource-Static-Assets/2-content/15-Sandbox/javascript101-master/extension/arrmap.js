const array = [
    {
        name: '大漠',
        email: 'w3cplus@hotmail.com'
    },
    {
        name: 'Airen',
        email: 'airen@gmail.com'
    }
]
const names = Array.from(array, ({ name }) => name);
console.log(names);