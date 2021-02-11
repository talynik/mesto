import {
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput
} from "../utils/constants.js"

export default class UserInfo {
  constructor(data) {
    this._profileName = data.name,
    this._profileDescription = data.description
  }

  getUserInfo(formData) {
    profileName.textContent = formData.profileName;
    profileDescription.textContent = formData.profileDescription;
  }

  setUserInfo() {
    profileNameInput.value = this._profileName.textContent;
    profileDescriptionInput.value = this._profileDescription.textContent;
  }
}