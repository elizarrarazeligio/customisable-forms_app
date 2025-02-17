import questionApi from "../utils/questionApi";
import templateApi from "../utils/templateApi";
import userApi from "../utils/userApi";

const getUserData = async () => {
  return await userApi.getToken().catch((err) => err);
};

const getTemplates = async () => {
  return await templateApi.getAllTemplates().catch((err) => err);
};

const getTemplateData = async ({ req, params }) => {
  return await templateApi
    .getTemplateInfo(params.templateHash)
    .catch((err) => err);
};

const getQuestions = async ({ req, params }) => {
  return await questionApi
    .getTemplateQuestions(params.templateHash)
    .catch((err) => err);
};

export { getUserData, getTemplates, getTemplateData, getQuestions };
