import Popup from "./Popup.js";
import {
  popupImagePicture,
  popupNamePicture
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._name = name;
    this._link = link;
    popupImagePicture.src = this._link;
    popupImagePicture.alt = `Изображение ${this._name}`;
    popupNamePicture.textContent = this._name;
    super.open();
  }
}