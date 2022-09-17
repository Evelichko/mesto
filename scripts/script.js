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
const popupPic = document.querySelector('.popupPic');

function popupOpened(item) {
  item.classList.add('popup_opened');
}

function popupClosed(item) {
  item.classList.remove('popup_opened');
}

function openPopupProfile() {
  popupOpened(element);
}
function closePopupProfile() {
  popupClosed(element);
}
function openPopupPlace() {
  popupOpened(popupPlace);
}
function closePopupPlace() {
  popupClosed(popupPlace);
}

buttonEdit.addEventListener('click', openPopupProfile);
buttonClose.addEventListener('click', closePopupProfile);
buttonAddPic.addEventListener('click', openPopupPlace);
buttonClosePopupPlace.addEventListener('click', closePopupPlace);

function formSubmitHandler(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  namer.textContent = nameValue;
  job.textContent = jobValue;
  popupClosed(element);
}
formElement.addEventListener('submit', formSubmitHandler);

const cardsList = document.createElement('ul');
cardsList.classList.add('elements__list');
cards.append(cardsList);

function createCard(item) {
  const card = document.createElement('li');
  card.classList.add('element');
  cardsList.prepend(card);
  const pic = document.createElement('img');
  pic.classList.add('element__image');
  card.append(pic);

  pic.addEventListener('click', function (evt) {
    const picture = evt.target;
    const popupPicBox = document.createElement('div');
    popupPicBox.classList.add('popupPic__container');
    popupPic.append(popupPicBox);
    const popupPicImg = document.createElement('img');
    popupPicImg.classList.add('popupPic__image');
    popupPicBox.append(popupPicImg);
    popupPicImg.src = picture.src;
    popupPic.classList.add('popupPic_active');

    const buttonClose = document.createElement('button');
    buttonClose.classList.add('popupPic__btn-close');
    popupPicBox.append(buttonClose);

    buttonClose.addEventListener('click', function (evt) {
      const button = evt.target;
      button.parentElement.parentElement.classList.remove('popupPic_active');
      button.parentElement.remove();
    });
  });

  const nameOfPic = document.createElement('h2');
  nameOfPic.classList.add('element__name');
  card.append(nameOfPic);
  const buttonLike = document.createElement('button');
  buttonLike.classList.add('element__btn-like');
  card.append(buttonLike);

  buttonLike.addEventListener('click', function (evt) {
    const button = evt.target;
    button.classList.toggle('element__btn-like_active');
  });

  const buttonRemove = document.createElement('button');
  buttonRemove.classList.add('element__btn-remove');
  card.append(buttonRemove);

  buttonRemove.addEventListener('click', function (evt) {
    const button = evt.target;
    button.parentElement.remove();
  });

  nameOfPic.textContent = item.name;
  pic.src = item.link;
  pic.alt = item.alt;
}

initialCards.forEach(item => {
  createCard(item);
});


function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  createCard(values);
  closePopupPlace();
}
formElementPopupPlace.addEventListener('submit', formSubmitHandlerPlace);

function likePic() {
  buttonLike.classList.toggle('element__btn-like_active');
}
