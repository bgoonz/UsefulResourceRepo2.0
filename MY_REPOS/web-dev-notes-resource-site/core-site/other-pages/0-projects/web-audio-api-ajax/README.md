## Confetti By Sound And Color

### An Built with confetti-js, Math.random(), the Web Audio API, AJAX, and Node.js

### How to use:

- `git clone` the **repository** to your **desktop** with the ***following*** `command` if using `SSH`:

```shell
git clone git@github.com:interglobalmedia/web-audio-api-ajax.git
```
If using `HTTPS`:

```shell
git clone https://github.com/interglobalmedia/web-audio-api-ajax.git
```

### User Story:

- When the **user** ***clicks*** on the `Start` **button**, a `song` ***starts*** **playing**, the `background color` of the **page** ***changes*** **color**, `confetti` starts ***falling***, and the `background color` and `color` of the `Start` **button** ***changes***.

- When the **user** ***clicks*** on the `Stop` **button**, the `song` ***stops*** **playing** (paused), the `background color` of the **page** ***changes*** **color**, `confetti` starts ***falling***, and the `background color` and `color` of the `Stop` **button** ***changes***.

- When the **user** ***clicks*** on the `Refresh` **button**, everything goes back to its ***default*** **state**. The `background color` of the **page** ***goes back*** to `white`, the `confetti` **disappears**, and the `background color` of the `buttons` ***reverts*** to their **default states** of `white`, and the `color` of the **buttons** ***reverts*** to their **default states** of of `black`.

### Tools/Packages Used:

- `npm`

- `npm` **package** `node-sass` to ***enable*** using `Sass` for the **project styling**

- `npm` **package** `gh-pages` to ***enable*** the `automatic deployment` of the **application** to `gh-pages`.

- `cdnjs` of `confetti-js` **npm package** which ***automatically*** **generates** an **animated** `confetti` **effect** on the ***page***.

- The `Web Audio API`, which is ***responsible*** for the **generation** of the ***music***.

- `AJAX` (`Asynchronous JavaScript and XML`), to make a **request** to the (local) `Audio1` **file** in the **form** of an `arraybuffer`, which is ***decoded*** on `page load`. 

### Scripts:

`npm run scss`: **watches** for ***changes*** in `styles/scss/main.scss` and **outputs** them into `styles/css/main.css`.

`npm run clean`: ***removes*** the **old** `dist` **folder** and ***replaces*** it with a **new one** ***containing*** latest **changes**.

`npm run build`: ***creates*** a **new** `dist` **build**.

`npm run deploy`: ***deploys*** the **contents** of the `dist` **folder** to `gh-pages`.

