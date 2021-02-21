export default class Card {
  constructor(data, templateCard, {idUser}, {handleCardClick}, {handleClikDelete}, {handleClickLike}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._fanat = data.likes.length;
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

  //функция установки лайка
  getLike(item) {
    this._like.classList.add('element__like_active');
    this._numberLike.textContent = item.likes.length;
    this._likeActiv = !this._likeActiv;
  }

  //функция удаления лайка
  delLike(item) {
    this._like.classList.remove('element__like_active');
    this._numberLike.textContent = item.likes.length;
    this._likeActiv = !this._likeActiv;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._deleteButton = this._card.querySelector('.element__button-delete');
    this._like = this._card.querySelector('.element__like');
    this._numberLike = this._card.querySelector(".element__number-fanat");
      
      //удаление корзинок с чужих карточек
    if (this._owner != this._idUser) {
      this._deleteButton.remove();
    }

      //проверка моих лайков на сервере и их установка
    this._likes.forEach((item) => {
      if(item._id === this._idUser) {
        this._like.classList.add('element__like_active');
        this._likeActiv = 'true';
      }
    })

      //установка количества лайков
    this._numberLike.textContent = this._fanat;
    
    this._picture = this._card.querySelector('.element__image');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._card.querySelector('.element__name').textContent = this._name;

    this._likeEventListener();
    this._deleteEventListener();
    this._generatePopapImage();
  
    return this._card;
  }
 
_likeEventListener() {
  this._like.addEventListener('click', () => {
    this._handleClickLike((this._likeActiv), this._id);
  });
}

_deleteEventListener() {
  this._deleteButton.addEventListener('click', () => {
    this._handleClikDelete(this._id, this._card);
  });
}

_generatePopapImage() {
  this._card.querySelector(".element__image").addEventListener("click", () => {
    this._handleCardClick(this._name, this._link);
  });
}

}