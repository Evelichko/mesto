export default class Card {
  constructor(item, templateSelector, handleCardClick, handelRemoveClick, currentId, handelRemoveLike, handelAddLike) { 
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._numberOfLikes = item.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handelRemoveClick = handelRemoveClick; 
    this._userId = item.owner._id;
    this._currentId = currentId;
    this._handelRemoveLike = handelRemoveLike;
    this._handelAddLike = handelAddLike;
  }

  getNewCard() {
    this._element = this._getTemplate();
    this._elImg = this._element.querySelector('.element__image');
    this._elImg.src = this._link;
    this._elImg.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__likes').textContent = Object.keys(this._numberOfLikes).length;
    this._isLiked();
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._clickButtonLikeHandler();
    this._openPopupHandler();
    this._isOwner();
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  _openPopupHandler() {
    this._elImg.addEventListener('click', (evt) => this._handleCardClick(this._name, this._link));
  }

  _clickButtonLikeHandler() {
    this._btnLike = this._element.querySelector('.element__btn-like');
    this._likeCounter = this._element.querySelector('.element__likes')
    this._btnLike.addEventListener('click', (evt) => {
      if (this._btnLike.classList.contains('element__btn-like_active')) {
        this._deleteLike()
        this._handelAddLike(this._id, this._likeCounter);
      }
      else {
        this._addLike();
        this._handelRemoveLike(this._id, this._likeCounter);
      }
    });
  }

  _isLiked() {
    const isLiked = this._numberOfLikes.some((item) =>
      item._id === this._currentId);
    if (isLiked === true) {
      this._addLike();
    }
    else {
      this._deleteLike();
    }
  }
  
  _isOwner() {
    if (this._currentId == this._userId) {
      this._removeCardHandler();
    }
    else {
      this._element.querySelector('.element__btn-remove').remove();
    }
  }

  removeCard(element) {
    element._element.remove();
    element = null;
  }

  _removeCardHandler() {
    this._element.querySelector('.element__btn-remove').addEventListener('click', () => this._handelRemoveClick(this._id, this._element));
  }

  _deleteLike() {
    this._element.querySelector('.element__btn-like').classList.remove('element__btn-like_active');
  }

  _addLike() {
    this._element.querySelector('.element__btn-like').classList.add('element__btn-like_active');
  }
}
