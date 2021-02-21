import Popup from "./Popup.js";

export default class PopupWithOk extends Popup {
  constructor(popupSelector, {handleDeleteCard}) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonOk = document.querySelector(".popup__button_ok");
   }

  open(idCard, element) {
    super.open();
    this._idCard = idCard;
    this._element = element;
  }

  setEventListeners(idCard) {
    super.setEventListeners();
    this._buttonOk.addEventListener('click', () => {
    this._handleDeleteCard(this._idCard, this._element);
    this.close();
    });
  }
}