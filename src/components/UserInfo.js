import {
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput
} from "../utils/constants.js"

export default class UserInfo {
  constructor(data) {
    this._profileName = data.profileName,
    this._profileDescription = data.profileDescription
  }

  getUserInfo() {
    profileNameInput.value = this._profileName;
    profileDescriptionInput.value = this._profileDescription;
  }

  setUserInfo(formData) {
    profileName.textContent = formData.profileName;
    profileDescription.textContent = formData.profileDescription;
  }
}