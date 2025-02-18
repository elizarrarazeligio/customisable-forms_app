class FormApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserForms(user_id) {
    return fetch(`${this._baseUrl}/forms/user/${user_id}`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  async getFormInfo(hash) {
    return await fetch(`${this._baseUrl}/forms/${hash}`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  newForm(template_id, user_id) {
    return fetch(`${this._baseUrl}/forms/new`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        template_id,
        user_id,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteForm(form_id) {
    return fetch(`${this._baseUrl}/forms/${form_id}/delete`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const formApi = new FormApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default formApi;
