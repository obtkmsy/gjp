class StickyHeader extends HTMLElement {
    connectedCallback() {
        this.header = document.querySelector("sticky-header").parentElement;
        this.currentScrollTop = 0;
        this.scrollUnsubscriber = subscribe(
            PUB_SUB_EVENTS.windowScroll,
            this.onScroll.bind(this)
        );
    }

    disconnectedCallback() {
        this.scrollUnsubscriber?.();
    }

    onScroll() {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        const scrollTrigger = 500;

        if (scrollTop > scrollTrigger && scrollTop < this.currentScrollTop) {
            requestAnimationFrame(this.reveal.bind(this));
        } else {
            this.header.classList.add("sticky-animation");
            requestAnimationFrame(this.reset.bind(this));
        }

        this.currentScrollTop = scrollTop;
    }

    reveal() {
        const predictoveSearch = this.querySelector("predictive-search");

        this.header.classList.add("section-header-sticky");
        this.header.classList.remove("sticky-animation");

        // open predictive search results when it has focus
        if (
            predictoveSearch?.contains?.(document.activeElement) &&
            predictoveSearch?.getQuery?.()
        ) {
            predictoveSearch?.open?.();
        }
    }

    reset() {
        this.header.classList.remove("section-header-sticky");
        this.closeMenuDisclosure();
        // close minicart
        this.querySelector("cart-sidebar")?.close?.();
        // close predictive search
        this.querySelector("predictive-search").close?.();
    }

    closeMinicart() {}

    closeMenuDisclosure() {
        this.disclosures =
            this.disclosures ||
            this.header.querySelectorAll("details-disclosure");
        this.disclosures.forEach((disclosure) => disclosure?.close?.());
    }
}

export { StickyHeader };