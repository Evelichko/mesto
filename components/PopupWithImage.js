import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
  }
  open(text, link){
      this._popup.querySelector('.popup__image').src = link;
      this._popup.querySelector('.popup__description').alt = text;
      this._popup.querySelector('.popup__description').textContent = text;
      super.open();
    }
  }

