import PopupWithForm from "./PopupWithForm.js";
export default class PopupForAvatar extends PopupWithForm {
    constructor({ selector, handelFormSubmit }) {
        super(selector);
        this._handelFormSubmit = handelFormSubmit;
    }
    // setEventListeners() {
    //     super.setEventListeners();
    //     // this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
    //     //     evt.preventDefault();
    //     // this._changeAvatar(this._getAvatarLink());
    
    // }
    // _getAvatarLink() {
    //     this._inputLink = this._popup.querySelector('.popup__form-input');
    //     console.log("getinputLink" + this._inputLink.value);
    //     return this._inputLink.value;
    // }
}
