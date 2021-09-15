const playBtn = document.querySelector( "#switch-audio" );
const mixUp = document.querySelector( "#random-audio" );
let audio = new Audio( "./sounds/beach.mp3" );
let combos = [ {
    audio: "./sounds/beach.mp3",
    video: "./video/beach.mp4",
  },
  {
    audio: "./sounds/rain.mp3",
    video: "./video/rain.mp4",
  },
  {
    audio: "./sounds/night.mp3",
    video: "./video/chill.mp4",
  },
  {
    audio: "./sounds/glitter.mp3",
    video: "./video/glitter.mp4",
  },
  {
    audio: "./sounds/yoga.mp3",
    video: "./video/yoga.mp4",
  },
  {
    audio: "./sounds/moon.mp3",
    video: "./video/moon.mp4",
  },
  {
    audio: "./sounds/nature.mp3",
    video: "./video/nature.mp4",
  },
  {
    audio: "./sounds/goodmorning.mp3",
    video: "./video/goodmorning.mp4",
  },
  {
    audio: "./sounds/waves.mp3",
    video: "./video/waves.mp4",
  },
  {
    audio: "./sounds/ocean.mp3",
    video: "./video/ocean.mp4",
  },
];
let themes = [ {
    first: "#70dfbd",
    sec: "#53b7bd",
  },
  {
    first: "#64c4b4",
    sec: "#3eb7db",
  },
  {
    first: "#a2df70",
    sec: "#afeb41",
  },
  {
    first: "#70addf",
    sec: "#457890",
  },
  {
    first: "#bd31f5",
    sec: "#2b9af5",
  },
  {
    first: "#eb59f0",
    sec: "#c059f0",
  },
  {
    first: "#e6b737",
    sec: "#e7d425",
  },
  {
    first: "#e68637",
    sec: "#e67737",
  },
  {
    first: "#3d6bcf",
    sec: "#4983b9",
  },
];
let randomIndex = 0;
let current = new Audio( "" );
let currentVideo = null;
let video = document.getElementById( "stage-video" );
let config = document.getElementById( "config-btn" );
let colorThemes = document.getElementsByClassName( "colorTheme" );
let poses = document.getElementsByClassName( "pose" );
document.getElementById( "poses" )
  .style.display = "none";
playBtn.addEventListener( "click", function () {
  if ( playBtn.classList.contains( "muted" ) ) {
    playBtn.classList.remove( "muted" );
    document.querySelectorAll( "#switch-audio .fa-volume-up" )[ 0 ].style.display =
      "block";
    document.querySelectorAll(
      "#switch-audio .fa-volume-mute"
    )[ 0 ].style.display = "none";
    current = new Audio( combos[ randomIndex ].audio );
    current.play();
  } else {
    playBtn.classList.add( "muted" );
    let children = document.querySelectorAll( "#switch-audio .fa-volume-mute" );
    document.querySelectorAll( "#switch-audio .fa-volume-up" )[ 0 ].style.display =
      "none";
    document.querySelectorAll(
      "#switch-audio .fa-volume-mute"
    )[ 0 ].style.display = "block";
    current.pause();
  }
} );
mixUp.addEventListener( "click", function () {
  if ( playBtn.classList.contains( "muted" ) ) {
    playBtn.classList.remove( "muted" );
    document.querySelectorAll( "#switch-audio .fa-volume-up" )[ 0 ].style.display =
      "block";
    document.querySelectorAll(
      "#switch-audio .fa-volume-mute"
    )[ 0 ].style.display = "none";
  }
  randomIndex = Math.floor( Math.random() * ( combos.length - 0 ) + 0 );
  current.pause();
  current = new Audio( combos[ randomIndex ].audio );
  current.play();
  video.src = combos[ randomIndex ].video;
  video.play();
} );
document.getElementById( "toggle-video" )
  .addEventListener( "click", function () {
    video.classList.toggle( "none" );
    if ( video.classList.contains( "none" ) ) {
      document
        .querySelectorAll( "#toggle-video .fa-video" )[ 0 ]
        .classList.add( "none" );
      document
        .querySelectorAll( "#toggle-video .fa-video-slash" )[ 0 ]
        .classList.remove( "none" );
    } else {
      document
        .querySelectorAll( "#toggle-video .fa-video" )[ 0 ]
        .classList.remove( "none" );
      document
        .querySelectorAll( "#toggle-video .fa-video-slash" )[ 0 ]
        .classList.add( "none" );
    }
  } );
current.addEventListener( "ended", function () {
  current.currentTime = 0;
  current.load();
  current.play();
} );
config.addEventListener( "click", function () {
  document.getElementById( "config-md" )
    .classList.toggle( "open" );
} );
document.getElementById( "config-md" )
  .addEventListener( "click", function ( eve ) {
    if ( eve.target.classList.contains( "modal-wrapper" ) ) {
      document.getElementById( "config-md" )
        .classList.toggle( "open" );
    } else {
      return;
    }
  } );
colorThemes.forEach( colorTheme => {
  colorTheme.addEventListener( "click", function ( event ) {
    Array.prototype.forEach.call( colorThemes, function ( el ) {
      el.classList.remove( "active" );
    } );
    let theme = event.target.getAttribute( "data-theme" );
    let first = themes[ parseInt( theme ) ].first;
    let second = themes[ parseInt( theme ) ].sec;
    let circles = document.getElementsByClassName( "circle" );
    circles.forEach( circle => {
      circle.style.background = first;
    } );
    for ( let indexs = 1; !( indexs >= circles.length ); indexs += 2 ) {
      circles[ indexs ].style.background = second;
    }
    event.target.classList.add( "active" );
  } );
} );
document.getElementById( "OpenImgUpload" )
  .addEventListener( "click", function () {
    document.getElementById( "imgupload" )
      .click();
  } );
let openFile = function ( file ) {
  let input = file.target;
  let fileReader = new FileReader();
  fileReader.onload = function () {
    let dataURL = fileReader.result;
    let output = document.getElementById( "OpenImgUpload" );
    let mainBackground = document.getElementById( "mainBg" );
    output.src = dataURL;
    mainBackground.src = dataURL;
  };
  fileReader.readAsDataURL( input.files[ 0 ] );
};
let intervalIdx = 0;
setInterval( function () {
  Array.prototype.forEach.call( poses, function ( el ) {
    el.classList.remove( `current` );
  } );
  poses[ intervalIdx ].classList.add( `current` );
  intervalIdx++;
  if ( !( intervalIdx < poses.length ) ) {
    intervalIdx = 0;
  }
}, 10000 );
document.getElementById( `toggly` )
  .addEventListener( `click`, function () {
    document.getElementById( "poses" )
      .style.display = document.getElementById( "toggly" )
      .checked ? "block" : "none";
  } );
