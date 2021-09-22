'use strict';

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

$(document).ready(function() {

  var $top = $(".demo__top");
  var $body = $(".demo__body");
  var $bg1 = $(".svgBg__bg1");
  var $bg2 = $(".svgBg__bg2");
  var $bg3 = $(".svgBg__bg3");
  // jQuery have problems with getting svg elements attrs, so I'm using vanillaJS
  var $trees = [].slice.call(document.querySelectorAll(".svgBg__tree"));
  var $treeParts = [].slice.call(document.querySelectorAll(".svgBg__tree-part"));
  var $leftTrees = $(".svgBg__tree.m--left");
  var $rightTrees = $(".svgBg__tree.m--right");
  var $planeRotater = $(".plane-rotater");
  var $plane = $(".plane");
  var isDesktop = window.matchMedia("(min-width: 769px)").matches;
  var topH = (isDesktop) ? 186 : 149;
  var bg1change, bg2change, bg3change;
  var bg1max = (isDesktop) ? 10 : 8;
  var bg2max = (isDesktop) ? 22 : 18;
  var bg3max = (isDesktop) ? 44 : 35;
  var pullDeltaY;
  var maxPullDeltaY = (isDesktop) ? 70 : 56;
  var treesData = {};
  var treeMaxX = (isDesktop) ? 18 : 14;
  var treeMaxCoef = treeMaxX / maxPullDeltaY;
  var treeChange;
  var planeMaxDeg = -45; // defines maximum plane rotation deg during pull event
  var planeMaxCoef = planeMaxDeg / maxPullDeltaY;
  var planeChange;
  var frame = 1000 / 60; // 60 frames per second
  // duration for release animation for all elements, except flying plane
  var releaseTime = 900;
  var animating = false;
  var planeAnimTime = 3500; // this value must be synced with SASS $planeAnimTime
  
  /* You can find these easing functions on this site
  http://timotheegroleau.com/Flash/experiments/easing_function_generator.htm
  Also, you can customize them with generator,
  like i customized this elasticBig easing, to heavily shake these trees
  */
  var easings = {
    elastic: function(t,b,c,d) {
      var ts = (t/=d)*t;
      var tc = ts*t;
      return b+c*(33*tc*ts + -106*ts*ts + 126*tc + -67*ts + 15*t);
    },
    elasticBig: function(t,b,c,d) {
      var ts = (t/=d)*t;
      var tc = ts*t;
      return b+c*(21*tc*ts + -150*ts*ts + 250*tc + -150*ts + 30*t);
    },
    inCubic: function(t,b,c,d) {
      var tc = (t/=d)*t*t;
      return b+c*(tc);
    }
  };
  
  /* store clones in object */
  var cloneCounter = 1;
  var $items = $(".items");
  var clones = {
    clone1: $(".item-1").clone(),
    clone2: $(".item-2").clone(),
    clone3: $(".item-3").clone()
  };
  
  /* Applies class with padding transition, which shifts content down,
  then it's prepends clone with 0 opacity and absolute position (0,0).
  Then this clone fades in and padding class being removed from $items and
  absolute position removed from inserted clone
  */
  function insertNewClone() {
    var $clone = clones["clone"+cloneCounter];
    $clone.addClass("absPos hidden");
    $items.prepend($clone).addClass("padded");
    $clone.css("top");
    $clone.removeClass("hidden");
    $clone.find(".item__icon").addClass("animated");
    cloneCounter++;
    if (cloneCounter > 3) cloneCounter = 1;
    setTimeout(function() {
      $items.removeClass("padded");
      $clone.removeClass("absPos");
    }, 300);
  };
  
  /* This looks messy, but basically I'm storing tree parts paths D attributes as arrays
  and X&Y coordinates of middle points.
  */
  function storeTreeCoords() {
    var treeId, treeObj, trunkTop, leafsTop;
    
    $trees.forEach(function($tree) {
      treeId = $tree.getAttribute("data-id");
      treesData["tree"+treeId] = {};
      treeObj = treesData["tree"+treeId];
      treeObj.isRight = $tree.classList.contains("m--right");
      treeObj.$treeTrunk = $tree.querySelector(".svgBg__tree-trunk");
      treeObj.$treeLeafs = $tree.querySelector(".svgBg__tree-leafs");
      treeObj.trunkInitArrD = treeObj.$treeTrunk.getAttribute("d").split(" ");
      treeObj.leafsInitArrD = treeObj.$treeLeafs.getAttribute("d").split(" ");
      trunkTop = treeObj.trunkInitArrD[2];
      leafsTop = treeObj.leafsInitArrD[3];
      treeObj.trunkInitX = +trunkTop.split(",")[0];
      treeObj.leafsInitX = +leafsTop.split(",")[0];
      treeObj.trunkInitY = +trunkTop.split(",")[1];
      treeObj.leafsInitY = +leafsTop.split(",")[1];
    });
  };
  
  storeTreeCoords();
  
  /* Each tree consists of two parts - trunk and leafs. 
  Both of these parts created with two quadratic bezier curves (left and right sides).
  Trunk created with C curve, leafs with Q curve. Here you can find good explanation about them:
  http://tutorials.jenkov.com/svg/path-element.html
  Basically, I'm just changing middle point X coordinate of each part
  and it's affects both curves, so this looks like I'm magically tilt these trees
  */
  function tiltTrees(x) {
    var treeId, treeObj, trunkArr, leafsArr, changeX;

    $trees.forEach(function($tree) {
      treeId = $tree.getAttribute("data-id");
      treeObj = treesData["tree"+treeId];
      trunkArr = treeObj.trunkInitArrD.slice();
      leafsArr = treeObj.leafsInitArrD.slice();
      changeX = (treeObj.isRight) ? x : -x;
      
      trunkArr[2] = (treeObj.trunkInitX + changeX/2) + "," + treeObj.trunkInitY;
      leafsArr[3] = (treeObj.leafsInitX + changeX) + "," + treeObj.leafsInitY;

      treeObj.$treeTrunk.setAttribute("d", trunkArr.join(" "));
      treeObj.$treeLeafs.setAttribute("d", leafsArr.join(" "));
    });
  };
  
  /* Moving mountains and tree <g> elements with transform translateY
  transform-origin's hardcoded for each element in css and scales with viewBox
  */
  function moveBgs() {
    $bg1.css({"-webkit-transform": "translate3d(0,"+bg1change+"px, 0)",
              "transform": "translate3d(0,"+bg1change+"px, 0)"});
    $bg2.css({"-webkit-transform": "translate3d(0,"+bg2change+"px, 0)",
              "transform": "translate3d(0,"+bg2change+"px, 0)"});
    $bg3.css({"-webkit-transform": "translate3d(0,"+bg3change+"px, 0)",
              "transform": "translate3d(0,"+bg3change+"px, 0)"});
    $leftTrees.css({"-webkit-transform": "translate3d(0,"+bg2change+"px, 0)",
                    "transform": "translate3d(0,"+bg2change+"px, 0)"});
    $rightTrees.css({"-webkit-transform": "translate3d(0,"+bg3change+"px, 0)",
                     "transform": "translate3d(0,"+bg3change+"px, 0)"});
  };
  
  function checkMaxBgValues() {
    if (bg1change > bg1max) bg1change = bg1max;
    if (bg2change > bg2max) bg2change = bg2max;
    if (bg3change > bg3max) bg3change = bg3max;
  };
  
  // applies changes for all elements
  function applyChanges(topY) {
    $top.css("height", topH + topY + "px");
    moveBgs();
    tiltTrees(treeChange);
    $planeRotater.css({"-webkit-transform": "rotate("+planeChange+"deg)",
                       "transform": "rotate("+planeChange+"deg)"});
  };
  
  /* calculates numbers for applyChanges function, when
  you are using mousemove/touchmove pull event
  */
  function pullChange(y) {
    if (y < 0) y = 0;
    if (y > maxPullDeltaY) y = maxPullDeltaY;
    bg1change = bg2change = bg3change = y;
    checkMaxBgValues();
    treeChange = y * treeMaxCoef;
    planeChange = y * planeMaxCoef;
    
    applyChanges(y);
  };
  
  /* calculates numbers for applyChanges function, when
  release event is fired
  */
  function releaseChange(props) {
    bg1change = bg2change = bg3change = props.bgY;
    checkMaxBgValues();
    treeChange = props.treeVal * treeMaxCoef;
    planeChange = props.planeDeg * planeMaxCoef;
    
    applyChanges(props.topY);
  };
  
  function release() {
    // number of frames, which you need to animate with requestAnimationFrame
    var steps = Math.floor(releaseTime / frame);
    var curStep = 0;
    var topY, bgY, treeVal, planeDeg;
    var y = pullDeltaY;
    if (y > maxPullDeltaY) y = maxPullDeltaY;
    var releasePlane = y >= maxPullDeltaY/2;
    animating = true; // prevents from pull event during animation
    // if you pulled more than 1/2 of maxPullDeltaY - starts the plane flight animation
    if (releasePlane) {
      $plane.addClass("fly"); // adds class to plane with keyframes animation
      setTimeout(function() {
        // when animation is over, allow pull events, remove keyframes class and add new clone
        animating = false;
        $plane.removeClass("fly");
        insertNewClone();
      }, planeAnimTime);
    }
    
    /* this function fires each available frame,
    until animation will be over (curStep > steps)
    */
    function animate() {
      curStep++;
      // applies different easings for different groups of elements
      topY = easings.elastic(curStep, y, 0 - y, steps);
      bgY = easings.elastic(curStep, y, 0 - y, steps);
      treeVal = easings.elasticBig(curStep, y, 0 - y, steps);
      planeDeg = easings.inCubic(curStep, y, 0 - y, steps);
      
      releaseChange({topY: topY, bgY: bgY, treeVal: treeVal, planeDeg: planeDeg});
      
      if (curStep > steps) {
        pullDeltaY = 0;
        // if pulled less than 1/2 of maxPullDeltaY - allow pull event earlier
        if (!releasePlane) animating = false;
        return;
      }
      requestAnimFrame(animate);
    }
    animate();
  };
  
  /* On mousedown/touchstart, attaches mousemove/touchmove events
  for dynamic pull change events. When mouseup/touchend event fired -
  runs release function and removes move/end events
  */
  $(document).on("mousedown touchstart", ".demo__body", function(e) {
    if (animating) return; // prevents from pulling during the release animation
    var startY =  e.pageY || e.originalEvent.touches[0].pageY;
    
    $(document).on("mousemove touchmove", function(e) {
      var y = e.pageY || e.originalEvent.touches[0].pageY;
      pullDeltaY = (y - startY) / 1.5; // slightly slow pull event for better experience
      if (!pullDeltaY) return; // prevents from rapid click events
      pullChange(pullDeltaY);
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaY) return; // prevents from rapid click events
      release();
    });
  });
  
  // source - http://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  /* redifine max values for desktop/mobile
  all other things scales with rem units and viewBox
  */
  var resizeFn = debounce(function() {
    isDesktop = window.matchMedia("(min-width: 769px)").matches;
    topH = (isDesktop) ? 186 : 149;
    bg1max = (isDesktop) ? 10 : 8;
    bg2max = (isDesktop) ? 22 : 18;
    bg3max = (isDesktop) ? 44 : 35;
    maxPullDeltaY = (isDesktop) ? 70 : 56;
    treeMaxX = (isDesktop) ? 18 : 14;
  }, 100);
  
  $(window).on("resize", resizeFn);
  

});