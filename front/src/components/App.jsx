import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Login/RegisterForm";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UsersContext } from "../contexts/UsersContext.js";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UsersContext.Provider value={{}}>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          {/* <Route path="/users" element={<UserManagement />} /> */}
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
