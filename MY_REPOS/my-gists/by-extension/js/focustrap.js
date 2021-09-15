// Reusable Focus Trap Method
export function createFocusTrap(el, opt = {}) {
    let isActive = false

    const focusableElementSelectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
    ]
    const focusableElements = el.querySelectorAll(
        focusableElementSelectors.join(', ')
    )
    const lastFocusableElement = focusableElements[focusableElements.length - 1]

    const defaults = {
        toggleElement: focusableElements[0],
        escape: true,
        onEscape: () => {}
    }
    const options = Object.assign({}, defaults, opt)

    const handleKeyPress = e => {
        if (!isActive || e.ctrlKey || e.metaKey || e.altKey) {
            return
        }
        switch (e.keyCode) {
            case 27: // ESC
                if (options.escape) {
                    options.onEscape()
                    options.toggleElement.focus()
                }
                break

            case 9: // TAB
                if (e.shiftKey) {
                    if (document.activeElement === options.toggleElement) {
                        lastFocusableElement.focus()
                        e.preventDefault()
                    }
                } else if (document.activeElement === lastFocusableElement) {
                    options.toggleElement.focus()
                    e.preventDefault()
                }
                break

            default:
                break
        }
    }

    function activate() {
        isActive = true
        el.addEventListener('keydown', handleKeyPress)
    }
    function deactivate() {
        isActive = false
        el.removeEventListener('keydown', handleKeyPress)
    }

    return {
        activate,
        deactivate
    }
}