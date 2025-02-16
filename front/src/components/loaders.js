import templateApi from "../utils/templateApi";
import userApi from "../utils/userApi";

const getUserData = async () => {
  return await userApi.getToken().catch((err) => err);
};

const getTemplateData = async ({ req, params }) => {
  return await templateApi
    .getTemplateInfo(params.templateHash)
    .catch((err) => err);
};

export { getUserData, getTemplateData };
