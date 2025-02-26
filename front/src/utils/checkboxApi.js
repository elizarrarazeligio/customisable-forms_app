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

  addFormCheckboxes(form_id, checkboxes) {
    return fetch(`${this._baseUrl}/checkboxes/form/${form_id}/create`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        checkboxes,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  addCheckedAnswer(checkbox_id, form_id, checked) {
    return fetch(
      `${this._baseUrl}/checkboxes/form/${form_id}/checkbox/${checkbox_id}`,
      {
        method: "POST",
        headers: this._headers,
        credentials: "include",
        body: JSON.stringify({
          checked,
        }),
      }
    ).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  updateCheckboxOption(checkbox_id, option) {
    return fetch(`${this._baseUrl}/checkboxes/${checkbox_id}/update`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        option,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  updateCheckboxStatus(checkbox_id, checked) {
    return fetch(`${this._baseUrl}/checkboxes/${checkbox_id}/checked`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        checked,
      }),
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
