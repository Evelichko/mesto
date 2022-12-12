import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
    this._description = this._popup.querySelector('.popup__description');
  }
  open(text, link) {
    this._image.src = link;
    this._image.alt = text;
    this._popup.querySelector('.popup__description').textContent = text;
    super.open();
  }
}

