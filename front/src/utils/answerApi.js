class AnswerApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //   async getTemplateQuestions(hash) {
  //     return await fetch(`${this._baseUrl}/questions/${hash}`, {
  //       headers: this._headers,
  //       credentials: "include",
  //     }).then((res) => {
  //       if (res.ok) return res.json();
  //       return Promise.reject(res.json());
  //     });
  //   }

  addAnswerInput(form_id, question_id) {
    return fetch(`${this._baseUrl}/answers/${form_id}/add`, {
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

  //   updateQuestion(question_id, data) {
  //     return fetch(`${this._baseUrl}/questions/${question_id}/update`, {
  //       method: "PATCH",
  //       headers: this._headers,
  //       credentials: "include",
  //       body: JSON.stringify({
  //         field: data.field,
  //         number: data.number,
  //         title: data.title,
  //         description: data.description,
  //         show: data.show,
  //       }),
  //     }).then((res) => {
  //       if (res.ok) return res.json();
  //       return Promise.reject(res.json());
  //     });
  //   }
}

const answerApi = new AnswerApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default answerApi;
