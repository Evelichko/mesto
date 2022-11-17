import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ selector, handelFormSubmit }) {
    super(selector);
    this._handelFormSubmit = handelFormSubmit;
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__form-input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handelFormSubmit(this._getInputValues())
    });
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }
}
