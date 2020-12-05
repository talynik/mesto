export default class Card {
  constructor(data, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick  = handleCardClick;
  }

  _getTemplate() {
    const elementMesto = document.querySelector('#element-template').cloneNode(true).content;
    return elementMesto;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeEventListener();
    this._deleteEventListener();
    this._generatePopapImage();

    this._picture = this._element.querySelector('.element__image');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
  
    return this._element;
  }

  _likeEventListener() {
    this._element.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });
  }

  _deleteEventListener() {
    const deleteButton = this._element.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', function () {
      const listElement = deleteButton.closest('.element');
      listElement.remove();
    });
  }

  _generatePopapImage() {
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}