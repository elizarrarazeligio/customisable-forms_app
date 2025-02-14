import { toast, ToastContainer } from "react-toastify";
import { UsersContext } from "../contexts/UsersContext.js";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/Api.js";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserToken = async () => {
    await api
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

  return (
    <>
      <UsersContext.Provider value={{ user, getUserToken }}>
        <Outlet />
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
