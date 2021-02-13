import { profileDescription } from "../utils/constants";

export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name),
    this._profileDescription = document.querySelector(data.info)
  }

  getUserInfo() {
    const profile = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
    return profile;
  }

  setUserInfo(formData) {
    this._profileName.textContent = formData.profileName;
    this._profileDescription.textContent = formData.profileDescription;
  }
}