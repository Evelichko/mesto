const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горы в Архызе'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Озеро в Челябинсокй области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Жилой дом в Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Вид на вулкан на Камчатке'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Вид на железную дорогу'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Озеро Байкал зимой'
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
const cardTemplate = document.querySelector('#template');
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

  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardImg = newCard.querySelector('.element__image');
  cardImg.src = item.link;
  cardImg.alt = item.name;
  newCard.querySelector('.element__name').textContent = item.name;

  cardImg.addEventListener('click', function (evt) {
    const picture = evt.target;
    popupPicImg.src = picture.src;
    popupPicDescription.textContent = picture.alt;
    popupPicImg.alt = picture.alt;
    openPopup(popupPic);
  });

  newCard.querySelector('.element__btn-like').addEventListener('click', function (evt) {
    const button = evt.target;
    button.classList.toggle('element__btn-like_active');
  });

  newCard.querySelector('.element__btn-remove').addEventListener('click', function (evt) {
    const button = evt.target;
    newCard.remove();
  });
  return newCard;
}

initialCards.forEach(item => {
  cardsList.prepend(createCard(item));
});

const buttonSubmit =  formElementPopupPlace.querySelector('.popup__btn-save');
function handlePopupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardsList.prepend(createCard(values));
  formElementPopupPlace.reset();
  buttonSubmit.classList.add('popup__btn-save_inactive');
  closePopup(popupPlace);
}
formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

