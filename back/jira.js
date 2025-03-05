import { Version3Client } from "jira.js";
import "dotenv/config";

const client = new Version3Client({
  host: process.env.JIRA_URL,
  authentication: {
    basic: {
      email: process.env.JIRA_USER,
      apiToken: process.env.JIRA_TOKEN,
    },
  },
});

const body = (title, summary, severity) => {
  return {
    fields: {
      description: {
        content: [
          {
            content: [
              {
                text: summary,
                type: "text",
              },
            ],
            type: "paragraph",
          },
        ],
        type: "doc",
        version: 1,
      },
      issuetype: {
        id: "10004",
      },
      labels: ["bugfix"],
      priority: {
        id: `${severity}`,
      },
      project: {
        id: "10000",
      },
      summary: title,
    },
    update: {},
  };
};

const postNewIssue = async (title, summary, severity) => {
  // const bodyInfo = bodyData(title, summary, severity);
  const bodyInfo = body(title, summary, severity);
  return await client.issues.createIssue(bodyInfo);
};

export { postNewIssue };
