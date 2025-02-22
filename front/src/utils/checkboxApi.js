class CheckboxApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getQuestionCheckboxes(question_id) {
    return fetch(`${this._baseUrl}/checkboxes/question/${question_id}`).then(
      (res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      }
    );
  }

  addCheckbox(question_id) {
    return fetch(`${this._baseUrl}/checkboxes/question/${question_id}/new`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteCheckbox(checkbox_id) {
    return fetch(`${this._baseUrl}/checkboxes/${checkbox_id}/delete`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const checkboxApi = new CheckboxApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default checkboxApi;
