import fetch from "node-fetch";
import "dotenv/config";

const bodyData = (title, summary, severity) => `{
  "fields": {
    "description": {
      "content": [
        {
          "content": [
            {
              "text": "${summary}",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "issuetype": {
      "id": "10004"
    },
    "labels": [
      "bugfix"
    ],
    "priority": {
      "id": "${severity}"
    },
    "project": {
      "id": "10000"
    },
    "summary": "${title}"
  },
  "update": {}
}`;

const postNewIssue = (title, summary, severity) => {
  const bodyInfo = bodyData(title, summary, severity);

  return fetch(`${process.env.JIRA_URL}/rest/api/3/issue`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.JIRA_USER}:${process.env.JIRA_TOKEN}`
      ).toString("base64")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyInfo,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.json());
  });
};

export { postNewIssue };
