class ContextApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserContext(user_id) {
    return fetch(`${this._baseUrl}/contexts/user/${user_id}`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  addNewUserContext(user_id) {
    return fetch(`${this._baseUrl}/contexts/user/${user_id}/add`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  updateTheme(user_id, theme) {
    return fetch(`${this._baseUrl}/contexts/user/${user_id}/update`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        theme,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const contextApi = new ContextApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default contextApi;
