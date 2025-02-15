class TemplateApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserTemplates(user_id) {
    return fetch(`${this._baseUrl}/templates/user/${user_id}`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  getTemplateInfo(hash) {
    return fetch(`${this._baseUrl}/templates/${hash}`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  newTemplate(user_id) {
    return fetch(`${this._baseUrl}/templates/new`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        user_id: user_id,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const templateApi = new TemplateApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default templateApi;
