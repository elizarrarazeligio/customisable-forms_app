class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAllUsers() {
    return fetch(`${this._baseUrl}/users`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  loginUser({ email, password }) {
    return fetch(`${this._baseUrl}/users/login`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  getToken() {
    return fetch(`${this._baseUrl}/users/token`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  // registerUser(data) {
  //   return fetch(`${this._baseUrl}/register`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       email: data.email,
  //       password: data.password,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) return res.json();
  //     return Promise.reject(res.json());
  //   });
  // }

  // checkUser(id) {
  //   return fetch(`${this._baseUrl}/users/check`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       id,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) return res.json();
  //     return Promise.reject(`Error: ${res.status}`);
  //   });
  // }

  // checkAllUsers(status) {
  //   return fetch(`${this._baseUrl}/users/check/all`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       status,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) return res.json();
  //     return Promise.reject(`Error: ${res.status}`);
  //   });
  // }

  // setUserStatus(status) {
  //   return fetch(`${this._baseUrl}/users`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       status,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) return res.json();
  //     return Promise.reject(res.json());
  //   });
  // }

  // deleteUser() {
  //   return fetch(`${this._baseUrl}/users`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((res) => {
  //     if (res.ok) return res.json();
  //     return Promise.reject(res.json());
  //   });
  // }
}

const api = new Api({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
