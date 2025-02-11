import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Login/RegisterForm";
import Main from "./Main/Main.jsx";
import HomePage from "./Main/HomePage/HomePage.jsx";
import UsersManagement from "./Main/UsersManagement/UsersManagement.jsx";
import { toast, ToastContainer } from "react-toastify";
import { UsersContext } from "../contexts/UsersContext.js";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/Api.js";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation;

  const onLoginSubmit = (userData) => {
    api
      .loginUser(userData)
      .then((res) => toast.success(res.message))
      .then(() => getUserToken())
      .then(() => navigate("/home"))
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const getUserToken = () => {
    api
      .getToken()
      .then((res) => setUser(res.response))
      .catch((err) => {
        setUser(null);
        err.then((res) => {
          toast.error(res.message);
          navigate("/");
        });
      });
  };

  useEffect(() => {
    getUserToken();
  }, [location]);

  return (
    <>
      <UsersContext.Provider value={{ onLoginSubmit }}>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          <Route path="/" element={<Main />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/management" element={<UsersManagement />}></Route>
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
          theme="colored"
        />
      </UsersContext.Provider>
    </>
  );
}

export default App;
