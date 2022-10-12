const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-error'
}

const enableValidation = (validationObj) => {
  const formList = document.querySelectorAll(validationObj.formSelector);
  formList.forEach((item) => {
    setEventListeners(item, validationObj);
  });
};


const toggleInputErrorState = (formItem, inputItem, validationObj) => {
  if (!inputItem.validity.valid) {
    showInputError(formItem, inputItem, inputItem.validationMessage, validationObj);
  } else {
    hideInputError(formItem, inputItem, validationObj);
  }
};


const showInputError = (item, inputElement, errorMessage, validationObj) => {
  const errorElement = item.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.errorClass);
};


const hideInputError = (item, inputElement, validationObj) => {
  inputElement.classList.remove(validationObj.inputErrorClass);
  const errorElement = item.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(validationObj.errorClass);
  errorElement.textContent = '';
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validationObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
   buttonElement.classList.remove(validationObj.inactiveButtonClass);
  }
};
const setEventListeners = (form, validationObj) => {
  const inputList = Array.from(form.querySelectorAll(validationObj.inputSelector));
  const buttonElement = form.querySelector(validationObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleInputErrorState(form, inputElement, validationObj);
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
};

enableValidation(validationObj);
