export default class FormValidator {
  constructor(validationObj, formElement) {
    this._validationObj = validationObj;
    this._formSelector = validationObj.formSelector;
    this._inputSelector = validationObj.inputSelector;
    this._submitButtonSelector = validationObj.submitButtonSelector
    this._inactiveButtonClass = validationObj.inactiveButtonClass;
    this._inputErrorClass = validationObj.inputErrorClass;
    this._errorClass = validationObj.errorClass;
    this._formElement = formElement;
  }
  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll( this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disactivateSubmit();
    } else {
      this._activateSubmit();
    }
  }
  _activateSubmit = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', true);
  }

  _disactivateSubmit = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _hasInvalidInput = (inputElement) => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleInputErrorState = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }


  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }
}
