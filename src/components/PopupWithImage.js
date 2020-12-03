import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    const popupImagePicture = document.querySelector(".popup__image_picture");
    const popupNamePicture = document.querySelector(".popup__name_picture");
    popupImagePicture.src = this._link;
    popupImagePicture.alt = `Изображение ${this._name}`;
    popupNamePicture.textContent = this._name;
    super.open();
    this.setEventListeners();
  }
}