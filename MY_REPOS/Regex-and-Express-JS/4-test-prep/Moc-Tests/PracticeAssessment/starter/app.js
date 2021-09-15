/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */

const express = require('express')
// const morgan = require('morgan')
// const cookieParser = require('cookie-parser')
// const csrf = require('csurf')
// const csrfPower = csrf({cookie: true})
const app = express()
app.set('view engine', 'pug')
// app.use(cookieParser())
// app.use(morgan('dev'))
// app.use(express.urlencoded())
 
// const errors = []
// const people = [{firstName: 'rosalyn', lastName: 'reddish', age: 24, biography: 'A noble lady.', hairColorId: 3}]

// function asyncHandler(handler) {
//   return (req, res, next) => {
//     return handler(req, res, next).catch(next)
//   }
// }

app.get('/', (req, res, next) => {
  res.render('index')//, {title: 'Homepage'})
})

// app.get('/new-person', csrfPower, (req, res) => {
//   // const { firstName, lastName, age, biography, hairColorId } = req.body
//   res.render('new-person', { 
//     title: 'New Person Form',
//     csrfToken: req.csrfToken(),
//     firstName: '',
//     lastName: '',
//     age: '',
//     biography: '',
//     hairColorId: ''
//     // firstName, lastName, age, biography, hairColorId,
//   })
// })

// function validate(req, res, next) {
//   const { firstName, lastName, hairColorId } = req.body
//   if (!firstName) errors.push('Need a first name, friend!')
//   if (firstName.length > 30 || lastName.length > 30) errors.push('Too long, cut it short!')
//   if (!lastName) errors.push('What\'s your family name?')
//   if (!hairColorId) errors.push('Your hair is probably real perty')
//   if (errors.length > 0) {
//     const error = new Error('500 please')
//     error.status = 500
//     next(error)
//   }
//   next() 
// }

// app.post('/new-person', csrfPower, validate, (req, res, next) => {
//   const { firstName, lastName, age, biography, hairColorId } = req.body
//   if (!firstName || !lastName || !hairColorId) {
//   //   errors.push('Need a name and hair color!')
//     res.render('new-person', {
//       csrfToken: req.csrfToken(),
//       errors: errors,
//       firstName: firstName, lastName: lastName, age, biography, hairColorId,
//     })
//   }
//   people.push({
//     firstName: firstName, 
//     lastName: lastName, 
//     age: age,
//     biography: biography,
//     hairColorId: hairColorId
//   })
  
//   res.redirect('/')
// })

// app.use('*', (error, req, res, next) => {
//   error.status = 500
//   console.error('500 I guess')
//   console.error(error.status)
// })


const port = 8081
app.listen(port, console.log('Eyyy it\'s working!'))





/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}
