document.head.insertAdjacentHTML(
    "beforeend",
    '<style id="slider--fade-effect">' +
        ".slider.slider--effect-fade{scroll-behavior: auto !important;}" +
        ".slider__slide img ~ img {visibility: hidden;}" +
        ".slider__slide img.fade--transition {" +
        "visibility:visible;" +
        "opacity:0;" +
        "transition-property:opacity;" +
        "transition-timing-function:cubic-bezier(.4,0,.2,1);" +
        "transition-duration: 1s;" +
        "}" +
        "</style>"
);

const _getElementTransitionDurationMs = (element) => {
    const { transitionDuration } = window.getComputedStyle(element);
    const _float = parseFloat(transitionDuration);

    return isNaN(_float)
        ? 0
        : _float * (transitionDuration.indexOf("ms") > 0 ? 1 : 1000);
};

// copy images from next and previous slides
// to make them fade after instant scroll
const _copyImages = (items) => {
    let html = items.map(
        (item) => item?.querySelector?.("div.image--wrapper")?.innerHTML
    );

    for (let i = items.length - 1; i >= 0; i--) {
        items[i]
            ?.querySelector?.("div.image--wrapper")
            ?.insertAdjacentHTML?.(
                "beforeend",
                (html[i - 1] || "") + (html[i + 1] || "")
            );

        let images = items[i].querySelectorAll("div.image--wrapper img");

        (images[2] || images[1])?.classList?.add?.("fade--on-prev");
        images[1]?.classList?.add?.("fade--on-next");
    }
};

const _transition = (img) => {
    img.classList.add("fade--transition");

    setTimeout(
        () => img.classList.remove("fade--transition"),
        _getElementTransitionDurationMs(img) + 100
    );
};

const scrollTo = (component, options) => {
    if (!component._imagesCopied) {
        _copyImages(component.sliderItems);
        component._imagesCopied = true;
    }

    window.requestAnimationFrame(() => {
        const { slider } = component;

        if (options.left > slider.scrollLeft) {
            slider.querySelectorAll(".fade--on-next").forEach(_transition);
        } else {
            slider.querySelectorAll(".fade--on-prev").forEach(_transition);
        }

        slider.scrollTo(options);
    });
};

export { scrollTo };
