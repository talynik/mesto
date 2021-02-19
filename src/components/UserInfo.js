export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name),
    this._profileDescription = document.querySelector(data.about)
  }

  getUserInfo() {
    const profile = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent
    }
    return profile;
  }

  setUserInfo(formData) {
    this._profileName.textContent = formData.name;
    this._profileDescription.textContent = formData.about;
  }

  setUserId(id) {
    this._idUser = id;
  }

  returnUserId() {
    return this._idUser;
  }
}