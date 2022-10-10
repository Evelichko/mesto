formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach((item) => {
    setEventListeners(item);
  });
};


const isValid = (formItem, inputItem) => {
  if (!inputItem.validity.valid) {
    showInputError(formItem, inputItem, inputItem.validationMessage);
  } else {
    hideInputError(formItem, inputItem);
  }
};


const showInputError = (item, inputElement, errorMessage) => {
  const errorElement = item.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.errorClass);
};


const hideInputError = (item, inputElement) => {
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

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationObj.inactiveButtonClass);
  }
};
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(validationObj.inputSelector));
  const buttonElement = form.querySelector(validationObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-error'
}
enableValidation(validationObj);
