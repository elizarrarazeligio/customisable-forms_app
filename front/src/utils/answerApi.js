class AnswerApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getFormQuestionAnswer(form_id, question_id) {
    return fetch(
      `${this._baseUrl}/answers/form/${form_id}/question/${question_id}`
    ).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  addAnswerInput(form_id, question_id) {
    return fetch(`${this._baseUrl}/answers/form/${form_id}/add`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        question_id,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  updateAnswer(form_id, question_id, answer) {
    return fetch(
      `${this._baseUrl}/answers/form/${form_id}/question/${question_id}/answer/update`,
      {
        method: "PATCH",
        headers: this._headers,
        credentials: "include",
        body: JSON.stringify({
          answer,
        }),
      }
    ).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const answerApi = new AnswerApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default answerApi;
