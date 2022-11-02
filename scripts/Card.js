export default class Card {
  constructor(item, templateSelector, handlePreview) {
    this._name = item.name;
    this._link = item.link
    this._templateSelector = templateSelector;
    this._handlePreview = handlePreview;
  }
  getNewCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._clickButtonLikeHandler();
    this._removeCardHandler();
    this._openPopupHandler();
    return this._element;
  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }
  _openPopupHandler() {
    this._element.querySelector('.element__image').addEventListener('click', (evt) => this._handlePreview(this._name, this._link));
  }
  _clickButtonLikeHandler() {
    console.log(this._element);

    this._element.querySelector('.element__btn-like').addEventListener('click', () => this._toggleButtonLike());

  }
  _toggleButtonLike() {
    this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active');
  }
  _removeCard() {
    this._element.remove();
  }
  _removeCardHandler() {
    this._element.querySelector('.element__btn-remove').addEventListener('click', () => this._removeCard());
  }
}
