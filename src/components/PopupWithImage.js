import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupName) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupName = popupName;
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = `Изображение ${name}`;
    this._popupName.textContent = name;
    super.open();
  }
}