import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
import Close_icon from '../images/Close-icon.svg';
import GarbageButton from '../images/GarbageButton.svg';
import Like from '../images/Like.svg';
import logo from '../images/logo.svg';
import plus from '../images/Plus.svg';
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
//  import { values } from "core-js/core/array";


const whoIsTheGoat = [
  { name: 'blackLike', image: blackLike },
  { name: 'Button_element', link: Button_element },
  { name: 'Close_icon', link: Close_icon },
  { name: 'GarbageButton', link: GarbageButton },
  { name: 'Like', link: Like },
  { name: 'logo', link: logo },
  { name: 'plus', link: plus },
];


const popupProfile = document.querySelector('.popup_profile');
const buttonEdit = document.querySelector('.profile__btn-edit');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const nameInput = formPopupProfile.querySelector('.popup__form-input_value_name');
const jobInput = formPopupProfile.querySelector('.popup__form-input_value_job');
const popupPlace = document.querySelector('.popup_place');
const formElementPopupPlace = popupPlace.querySelector('.popup__form');
const buttonAddPic = document.querySelector('.profile__btn-add');
const templateSelector = '#template';
const avatar = document.querySelector('.profile__avatar-edit');
const popupWithImg = new PopupWithImage(popupWithImgSelector);
const userInfoProfile = new UserInfo(profileSelectors);
const popupChangeAvatar = document.querySelector('.popup_avatar');
const formElementPopupAvatar = popupChangeAvatar.querySelector('.popup__form');



popupWithImg.setEventListeners();

function handleCardClick(name, link) {
  popupWithImg.open(name, link);
}

const popupProfileForm = new PopupWithForm({
  selector: '.popup_profile',
  handelFormSubmit: (values) => {
    newApi.editProfileInfo(values)
      .then((item) => {
        userInfoProfile.setUserInfo(values);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupPlaceForm.renderLoading(false);
      });
    popupProfileForm.close();
  }
});

popupProfileForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const valuesProfile = userInfoProfile.getUserInfo();
  nameInput.value = valuesProfile.name;
  jobInput.value = valuesProfile.about;
  popupProfileForm.open();
});

buttonAddPic.addEventListener('click', () => popupPlaceForm.open());

let currentId = '';

function createCard(items) {
  console.log(currentId);
  const card = new Card(items, templateSelector, handleCardClick, handelRemoveClick, currentId, handelAddLike, handelRemoveLike); //changes
  const newCard = card.getNewCard();
  return newCard;
}

const cardsList = new Section({
  renderer: (item) => {
    const cards = createCard(item);
    cardsList.addItem(cards);
  },
},
  cardListSection
);

const popupPlaceForm = new PopupWithForm({
  selector: '.popup_place',
  handelFormSubmit: (values) => {
    newApi.addNewCard(values)
      .then((item) => {
        const newCard = createCard(item);
        cardsList.addNewItem(newCard);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupPlaceForm.renderLoading(false);
      })
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
const profileAvatarValidation = new FormValidator(validationConfig, formElementPopupAvatar);

cardFormValidation.enableValidation();
profileFormValidation.enableValidation();
profileAvatarValidation.enableValidation();

const apiConfig = {
  url: "https://nomoreparties.co/v1/cohort-55/",
  headers: {
    "Content-type": 'application/json',
    authorization: '8ef9753a-56c8-46fe-95ac-52c3354ee4d6'
  }
}

const newApi = new Api(apiConfig);

newApi.getUserData()
  .then((userData) => {
    currentId = userData._id;
  })
  .catch((error) => console.log(error));


newApi.getAllCards()
  .then((items) => {
    cardsList.renderItems(items);
  })
  .catch((error) => console.log(error));


newApi.getProfileInfo()
  .then((item) => {
    userInfoProfile.setUserInfo(item);
  })
  .catch((error) => console.log(error));


const submitPopup = new PopupWithSubmit({
  selector: '.popup_submit',

  removeCardForSure: (id, card) => {
    newApi.removeCard(id)
      .then(() => {
        card.remove();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        submitPopup.close();
      })
  }
});


submitPopup.setEventListeners();


function handelRemoveClick(id, card) {
  submitPopup.open();
  submitPopup.fixCardInfo(id, card);
}

function handelAddLike(id, likeCounter) {
  newApi.addLike(id)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
    })
    .catch((error) => {
      console.log(error)
    })
}

function handelRemoveLike(id, likeCounter) {
  console.log("remove" + id);
  newApi.removeLike(id)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
    })
    .catch((error) => {
      console.log(error)
    })
}

const popupAvatar = new PopupWithForm({
  selector: '.popup_avatar',
  handelFormSubmit: (link) => {
    console.log(link);
    newApi.editAvatar(link)
      .then((data) => {
        userInfoProfile.setNewAvatar(data);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
        popupAvatar.close();
      })
  }
})
popupAvatar.setEventListeners();
avatar.addEventListener('click', () => {
  profileAvatarValidation.disactivateSubmit();
  popupAvatar.open()
});
