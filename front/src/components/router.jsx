import { App, getUserData } from "./App.jsx";
import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Login/RegisterForm";
import Main from "./Main/Main.jsx";
import HomePage from "./Main/HomePage/HomePage.jsx";
import UsersManagement from "./Main/UsersManagement/UsersManagement.jsx";
import Profile from "./Main/Profile/Profile.jsx";
import Template from "./Main/HomePage/Template/Template.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Login />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
      <Route path="/" element={<Main />} loader={getUserData}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/management" element={<UsersManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:templateHash" element={<Template />} />
      </Route>
    </Route>
  )
);

export default router;
