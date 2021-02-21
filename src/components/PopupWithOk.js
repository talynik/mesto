import Popup from "./Popup.js";

export default class PopupWithOk extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonOk = document.querySelector(".popup__button_ok");
   }

  open(idCard, {handleDeleteCard}) {
    super.open();
    this._handleDeleteCard = handleDeleteCard;
    this._idCard = idCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonOk.addEventListener('click', () => {
    this._handleDeleteCard(this._idCard);
    this.close();
    });
  }
}