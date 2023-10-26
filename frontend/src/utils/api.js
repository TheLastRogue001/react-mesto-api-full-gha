class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  getUserProfile() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  updateUserProfile(name, about) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  updateAvatarProfile(avatar) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  createCard(name, link) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.setCardLike(id);
    } else {
      return this.removeCardLike(id);
    }
  }

  setCardLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  removeCardLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }
}

export const api = new Api({ baseUrl: "https://api.fox.nomoredomainsrocks.ru" });
