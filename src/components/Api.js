import { Promise } from "core-js";

export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    getAllCards() {
        return fetch("https://nomoreparties.co/v1/cohort-55/cards", {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }
    getProfileInfo() {
        return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }
    addNewCard(values) {
        return fetch("https://nomoreparties.co/v1/cohort-55/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(values)
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
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
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })

    }

    removeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }
    getUserData() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me', {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }

    addLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }

    removeLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-55/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }
    editAvatar(link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-55/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(link)

        })
            .then((responce) => {
                if (responce.ok) {
                    return responce.json();
                } else {
                    Promise.reject(`Ошибка: ${responce.status} ${responce.statusText}`)
                }
            })
    }
}

