export default class Hamburger {
  constructor(menuClass, hamburgerClass) {
    this._menuClass = menuClass;
    this._hamburgerClass = hamburgerClass;

    this._menuElement = document.querySelector(`.${this._menuClass}`);
    this._hamburgerElement = document.querySelector(`.${this._hamburgerClass}`);

    this._isOpened = false;

    this._handlehamburgerClick = this._handlehamburgerClick.bind(this);
    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);

    this._ariaLabel = {
      closed: 'Закрыть навигацию по сайту',
      opened: 'Открыть навигацию по сайту',
    };

    this._hamburgerElement.setAttribute('aria-label', this._ariaLabel.opened);
  }

  init() {
    this._hamburgerElement.addEventListener('click', this._handlehamburgerClick);
  }

  _show() {
    this._hamburgerElement.classList.add('is-active');
    this._hamburgerElement.setAttribute('aria-label', this._ariaLabel.closed);
    this._menuElement.classList.add(`${this._menuClass}--opened`);
    this._menuHeight = this._menuElement.scrollHeight;
    this._menuElement.style.maxHeight = `${this._menuHeight}px`;
    this._isOpened = true;
  }

  _hide() {
    this._hamburgerElement.classList.remove('is-active');
    this._hamburgerElement.setAttribute('aria-label', this._ariaLabel.opened);
    this._menuElement.classList.remove(`${this._menuClass}--opened`);
    this._menuElement.style.maxHeight = `0px`;
    this._isOpened = false;
  }

  _handlehamburgerClick(evt) {
    evt.preventDefault();

    if (this._isOpened) {
      this._hide();
      return;
    }
    setTimeout(this._show, 100);
  }
}
