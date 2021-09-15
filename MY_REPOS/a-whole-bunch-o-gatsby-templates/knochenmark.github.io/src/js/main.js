import i18next from 'i18next';
import jqueryI18next from 'jquery-i18next';

import * as skillset from './modules/skillset';

'use strict';

var english = require(".././locales/en.json");
var german = require(".././locales/de.json");

var resources = {
  en: english,
  de: german
};

function initSmoothScrolling(){
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          });
        }
      }
    });
}

function fadeInScrollTopButton(){
  if ($(window).scrollTop() > 250) {
    $('.back-to-top').fadeIn(400);
  } else {
    $('.back-to-top').fadeOut(400);
  }
}

var languageLookup = {
  "Deutsch": "de",
  "English": "en"
}

function switchLanguage(event){
  var target = $(event.target);
  // if($(event.target).hasClass("active"))
  //   return;
  $("#languages .language").removeClass("active");
  target.addClass("active");
  i18next.changeLanguage(languageLookup[target.text()]);
  $("[data-i18n]").localize();
}

function addLanguageSwitchHandler(){
  $("#languages .language").click(switchLanguage)
}

function initJqueryI18next(){
  i18next.init({
    lng: 'en',
    debug: true,
    resources: resources
  }, function(err, t) {
    // initialized and ready to go!
  });

  jqueryI18next.init(i18next, $, {
    tName: 't', // --> appends $.t = i18next.t
    i18nName: 'i18n', // --> appends $.i18n = i18next
    handleName: 'localize', // --> appends $(selector).localize(opts);
    selectorAttr: 'data-i18n', // selector for translating elements
    targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
    optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
    useOptionsAttr: false, // see optionsAttr
    parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
  });
}

// DOM is ready
$(function(){
  initSmoothScrolling();
  initJqueryI18next();
  addLanguageSwitchHandler();
  skillset.init();
  $(window).scroll(fadeInScrollTopButton);
  $("#loader").removeClass("active");
});
