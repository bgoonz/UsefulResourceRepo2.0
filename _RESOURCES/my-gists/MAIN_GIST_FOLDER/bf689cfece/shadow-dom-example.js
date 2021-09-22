customElements.define("my-bubble", class extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById("my-element-template").content;
        const shadowRoot = this.attachShadow({mode: "open"});

        shadowRoot.appendChild(template.cloneNode(true));
    }
});