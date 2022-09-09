let element = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__btn-close');
let buttonEdit = document.querySelector('.profile__btn-edit');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-input_value_name');
let jobInput = formElement.querySelector('.popup__form-input_value_job');
let namer = document.querySelector('.profile__author');
let job = document.querySelector('.profile__author-info');

function popupOpened() {
  element.classList.add('popup_opened');

}

function popupClosed() {
  element.classList.remove('popup_opened');
}
buttonEdit.addEventListener('click', popupOpened);
buttonClose.addEventListener('click', popupClosed);

function formSubmitHandler(evt) {
   evt.preventDefault();

   let nameValue = nameInput.value;
   let jobValue = jobInput.value;

   namer.textContent = nameValue;
   job.textContent = jobValue;
   popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);
