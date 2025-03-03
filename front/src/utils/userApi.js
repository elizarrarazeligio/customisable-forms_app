class UserApi {
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

  logoutUser() {
    return fetch(`${this._baseUrl}/users/logout`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  async getToken() {
    return await fetch(`${this._baseUrl}/users/token`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  registerUser(data) {
    return fetch(`${this._baseUrl}/users/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  updateAccountInfo(id, data) {
    return fetch(`${this._baseUrl}/users/${id}/account`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        state: data.state,
        city: data.city,
        postal: data.postal,
        phone: data.phone,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  checkUser(id) {
    return fetch(`${this._baseUrl}/users/${id}/check`, {
      method: "PATCH",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  checkAllUsers(status) {
    return fetch(`${this._baseUrl}/users/check-all`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        status,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserStatus(status) {
    return fetch(`${this._baseUrl}/users/status`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        status,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  setAdminStatus(status) {
    return fetch(`${this._baseUrl}/users/admin`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        status,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteUser() {
    return fetch(`${this._baseUrl}/users`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const userApi = new UserApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default userApi;
