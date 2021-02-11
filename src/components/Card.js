export default class Card {
  constructor(data, templateCard, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const elementMesto = document.querySelector(this._templateCard).cloneNode(true).content;
    return elementMesto;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._likeEventListener();
    this._deleteEventListener();
    this._generatePopapImage();

    this._picture = this._card.querySelector('.element__image');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._card.querySelector('.element__name').textContent = this._name;
  
    return this._card;
  }

  _likeEventListener() {
    const like = this._card.querySelector('.element__like');
    like.addEventListener('click', function () {
      like.classList.toggle('element__like_active');
    });
  }

  _deleteEventListener() {
    const deleteButton = this._card.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', function () {
      deleteButton.closest('.element').remove();
    });
  }

  _generatePopapImage() {
    this._card.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}