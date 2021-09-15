import { createFocusTrap } from './focustrap'

const SELECTORS = {
    nav: '.js-nav',
    toggleBtn: '.js-nav-toggle'
}

const CLASSES = {
    open: 'nav--open'
}

export default class Navigation {
    constructor(el) {
        this.isOpen = false

        this.nav = el
        this.toggleBtn = this.nav.querySelector(SELECTORS.toggleBtn)
 
        this.toggleBtn.addEventListener('click', () => this.toggleMenu())
        this.focusTrap = createFocusTrap(this.nav, {
            toggleElement: this.toggleBtn,
            onEscape: () => this.toggleMenu()
        })
    }

    toggleMenu() {
        this.isOpen = !this.isOpen

        if (this.isOpen) {
            this.nav.classList.add(CLASSES.open)
            this.focusTrap.activate()
        } else {
            this.nav.classList.remove(CLASSES.open)
            this.focusTrap.deactivate()
        }
        this.toggleBtn.setAttribute('aria-expanded', String(this.isOpen))
    }
}

const navElement = document.querySelector(SELECTORS.nav)
if (navElement) {
    new Navigation(navElement)
}