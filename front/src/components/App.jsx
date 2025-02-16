import { ToastContainer } from "react-toastify";
import { UsersContext } from "../contexts/UsersContext.js";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UsersContext.Provider value={{ user, setUser }}>
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
