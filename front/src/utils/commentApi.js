class CommentApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getTemplateComments(template_id) {
    return fetch(`${this._baseUrl}/comments/template/${template_id}`).then(
      (res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      }
    );
  }

  addComment(template_id, user_id, description) {
    return fetch(`${this._baseUrl}/comments/template/${template_id}/add`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        user_id,
        description,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteComment(comment_id) {
    return fetch(`${this._baseUrl}/comments/${comment_id}/delete`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const commentApi = new CommentApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default commentApi;
