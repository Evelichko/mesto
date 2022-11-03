import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards} from './constants.js';

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

function createCard(item) {
    const card = new Card(item, templateSelector, handlePreview);
    const newCard = card.getNewCard();
    return newCard;
  }

initialCards.forEach((el) => {
  cardsList.prepend(createCard(el));
});

const buttonSubmitPopupPlace = formElementPopupPlace.querySelector('.popup__btn-save');
function handlePopupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardsList.prepend(createCard(values));
  formElementPopupPlace.reset();
  cardFormValidation.disactivateSubmit();
  closePopup(popupPlace);
}


formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-error'
}

const cardFormValidation = new FormValidator(validationConfig, formElementPopupPlace);
const profileFormValidation = new FormValidator(validationConfig, formPopupProfile);

cardFormValidation.enableValidation();
profileFormValidation.enableValidation();


