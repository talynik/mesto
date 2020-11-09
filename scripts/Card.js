export default class Card {
  constructor(data, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._openPopup = openPopup;
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
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
      const picturePopup = document.querySelector(".popup_picture");
      const popupImagePicture = picturePopup.querySelector(".popup__image_picture");
      const popupNamePicture = picturePopup.querySelector(".popup__name_picture");
      popupImagePicture.src = this._link;
      popupImagePicture.alt = `Изображение ${this._name}`;
      popupNamePicture.textContent = this._name;
      this._openPopup(picturePopup);
    });
  }
}