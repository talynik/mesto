import Popup from "./Popup.js";

export default class PopupWithOk extends Popup {
  constructor(popupSelector, {handleDeleteCard}) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonOk = document.querySelector(".popup__button_ok");
   }

  setEventListeners(idCard) {
    super.setEventListeners();
    this.handleClikOk = idCard;
    this._buttonOk.addEventListener('click', () => {
    this._handleDeleteCard(this.handleClikOk);
    this.close();
    });      
  }
}