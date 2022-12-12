import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ selector, handelFormSubmit }) {
    super(selector);
    this._handelFormSubmit = handelFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__form-input');
    this._form = this._popup.querySelector('.popup__form');
    this._btnSave = this._popup.querySelector('.popup__btn-save')

  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    console.log(this._formValues);
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handelFormSubmit(this._getInputValues())
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading){
    if(isLoading){
      this._btnSave.textContent = "Сохранение...";
    }
    else {
      this._btnSave.textContent = "Сохранить";
    }
  }
}
