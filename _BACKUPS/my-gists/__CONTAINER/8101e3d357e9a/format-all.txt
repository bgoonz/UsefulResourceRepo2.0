This works for me

Install prettier:

npm init 
npm i prettier
Add following script in package.json:

"pretty": "prettier --write \"./**/*.{js,jsx,json}\"" 
In this case only, i need to format my .js .jsx and .json files.

Run script:

npm run pretty