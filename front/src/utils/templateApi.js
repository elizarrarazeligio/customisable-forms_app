class TemplateApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getAllTemplates() {
    return await fetch(`${this._baseUrl}/templates`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  getPopularTemplates() {
    return fetch(`${this._baseUrl}/templates/popular`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  getUserTemplates(user_id) {
    return fetch(`${this._baseUrl}/templates/user/${user_id}`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  async getTemplateInfo(hash) {
    return await fetch(`${this._baseUrl}/templates/${hash}`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  async getTemplateAnswers(hash) {
    return await fetch(`${this._baseUrl}/templates/${hash}/answers`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  async getTemplateForms(hash) {
    return await fetch(`${this._baseUrl}/templates/${hash}/forms`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
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

  updateTemplateInfo(hash, data) {
    return fetch(`${this._baseUrl}/templates/${hash}/update`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        image: data.image,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteTemplate(template_id) {
    return fetch(`${this._baseUrl}/templates/${template_id}/delete`, {
      method: "DELETE",
      headers: this._headers,
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
