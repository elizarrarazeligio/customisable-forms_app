class QuestionApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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
}

const questionApi = new QuestionApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default questionApi;
