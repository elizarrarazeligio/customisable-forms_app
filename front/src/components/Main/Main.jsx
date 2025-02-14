import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { toast } from "react-toastify";

function Main() {
  const { setUser } = useContext(UsersContext);
  const userData = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.status === "success") {
      setUser(userData.response);
    } else if (userData.status === "error") {
      toast.error(userData.message);
      navigate("/");
    }
  }, [userData]);

  return (
    <div style={{ minWidth: 375, maxWidth: 1500 }} className="mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
