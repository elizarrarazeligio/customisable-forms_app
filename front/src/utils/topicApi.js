class TopicApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAllTopics() {
    return fetch(`${this._baseUrl}/topics`).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
}

const topicApi = new TopicApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default topicApi;
