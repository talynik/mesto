import Popup from "./Popup.js";

export default class PopupWithOk extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
  }
}