const onError = (res)=>{
  if(res.ok){
    return res.json();
  }
  return Promise.reject('Сервер не доступен')
}

export default class Api{
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

    //загрузка информации о пользователе
  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

    //изменение данных пользователя
  editUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }

    //изменение аватарки
  editAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: data.avatar})
    })
    .then(onError)
  }

    //удаление карточки
  removeCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }

    //добавить лайк
  addLike(id){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(onError)
  }

    //удалить лайк
  removeLike(id){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }

    //загрузка карточек с сервера
  getCard(){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

    //добавление новой карточки
  addCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }
}