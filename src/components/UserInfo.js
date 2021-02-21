export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name),
    this._profileDescription = document.querySelector(data.about),
    this._profileAvatar = document.querySelector(data.avatar)
  }

  getUserInfo() {
    const profile = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src
    }
    return profile;
  }

  setUserInfo(formData) {
    this._profileName.textContent = formData.name;
    this._profileDescription.textContent = formData.about;
    this._profileAvatar.src = formData.avatar;
    this._formData = formData;
  }

  returnUserId() {
    return this._formData._id;
  }

  returnUser() {
    return this._formData;
  }
}