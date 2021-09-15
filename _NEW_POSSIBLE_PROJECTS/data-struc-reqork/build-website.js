const path = require('path')
const fs = require('fs')

const githubRepo = 'https://github.com/ashishdotme/code.ashish.me/blob/master/'

let content = ''
let problems = []
let totalProblemsCount = 0
let linkTitle

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const fetchAllProblems = (dir) => {
  const files = fs.readdirSync(dir)
  files.forEach((file, index) => {
    const filePath = path.normalize(`${dir}/${file}`)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      if (file !== 'launch.json' && file !== '.DS_Store') {
        const problem = []
        const isNameProper = file.indexOf('-')
        if (isNameProper !== -1) {
          const splitArr = file.split(/-(.+)/)
          if (splitArr[0] && splitArr[0].match(/^[0-9]+$/) !== null) {
            problem.push(splitArr[0])
            const title =
              splitArr[1] &&
              splitArr[1]
                .split('-')
                .join(' ')
                .replace(/\.[^/.]+$/, '')
            linkTitle =
              dir === 'leetcode'
                ? `[${Number(splitArr[0])}. ${capitalize(title)}](${githubRepo}${filePath})`
                : `[${capitalize(title)}](${githubRepo}${filePath})`
            problem.push(linkTitle)
            problems.push(problem)
          }
        }
      }
    } else {
      fetchAllProblems(filePath)
    }
  })
}

const srcDir = fs.readdirSync(__dirname, { withFileTypes: true })
const platforms = srcDir
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((folder) => folder[0] !== '.' && folder !== 'docs' && folder !== 'node_modules')
platforms.forEach((platform) => {
  problems = []
  content = `# ${capitalize(platform)} Problems

  `
  fetchAllProblems(platform)
  problems.sort((fileA, fileB) => fileA[0] - fileB[0])
  content += '\n'
  problems.forEach((item, index) => {
    totalProblemsCount += 1
    content += `- ${item[1]}`
    content += '\n'
  })
  fs.writeFile(`${__dirname}/${platform}/README.md`, content, function (err) {
    if (err) {
      console.log(err)
    } else {
    }
  })
  fs.writeFile(`${__dirname}/docs/${platform}.md`, content, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Generated ${platform}.md`)
    }
  })
})

// let mainReadme = `
//   # code.ashish.me

//   Contains my solutions to programming challenges from various sources.

//   - [Leetcode](https://code.ashish.me/#/README)
//   - [Miscellaneous](https://code.ashish.me/#/100-algorithms)
//   - [Freecodecamp](https://code.ashish.me/#/freecodecamp)
//   - [Data Structures](https://code.ashish.me/#/data-structures)
//   - [Codesignal](https://code.ashish.me/#/codesignal)
//   - [Hacker Earth](https://code.ashish.me/#/hackerearth)
//   - [Project Euler](https://code.ashish.me/#/project-euler)

// `

// mainReadme += `Total problems solved -> ${totalProblemsCount}`

// fs.writeFile(`${__dirname}/README.md`, mainReadme, function (err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(`Generated README.md`)
//   }
// })
