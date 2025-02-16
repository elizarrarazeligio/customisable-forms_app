import App from "./App.jsx";
import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Login/RegisterForm";
import Main from "./Main/Main.jsx";
import HomePage from "./Main/HomePage/HomePage.jsx";
import UsersManagement from "./Main/UsersManagement/UsersManagement.jsx";
import Profile from "./Main/Profile/Profile.jsx";
import TemplateDashboard from "./Main/HomePage/TemplateDashboard/TemplateDashboard.jsx";
import Template from "./Main/HomePage/TemplateDashboard/TemplateDashboardTabs/Template.jsx";
import FormsResults from "./Main/HomePage/TemplateDashboard/TemplateDashboardTabs/FormsResults.jsx";
import Summary from "./Main/HomePage/TemplateDashboard/TemplateDashboardTabs/Summary.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getUserData, getTemplates, getTemplateData } from "./loaders.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Login />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
      <Route path="/" element={<Main />} loader={getUserData}>
        <Route path="/home" element={<HomePage />} loader={getTemplates} />
        <Route path="/management" element={<UsersManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/:templateHash"
          element={<TemplateDashboard />}
          loader={getTemplateData}
        >
          <Route path="/:templateHash" element={<Template />} />
          <Route path="/:templateHash/forms" element={<FormsResults />} />
          <Route path="/:templateHash/summary" element={<Summary />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
