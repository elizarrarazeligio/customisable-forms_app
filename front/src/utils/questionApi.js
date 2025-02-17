class QuestionApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getTemplateQuestions(hash) {
    return await fetch(`${this._baseUrl}/questions/${hash}`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  addQuestion(template_id, number) {
    return fetch(`${this._baseUrl}/questions/${template_id}/add`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        number,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteQuestion(question_id) {
    return fetch(`${this._baseUrl}/questions/${question_id}/delete`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  updateQuestion(question_id, data) {
    return fetch(`${this._baseUrl}/questions/${question_id}/update`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        field: data.field,
        number: data.number,
        title: data.title,
        description: data.description,
        show: data.show,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const questionApi = new QuestionApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default questionApi;
