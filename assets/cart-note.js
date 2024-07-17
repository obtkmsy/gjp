const { fetchConfig } = await import(
    window._resolveImport?.("helper") || "helper"
);

class CartNote extends HTMLElement {
    constructor() {
        super();

        this.handles = {
            onInput: debounce(this.onInput.bind(this), 300),
        };
    }

    connectedCallback() {
        this.addEventListener("input", this.handles.onInput);
    }

    onInput(event) {
        fetch(window.Shopify.routes.root + "cart/update.js", {
            ...fetchConfig(),
            body: JSON.stringify({
                note: event.target.value,
            }),
        });
    }

    disconnectedCallback() {
        this.removeEventListener("input", this.handles.onInput);
    }
}

export { CartNote };
