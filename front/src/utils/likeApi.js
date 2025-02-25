class LikeApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getTemplateLikes(template_id) {
    return fetch(`${this._baseUrl}/likes/template/${template_id}`).then(
      (res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      }
    );
  }

  likeTemplate(template_id, user_id) {
    return fetch(`${this._baseUrl}/likes/template/${template_id}/like`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        user_id,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }

  deleteLike(like_id) {
    return fetch(`${this._baseUrl}/likes/${like_id}/remove`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const likeApi = new LikeApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default likeApi;
