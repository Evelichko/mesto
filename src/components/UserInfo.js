export default class UserInfo {
  constructor(profileSelectors) {

    this._selectorInfo = profileSelectors.selectorInfo;
    this._selectorName = profileSelectors.selectorName;
    this._selectorAvatar = profileSelectors.selectorAvatar;
    this._profileName = document.querySelector(this._selectorName);
    this._profileInfo = document.querySelector(this._selectorInfo);
    this._profileAvatar = document.querySelector(this._selectorAvatar);
  }

  getUserInfo() {
    const formValues = {
      name: this._profileName.textContent,
      about: this._profileInfo.textContent
    };
    return formValues;
  }

  setUserInfo( { name, about, avatar} ) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
    this._profileAvatar.src = avatar;  
  }
}
