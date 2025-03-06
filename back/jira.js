import { Version3Client } from "jira.js";
import fetch from "node-fetch";
import "dotenv/config";

const body = (title, summary, severity) => `{
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

// ================= Basic Auth =================
const client = new Version3Client({
  host: "https://customisable-app.atlassian.net",
  authentication: {
    basic: {
      email: process.env.JIRA_USER,
      apiToken: process.env.JIRA_TOKEN,
    },
  },
});

const postNewIssue = async (title, summary, severity) => {
  const bodyInfo = body(title, summary, severity);
  return await client.issues.createIssue(bodyInfo);
};

// =============== Jira OAuth 2.0 ===============
const getToken = async (code) => {
  return await fetch("https://auth.atlassian.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
      "grant_type": "authorization_code",
      "client_id": "${process.env.OATH_CLIENT}",
      "client_secret": "${process.env.OATH_SECRET}",
      "code": "${code}",
      "redirect_uri": "http://localhost:3000/home"
    }`,
  }).then((res) => {
    return res.json();
  });
};

const getCloudId = async (tokenAccess) => {
  return await fetch(
    "https://api.atlassian.com/oauth/token/accessible-resources",
    {
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
        Accept: "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });
};

const getPermissions = async (code) => {
  const token = await getToken(code);
  const cloudId = await getCloudId(token.access_token);

  if (cloudId.code == 401)
    throw { status: "disconnected", message: "Not yet connected to Jira." };

  return { token, cloudId };
};

const postNewIssueOAuth = async (title, summary, severity, permissions) => {
  const bodyInfo = body(title, summary, severity);

  return await fetch(
    `https://api.atlassian.com/ex/jira/${permissions.cloudId[0].id}/rest/api/3/issue`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${permissions.token.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyInfo,
    }
  ).then((res) => res.json());
};

export { getPermissions, postNewIssueOAuth };
