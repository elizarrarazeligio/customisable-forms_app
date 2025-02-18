class FormApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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
}

const formApi = new FormApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default formApi;
