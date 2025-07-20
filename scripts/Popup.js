const rootSelector = '[data-js-popup]';

class Popup {
    selectors = {
        root: 'rootSelector',
        popupContentElement: '[data-js-popup-content]',
        showPopupButton: '[data-js-popup-button]',
        closePopupButton: '[data-js-close-popup]',
    }

    stateAttributes = {
        ariaHidden: 'aria-hidden',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.showPopupButton = document.querySelector(this.selectors.showPopupButton);
        this.closePopupButton = document.querySelector(this.selectors.closePopupButton);
        this.bindEvents();
    }

    showPopup() {
        this.rootElement.setAttribute(this.stateAttributes.ariaHidden, false);
        document.body.style.overflow = 'hidden';
    }

    closePopup() {
        this.rootElement.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    onKeyDown(e) {
        if (e.key === 'Escape' && this.rootElement.getAttribute('aria-hidden') === 'false') {
            this.closePopup();
        }
    }

    closePopupOnClickOverlay(e) {
        if (e.target === this.rootElement || e.target.classList.contains('popup__overlay')) {
            this.closePopup();
        }
    }

    bindEvents() {
        this.rootElement.addEventListener('keydown', this.onKeyDown.bind(this));
        this.rootElement.addEventListener('click', this.closePopupOnClickOverlay.bind(this));
        this.showPopupButton.addEventListener('click', this.showPopup.bind(this));
        this.closePopupButton.addEventListener('click', this.closePopup.bind(this));
    }
}

class PopupCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Popup(element);
        });
    }
}

export default PopupCollection