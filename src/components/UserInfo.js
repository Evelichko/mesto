export default class UserInfo {
  constructor(profileSelectors) {

    this._selectorInfo = profileSelectors.selectorInfo;
    this._selectorName = profileSelectors.selectorName;
    this._profileName = document.querySelector(this._selectorName);
    this._profileInfo = document.querySelector(this._selectorInfo);
  }

  getUserInfo() {
    const formValues = {
      name: this._profileName.textContent,
      job: this._profileInfo.textContent
    };
    return formValues;
  }

  setUserInfo(values) {
    this._profileName.textContent = values.name;
    this._profileInfo.textContent = values.job;
  }
}
