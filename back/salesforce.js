import jsforce from "jsforce";
import "dotenv/config";

const conn = new jsforce.Connection({
  loginUrl: "https://login.salesforce.com",
});

// ============ LOGIN to Salesforce =============
const salesforceLogin = async () => {
  await conn
    .login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN
    )
    .then(() => {
      console.log("Successfully logged in!");
    })
    .catch((err) => console.error("Failed to log in to Salesforce: ", err));
};

// ============ LOGOUT to Salesforce ============
const salesforceLogout = async () => {
  await conn
    .logout()
    .then(() => {
      console.log("Successfully logged out!");
    })
    .catch((err) => console.error("Failed to log out: ", err));
};

// ============== GET Account Info ==============
const getAccountInfo = async (email) => {
  await salesforceLogin();
  return await conn
    .sobject("Account")
    .find({ Name: email }, [
      "Id",
      "Type",
      "Name",
      "BillingCountry",
      "BillingState",
      "BillingCity",
      "BillingPostalCode",
      "Phone",
    ])
    .then((res) => {
      if (res.length == 0) throw "No user found at salesforce.";
      return { status: "success", response: res };
    })
    .catch((err) => {
      salesforceLogout();
      return { status: "error", message: err };
    });
};

// =============== GET Account Id ===============
const getUserId = async (email) => {
  return await conn.sobject("Account").find({ Name: email }, ["Id", "Name"]);
};

// ============== POST New Account ==============
const createNewAccount = async (email) => {
  await salesforceLogin();
  await conn
    .sobject("Account")
    .create({ Name: email, Type: "User" })
    .then((res) => console.log({ status: "success", response: res }))
    .catch((err) => {
      return { status: "error", message: err };
    })
    .finally(async () => await salesforceLogout());
};

// =============== DELETE Account ===============
const deleteAccount = async (email) => {
  const userId = await getUserId(email);
  await conn
    .sobject("Account")
    .destroy(userId[0].Id)
    .then((res) => console.log({ status: "success", response: res }));
};

export { getAccountInfo, createNewAccount, deleteAccount, salesforceLogout };
