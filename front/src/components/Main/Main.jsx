import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { toast } from "react-toastify";
import userApi from "../../utils/userApi";

function Main() {
  const userData = useLoaderData();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData.response);

  useEffect(() => {
    if (userData.status == "success") {
      setUser(userData.response);
    } else if (
      userData.status == "error" &&
      userData.message == "Invalid token."
    ) {
      userApi
        .logoutUser()
        .then(() => {
          toast.error(userData.message);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);

  return (
    <UsersContext.Provider value={{ user }}>
      <div style={{ minWidth: 375, maxWidth: 1500 }} className="mx-auto">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UsersContext.Provider>
  );
}

export default Main;
