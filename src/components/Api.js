export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(resp) {
        if (resp.ok) {
            return resp.json();
        } else {
            Promise.reject(`Ошибка: ${resp.status} ${resp.statusText}`)
        }
    }

    getAllCards() {
        return fetch(this._baseUrl + "/cards", {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
  
    addNewCard(values) {
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(values)
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }


    removeCard(id) {
        return fetch(this._baseUrl + `/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);

            })
    }

    getUserData() {
        return fetch(this._baseUrl+'/users/me', {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }

    editProfileInfo(values) {
        return fetch(this._baseUrl+'/users/me', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: values.name,
                about: values.about,
            })
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })

    }

    addLike(id) {
        return fetch(this._baseUrl + `/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }

    removeLike(id) {
        return fetch(this._baseUrl+`/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
    editAvatar(link) {
        return fetch(this._baseUrl+'/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(link)

        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
}

