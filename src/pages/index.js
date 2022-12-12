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
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import {validationConfig} from '../scripts/constants.js';

const popupProfile = document.querySelector('.popup_profile');
const buttonEdit = document.querySelector('.profile__btn-edit');
const formPopupProfile = popupProfile.querySelector('.popup__form');
const nameInput = formPopupProfile.querySelector('.popup__form-input_value_name');
const jobInput = formPopupProfile.querySelector('.popup__form-input_value_job');
const buttonAddPic = document.querySelector('.profile__btn-add');
const templateSelector = '#template';
const avatar = document.querySelector('.profile__avatar-edit');
const popupWithImg = new PopupWithImage(popupWithImgSelector);
const userInfoProfile = new UserInfo(profileSelectors);
const formElementPopupAvatar = document.forms["form-avatar"];
const formElementPopupPlace = document.forms["form-place"];

popupWithImg.setEventListeners();

function handleCardClick(name, link) {
  popupWithImg.open(name, link);
}

const popupProfileForm = new PopupWithForm({
  selector: '.popup_profile',
  handelFormSubmit: (values) => {
    newApi.editProfileInfo(values)
      .then((item) => {
        userInfoProfile.setUserInfo(item);
        popupProfileForm.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupProfileForm.renderLoading(false);
      });
  }
});

popupProfileForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const valuesProfile = userInfoProfile.getUserInfo();
  nameInput.value = valuesProfile.name;
  jobInput.value = valuesProfile.about;
  popupProfileForm.open();
});

buttonAddPic.addEventListener('click', () => {
  popupPlaceForm.open();
  cardFormValidation.disactivateSubmit();
});

let currentId = '';

function createCard(items) {
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
        popupPlaceForm.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupPlaceForm.renderLoading(false);
      })
  },
});

popupPlaceForm.setEventListeners();

const cardFormValidation = new FormValidator(validationConfig, formElementPopupPlace);
const profileFormValidation = new FormValidator(validationConfig, formPopupProfile);
const profileAvatarValidation = new FormValidator(validationConfig, formElementPopupAvatar);

cardFormValidation.enableValidation();
profileFormValidation.enableValidation();
profileAvatarValidation.enableValidation();

const newApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '8ef9753a-56c8-46fe-95ac-52c3354ee4d6',
    'Content-Type': 'application/json'
  }
}); 
  
Promise.all([newApi.getUserData(), newApi.getAllCards()])
  .then(([userData, items]) => {
     currentId = userData._id;
      cardsList.renderItems(items);
      userInfoProfile.setUserInfo(userData); 
  })
  .catch((error) => console.log(error));

const submitPopup = new PopupWithSubmit({
  selector: '.popup_submit',

  removeCardForSure: (id, card) => {
    newApi.removeCard(id)
      .then(() => {
        card.removeCard();
        submitPopup.close();
      })
      .catch((error) => {
        console.log(error)
      })
  }
});


submitPopup.setEventListeners();


function handelRemoveClick(id, card) {
  submitPopup.open();
  submitPopup.fixCardInfo(id, card);
}

function handelAddLike(card) {
  newApi.addLike(card._id)
    .then((data) => {
      card.likeCounter.textContent = data.likes.length;
      card.addLike();
    })
    .catch((error) => {
      console.log(error)
    })
}

function handelRemoveLike(card) {
  newApi.removeLike(card._id)
    .then((data) => {
      card.likeCounter.textContent = data.likes.length;
      card.deleteLike();
    })
    .catch((error) => {
      console.log(error)
    })
}

const popupAvatar = new PopupWithForm({
  selector: '.popup_avatar',
  handelFormSubmit: (link) => {
    newApi.editAvatar(link)
      .then((data) => {
        userInfoProfile.setUserInfo(data);
        popupAvatar.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      })
  }
})
popupAvatar.setEventListeners();
avatar.addEventListener('click', () => {
  profileAvatarValidation.disactivateSubmit();
  popupAvatar.open()
});
