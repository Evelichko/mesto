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

const element = document.querySelector('.popup_profile');
const buttonClose = element.querySelector('.popup__btn-close');
const buttonEdit = document.querySelector('.profile__btn-edit');
const formElement = element.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-input_value_name');
const jobInput = formElement.querySelector('.popup__form-input_value_job');
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
}
function closePopup(item) {
  item.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__btn-close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

  buttonEdit.addEventListener('click', () => openPopup(element));
  buttonAddPic.addEventListener('click', () => openPopup(popupPlace));


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  namer.textContent = nameValue;
  job.textContent = jobValue;
  closePopup(element);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

function createCard(item) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.element__image').src = item.link;
  newCard.querySelector('.element__image').alt = item.name;
  newCard.querySelector('.element__name').textContent = item.name;

  newCard.querySelector('.element__image').addEventListener('click', function (evt) {
    const picture = evt.target;
    popupPicImg.src = picture.src;
    popupPicDescription.textContent = picture.alt;
    popupPicImg.alt = picture.alt;
    popupPic.classList.add('popup_opened');
  });

  newCard.querySelector('.element__btn-like').addEventListener('click', function (evt) {
    const button = evt.target;
    button.classList.toggle('element__btn-like_active');
  });

  newCard.querySelector('.element__btn-remove').addEventListener('click', function (evt) {
    const button = evt.target;
    button.parentElement.remove();
  });
return newCard;
}

initialCards.forEach(item => {
  cardsList.prepend(createCard(item));
});


function handlePopupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardsList.prepend(createCard(values));
  closePopup(popupPlace);
}
formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);

function likePic() {
  buttonLike.classList.toggle('element__btn-like_active');
}
