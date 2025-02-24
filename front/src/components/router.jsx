import App from "./App.jsx";
import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Login/RegisterForm";
import Main from "./Main/Main.jsx";
import HomePage from "./Main/HomePage/HomePage.jsx";
import UsersManagement from "./Main/UsersManagement/UsersManagement.jsx";
import Profile from "./Main/Profile/Profile.jsx";
import TemplateDashboard from "./Main/HomePage/TemplateDashboard/TemplateDashboard.jsx";
import Template from "./Main/HomePage/TemplateDashboard/TemplateDashboardTabs/Template/Template.jsx";
import FormsResults from "./Main/HomePage/TemplateDashboard/TemplateDashboardTabs/FormsResults/FormsResults.jsx";
import Summary from "./Main/HomePage/TemplateDashboard/TemplateDashboardTabs/Summary/Summary.jsx";
import CreateForm from "./Main/HomePage/Form/CreateForm.jsx";
import Form from "./Main/HomePage/Form/Form.jsx";
import PrivateAdmin from "./PrivateRoutes/PrivateAdmin.jsx";
import PrivateTemplates from "./PrivateRoutes/PrivateTemplates.jsx";
import PrivateForm from "./PrivateRoutes/PrivateForm.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  getUserData,
  getTemplates,
  getTemplateData,
  getQuestions,
  getFormData,
  getTemplateAnsweredForms,
  getTemplateResults,
} from "./loaders.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Login />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
      <Route path="/" element={<Main />} loader={getUserData}>
        <Route path="/home" element={<HomePage />} loader={getTemplates} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<PrivateAdmin />}>
          <Route path="/management" element={<UsersManagement />} />
        </Route>

        <Route element={<PrivateTemplates />} loader={getTemplateData}>
          <Route path="/:templateHash" element={<TemplateDashboard />}>
            <Route
              path="/:templateHash"
              element={<Template />}
              loader={getQuestions}
            />
            <Route
              path="/:templateHash/results"
              element={<FormsResults />}
              loader={getTemplateAnsweredForms}
            />
            <Route
              path="/:templateHash/summary"
              element={<Summary />}
              loader={getTemplateResults}
            />
          </Route>
        </Route>

        <Route
          path="/:templateHash/form"
          element={<CreateForm />}
          loader={getTemplateData}
        />

        <Route element={<PrivateForm />}>
          <Route
            path="/form/:formHash"
            element={<Form />}
            loader={getFormData}
          />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
