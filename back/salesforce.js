import jsforce from "jsforce";
import "dotenv/config";

const conn = new jsforce.Connection({
  loginUrl: "https://login.salesforce.com",
});

conn
  .login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN
  )
  .then((res) => {
    console.log("Successfully logged in!");

    conn
      .query("SELECT Id, Name FROM Account LIMIT 20")
      .then((res) => {
        const { records } = res;
        console.log(`Fetched ${records.length} records:`);
        records.forEach((record) =>
          console.log(`- ${record.Name} (${record.Id})`)
        );
      })
      .catch((err) => console.error("Failed to run SOQL query: ", err));
  })
  .catch((err) => console.error("Failed to log in to Salesforce: ", err));
