import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
    constructor({ selector, removeCardForSure }) {
        super(selector);
        this._removeCardForSure = removeCardForSure;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__confirmation').addEventListener('click', () =>
        this._removeCardForSure(this._id, this._card));

    }
    fixCardInfo(id, card) {
        this._id = id;
        this._card = card;
    }
}
