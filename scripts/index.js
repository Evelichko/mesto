import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const popupProfile = document.querySelector('.popup_profile');
const buttonClose = popupProfile.querySelector('.popup__btn-close');
const buttonEdit = document.querySelector('.profile__btn-edit');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const nameInput = formPopupProfile.querySelector('.popup__form-input_value_name');
const jobInput = formPopupProfile.querySelector('.popup__form-input_value_job');
const namer = document.querySelector('.profile__author');
const job = document.querySelector('.profile__author-info');
const cards = document.querySelector('.elements');
const popupPlace = document.querySelector('.popup_place');
const buttonClosePopupPlace = popupPlace.querySelector('.popup__btn-close');
const formElementPopupPlace = popupPlace.querySelector('.popup__form');
const buttonAddPic = document.querySelector('.profile__btn-add');
const placeInput = formElementPopupPlace.querySelector('.popup__form-input_value_place');
const linkInput = formElementPopupPlace.querySelector('.popup__form-input_value_link');
const popupPic = document.querySelector('.popup_picture');
const popupPicImg = document.querySelector('.popup__image');
const buttonClosePopupPic = popupPic.querySelector('.popup__btn-close');
const templateSelector = '#template';
const cardsList = document.querySelector('.elements__list');
const popupPicDescription = document.querySelector('.popup__description');

function openPopup(item) {
  item.classList.add('popup_opened');
  item.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  item.removeEventListener('click', closeByOverlay);
}

function handlePreview(name, link) {
  popupPicImg.src = link;
  popupPicDescription.textContent = name;
  popupPicImg.alt = name;
  openPopup(popupPic);
}

const closeButtons = document.querySelectorAll('.popup__btn-close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popup = evt.target;
    closePopup(popup);
  }
}

buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddPic.addEventListener('click', () => openPopup(popupPlace));


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  namer.textContent = nameValue;
  job.textContent = jobValue;
  closePopup(popupProfile);
}
formPopupProfile.addEventListener('submit', handleProfileFormSubmit);

// function createCard(item) {

//   const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
//   const cardImg = newCard.querySelector('.element__image');
//   cardImg.src = item.link;
//   cardImg.alt = item.name;
//   newCard.querySelector('.element__name').textContent = item.name;

//   cardImg.addEventListener('click', function (evt) {
//     const picture = evt.target;
//     popupPicImg.src = picture.src;
//     popupPicDescription.textContent = picture.alt;
//     popupPicImg.alt = picture.alt;
//     openPopup(popupPic);
//   });

//   newCard.querySelector('.element__btn-like').addEventListener('click', function (evt) {
//     const button = evt.target;
//     button.classList.toggle('element__btn-like_active');
//   });

//   newCard.querySelector('.element__btn-remove').addEventListener('click', function (evt) {
//     newCard.remove();
//   });
//   return newCard;
// }

// const cardImg = newCard.querySelector('.element__image');
// const cardName = newCard.querySelector('.element__name');

function createCard(item) {
  if(Array.isArray(item)) {
  item.forEach(el => {
    const card = new Card(el, templateSelector, handlePreview);
    cardsList.prepend(card.getNewCard());
  });
}
else {
const card = new Card(item, templateSelector, handlePreview);
cardsList.prepend(card.getNewCard());
}
}

createCard(initialCards);

const buttonSubmitPopupPlace = formElementPopupPlace.querySelector('.popup__btn-save');
function handlePopupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  createCard(values);
  formElementPopupPlace.reset();
  buttonSubmitPopupPlace.classList.add('popup__btn-save_inactive');
  buttonSubmitPopupPlace.setAttribute('disabled', true);
  closePopup(popupPlace);
}
formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-error'
}

const CardFormValidation = new FormValidator(validationObj, formElementPopupPlace);
const ProfileFormValidation = new FormValidator(validationObj, formPopupProfile);

CardFormValidation.enableValidation();
ProfileFormValidation.enableValidation();


