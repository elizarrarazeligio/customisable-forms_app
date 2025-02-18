import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { toast } from "react-toastify";

function Main() {
  const userData = useLoaderData();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData.response);

  useEffect(() => {
    if (userData.status == "success") {
      setUser(userData.response);
    } else if (userData.status == "error") {
      setUser(null);
      toast.error(userData.message);
      navigate("/");
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
