const element = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__btn-close');
const buttonEdit = document.querySelector('.profile__btn-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-input_value_name');
const jobInput = formElement.querySelector('.popup__form-input_value_job');
const namer = document.querySelector('.profile__author');
const job = document.querySelector('.profile__author-info');

function popupOpened() {
  element.classList.add('popup_opened');
  nameInput.value = namer.textContent;
  jobInput.value = job.textContent;
}

function popupClosed() {
  element.classList.remove('popup_opened');
}
buttonEdit.addEventListener('click', popupOpened);
buttonClose.addEventListener('click', popupClosed);

function formSubmitHandler(evt) {
   evt.preventDefault();

   const nameValue = nameInput.value;
   const jobValue = jobInput.value;

   namer.textContent = nameValue;
   job.textContent = jobValue;
   popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);
