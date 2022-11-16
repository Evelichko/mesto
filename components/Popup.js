export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }
  open() {
   this._popup.classList.add('popup_opened');
  }
  close() {
   this._popup.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
     this._popup.classList.remove('popup_opened');
    }
    }
  setEventListeners() {
    this._popup.addEventListener('click', function(evt){
      if (evt.target.classList.contains('popup_opened')) {
        this.classList.remove('popup_opened');
      }
  });
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
  }

