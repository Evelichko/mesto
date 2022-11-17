export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  getNewCard() {
    this._element = this._getTemplate();
    this._elImg = this._element.querySelector('.element__image');
    this._elImg.src = this._link;
    this._elImg.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._clickButtonLikeHandler();
    this._removeCardHandler();
    this._openPopupHandler();
  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }
  _openPopupHandler() {
    this._elImg.addEventListener('click', (evt) => this._handleCardClick(this._name, this._link));
  }
  _clickButtonLikeHandler() {
    this._element.querySelector('.element__btn-like').addEventListener('click', () => this._toggleButtonLike());
  }
  _toggleButtonLike() {
    this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active');
  }
  _removeCard() {
    this._element.remove();
    this._element = null;
  }
  _removeCardHandler() {
    this._element.querySelector('.element__btn-remove').addEventListener('click', () => this._removeCard());
  }
}
