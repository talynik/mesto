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

  getAllTasks(){
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

  editTask(data){
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }

  editAvatar(data){
    return fetch(`${this._url}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: data.avatar})
    })
    .then(onError)
  }
  
  addTask(data){
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }

  removeTask(id){
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }

    //запрос информации о карте
  getLike(id){
    return fetch(`${this._url}/${id}`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

  editLike(id, editLike){
    return fetch(`${this._url}${id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(editLike)
    })
    .then(onError)
  }
}