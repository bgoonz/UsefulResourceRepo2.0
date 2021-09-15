// collapse burger menu panel in mobile view 

const html = document.querySelector('html');
const body = document.querySelector('body');
const themeButtons = document.querySelectorAll('.theme');
const themeNavInput = document.querySelectorAll('#theme-nav');
const themeNavBtn = document.querySelectorAll('.theme-nav-btn');
const themeEmojis = document.querySelectorAll('label[for*="theme"] > .emoji');
const mediaQueryMobile = 600;
const burgerCheckBox = document.querySelector('.burger-checkbox-class');
const contactForm = document.querySelector('#contact-form');
const more = document.querySelector('.more');

const myObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const contentWidth = entry.contentRect.width;
    if (contentWidth > mediaQueryMobile && burgerCheckBox.checked) {
      burgerCheckBox.checked = false;
    }
  });
});

myObserver.observe(body);

themeButtons.forEach(item => {
  item.addEventListener('click', (e) => {
    const theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = theme;
    invertEmojiColour(theme);
    updateRecaptcha(theme);
    setVarToLocalStorage('theme', theme);
  });
});

function setVarToLocalStorage(varName, value) {
  window.localStorage.setItem(varName, value);
}

setVarToLocalStorage('theme', 'dark');

// change recaptcha to dark by setting the data-theme attribute
function updateRecaptcha(theme) {
  const recaptcha = document.querySelector('.g-recaptcha');
  if (recaptcha) {
    recaptcha.dataset.theme = theme;
    recaptcha.setAttribute('data-theme', theme);
  }
}

updateRecaptcha('dark');

// initialise recaptcha on body onload event
function recaptchaCallback(theme) {
  grecaptcha.render('recaptcha-element', {
    'sitekey' : '6LdAvUIUAAAAAHjrjmjtNTcXyKm0WKwefLp-dQv9',
    'theme' : theme
  });
};

function invertEmojiColour(customTheme) {
  themeEmojis.forEach(item => {
    if (customTheme === 'light') {
      item.classList.add('light');
    } else {
      item.classList.remove('light');
    }
  });
}

const hiddenParas = document.querySelectorAll('p[data-visible]');

more.addEventListener('click', (e) => {
  hiddenParas.forEach(item => {
    const state = item.dataset.visible == 'true' ? 'false' : 'true';
    item.dataset.visible = state;
  });
})