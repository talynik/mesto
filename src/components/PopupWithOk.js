import Popup from "./Popup.js";

export default class PopupWithOk extends Popup {
  constructor(popupSelector, {handleDeleteCard}) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonOk = document.querySelector(".popup__button_ok");
   }

  open(idCard) {
    super.open();
    this._idCard = idCard;
  }

  setEventListeners(idCard) {
    super.setEventListeners();
    this._buttonOk.addEventListener('click', () => {
      console.log("klik");
    this._handleDeleteCard(this._idCard);
    this.close();
    });
  }
}