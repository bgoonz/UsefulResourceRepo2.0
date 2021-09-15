/* global TS */
{
  "use strict";
  let font = `
    color: rgb(240,240,240);
  `;
  let hover = `background-color: rgba(0,30,155,.7);`;
  TS.cssTemplates.midnight = {
    link: `
      a {
        cursor: pointer;
        color: blue;
      }
    `,
    alignment: "left",
    btn: `
      button {
        border: none;
        border-radius: .4rem;
        ${font}
        font-size: 1rem;
        background-color: #333;
      }
      button:hover {
        ${hover}
      }`,
    border1: `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      box-sizing:border-box;`,
    border2: `
      border: .1rem solid rgba(250,250,250,.7);
      border-radius:.1rem;
      box-shadow: 0px 0px 1px 2px black inset;`,
    backgroundTitle: `#000`,
    titleFont: `
      ${font}
    `,
    backgroundNav1: `
      color: rgb(255,255,255);
      background-color: #111;`,
    backgroundNav2: `background-color: #111;`,
    backgroundModals: `
      padding: 1rem;
      border-radius: 1rem;
      background : #222`,
    backgroundMain: `
      ${font}
      background-color: #222`,
    btnWarn: `
      .btnWarn {
        background-color : rgb(230,0,0);
      }`,
    btnExit: `
      #exit {
        border: 2px solid black;float:right;
        background-color : rgb(230,0,0);
      }`,
    btnSubmit: `
      .btnSubmit {
        border: none;
        ${font}
        background-color: #e62e00;
      }
      .btnSubmit:hover {
        background-color: #ff3300;
      }
      `,
    btnBase1: `
      .menuOptions:hover {
        ${hover}
      }
      #menu {
        cursor: default;
      }
      #left > * {
        border: none;
        ${font}
        font-size: 1rem;
        background: none;
        padding: .25rem;
      }
      #left > *:hover {
        ${hover}
      }
    `,
    btnBase2: `
      .baseButtons2 {
        background: none;
      }
      .baseButtons2:hover {
        ${hover}
      }
      `,
    btnNav1: `
      .chosen {
        background: linear-gradient(-20deg, rgb(10,10,10), rgb(40,95,95) 40%, rgb(40,40,40));
      }
      .navButton {
        color: white;
        background-color: #040404;
        border-top: 0.1rem solid white;
        border-left: 0.1rem solid #add;
        border-right: 0.1rem solid grey;
        border-bottom: 0.1rem solid grey;
        border-radius: 20% 20% 1% 1%;
        margin: 0.1rem;
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(0,0,20);
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
      }`,
    treeNav: `
      li {
        ${font}
      }
      li:hover {
        ${hover}
      }
    `,
    textField: `
      ${font}
      background-color: #111;
    `,
    select: `
      select {
        color: white;
        border: none;
        font-size: 1rem;
        background: linear-gradient(0deg, rgb(30, 0, 0), rgb(60, 10, 5) 80%, rgb(40, 5, 0));
      }
      select option {
        color: white;
        background-color: rgb(0,0,0);
        border: none;
        font-size: 1rem;
      }
      select option:checked {
        color: white;
        background-color: rgb(0,33,0);
      }`
  };
}
