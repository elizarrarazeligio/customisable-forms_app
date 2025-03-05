class ErrorApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  postIssueTicket(data) {
    return fetch(`${this._baseUrl}/errors`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        user: data.user,
        path: data.path,
        summary: data.summary,
        severity: data.severity,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const errorApi = new ErrorApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default errorApi;
