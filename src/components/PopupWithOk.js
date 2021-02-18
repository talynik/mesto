import Popup from "./Popup.js";

export default class PopupWithOk extends Popup {
  constructor(popupSelector, idCard, apiCards) {
    super(popupSelector);
    this._idCard = idCard;
    this._apiCards = apiCards;
  }

  deleteCard(id) {
    this._apiCards
      .removeTask(id)
      .then(()=> this._view.remove())
      .catch((err)=> console.log(err))
  }

  setEventListeners() {
    const buttonOk = this._popap.querySelector(".popup__button_ok");
    buttonOk.addEventListener('click', () => {
      deleteCard(this._idCard);
    });  
    super.setEventListeners();
  }
}