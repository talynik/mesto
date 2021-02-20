export default class Card {
  constructor(data, templateCard, {idUser}, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._owner = data.owner._id;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._idUser = idUser
   }

  _getTemplate() {
    const elementMesto = document.querySelector(this._templateCard).cloneNode(true).content;
    elementMesto.querySelector(".element__number-fanat").textContent = this._likes;

    return elementMesto;
  }

  _deleteTrash() {
    if (this._owner != this._idUser) {
      this._card.querySelector(".element__button-delete").remove();
    }
  }

  generateCard() {
    this._card = this._getTemplate();
    
    this._picture = this._card.querySelector('.element__image');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._card.querySelector('.element__name').textContent = this._name;

    this._setEventListener();
    this._deleteTrash();
  
    return this._card;
  }

  _setEventListener() {
    const like = this._card.querySelector('.element__like');
    like.addEventListener('click', () => {
      like.classList.toggle('element__like_active');
    });

    const deleteButton = this._card.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', () => {
      deleteButton.closest('.element').remove();
    });

    this._card.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}