let element = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__btn-close');
let buttonEdit = document.querySelector('.profile__btn-edit');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-job');
let namer = document.querySelector('.profile__author');
let job = document.querySelector('.profile__author-info');
// let buttonSubmit = document.querySelector('.popup__btn-save');

let nameValue = nameInput.value;
let jobValue = jobInput.value;


buttonEdit.addEventListener('click', function () {
  element.classList.add('popup_opened');
});

buttonClose.addEventListener('click', function () {
  element.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  namer.textContent = nameValue;
  job.textContent = jobValue;
}
formElement.addEventListener('submit', formSubmitHandler);
// buttonSubmit.addEventListener('submit', function () {
//   element.classList.remove('popup_opened');
// });
