import { Promise } from "core-js";

export default class Api {
    constructor({ url, headers }) {
        this._url = url;
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
        return fetch("https://nomoreparties.co/v1/cohort-55/cards", {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
    getProfileInfo() {
        return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);

            })
    }
    addNewCard(values) {
        return fetch("https://nomoreparties.co/v1/cohort-55/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(values)
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
    editProfileInfo(values) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me', {
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

    removeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);

            })
    }
    getUserData() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me', {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }

    addLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }

    removeLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
    editAvatar(link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(link)

        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
}

