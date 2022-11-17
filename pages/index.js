import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from '../scripts/constants.js';
import Section from '../components/Section.js';
import { cardListSection } from "../scripts/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { popupWithImgSelector } from "../scripts/constants.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import { profileSelectors } from "../scripts/constants.js";

import './index.css';

import blackLike from '../images/blackLike.svg';
import Button_element from '../images/Button__element.svg';
import Church__in__mountains from '../images/Church__in__mountains.jpg';
import Close_icon from '../images/Close-icon.svg';
import GarbageButton from '../images/GarbageButton.svg';
import Kusto from '../images/Kusto.jpg';
import Like from '../images/Like.svg';
import logo from '../images/logo.svg';
import Mountains from '../images/Mountains.png';
import plus from '../images/Plus.svg';
import Sunrise__and__mountains from '../images/Sunrise__and__mountains.png';


const whoIsTheGoat = [
  { name: 'blackLike', image: blackLike },
  { name: 'Button_element', link: Button_element },
  { name: 'Church__in__mountains', link: Church__in__mountains },
  { name: 'Close_icon', link: Close_icon },
  { name: 'GarbageButton', link: GarbageButton },
  { name: 'Kusto', link: Kusto },
  { name: 'Like', link: Like },
  { name: 'logo', link: logo },
  { name: 'Mountains', link: Mountains },
  { name: 'plus', link: plus },
  { name: 'Sunrise__and__mountains', link: Sunrise__and__mountains },
];


const popupProfile = document.querySelector('.popup_profile');
const buttonEdit = document.querySelector('.profile__btn-edit');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const nameInput = formPopupProfile.querySelector('.popup__form-input_value_name');
const jobInput = formPopupProfile.querySelector('.popup__form-input_value_job');
const popupPlace = document.querySelector('.popup_place');
const formElementPopupPlace = popupPlace.querySelector('.popup__form');
const buttonAddPic = document.querySelector('.profile__btn-add');
const popupPic = document.querySelector('.popup_picture');
const templateSelector = '#template';

const popupWithImg = new PopupWithImage(popupWithImgSelector);
const userInfoProfile = new UserInfo(profileSelectors);

popupWithImg.setEventListeners();

function handleCardClick(name, link) {
  popupWithImg.open(name, link);
}

const popupProfileForm = new PopupWithForm({
  selector: '.popup_profile',
  handelFormSubmit: (values) => {
    userInfoProfile.setUserInfo(values);
    popupProfileForm.close();
  }
});

popupProfileForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const valuesProfile = userInfoProfile.getUserInfo();
  nameInput.value = valuesProfile.name;
  jobInput.value = valuesProfile.job;
  popupProfileForm.open();
});

buttonAddPic.addEventListener('click', () => popupPlaceForm.open());

function createCard(items){
  const card = new Card(items, templateSelector, handleCardClick);
  const newCard = card.getNewCard();
  cardsList.addItem(newCard);
  return newCard;
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
  },
},
  cardListSection
);

cardsList.renderItems();

const popupPlaceForm = new PopupWithForm({
  selector: '.popup_place',
  handelFormSubmit: (values) => {
    createCard(values);
    popupPlaceForm.close();
    cardFormValidation.disactivateSubmit();
  },
});
popupPlaceForm.setEventListeners();


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
