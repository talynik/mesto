export default class Card {
  constructor(data, templateCard, {idUser}, {handleCardClick}, {handleClikDelete}, {handleClickLike}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._idUser = idUser;
    this._handleClikDelete = handleClikDelete;
    this._handleClickLike = handleClickLike;
   }

  _getTemplate() {
    const elementMesto = document.querySelector(this._templateCard).cloneNode(true).content;
    return elementMesto;
  }

    //удаление корзинок с чужих картинок
  _deleteTrash() {
    if (this._owner != this._idUser) {
      this._deleteButton.remove();
    }
  }

  //функция установки количества лайков
  getLike() {
    this._card.querySelector(".element__number-fanat").textContent = this._likes.length;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._deleteButton = this._card.querySelector('.element__button-delete');
    this._like = this._card.querySelector('.element__like');
      //проверка моих лайков на сервере и их установка
    this._likes.forEach((item) => {
      if(item._id === this.idUser) {
        this._like.classList.add('element__like_active');
      }
    })
    
    this._picture = this._card.querySelector('.element__image');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._card.querySelector('.element__name').textContent = this._name;

    this._setEventListener();
    this._deleteTrash();
    this.getLike();
  
    return this._card;
  }
  
    //удаление карточки
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListener() {
    this._like.addEventListener('click', () => {
      this._like.classList.toggle('element__like_active');
      if(this._like.classList.length === 2) {
        this._editLike = 1;
      } else {
        this._editLike = -1;
      }
      this._handleClickLike(this._editLike, this._id);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleClikDelete(this._id);
    });

    this._card.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}