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

  setUserInfo(values) {
    this._profileName.textContent = values.name;
    this._profileInfo.textContent = values.about;
    this._profileAvatar.src = values.avatar;  
  }

  setNewAvatar(data){
   this._profileAvatar.src = data.avatar;   
  }

  setUserTextInfo(values) {
    this._profileName.textContent = values.name;
    this._profileInfo.textContent = values.about;
  }
}
