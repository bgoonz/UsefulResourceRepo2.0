mkdir web43rocks
git init
npx gitignore node
ls -alh
git checkout -b main
npm init -y
npx eslint --init
    ✔ How would you like to use ESLint? · problems    
    ✔ What type of modules does your project use? · commonjs
    ✔ Which framework does your project use? · none
    ✔ Does your project use TypeScript? · No
    ✔ Where does your code run? · node
    ✔ What format do you want your config file to be in? · JSON
    ✔ Would you like to install them now with npm? · Yes
npm i express cors dotenv
npm i -D nodemon
touch index.js