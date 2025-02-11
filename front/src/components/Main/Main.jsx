import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UsersContext";

function Main() {
  const { getUserToken } = useContext(UsersContext);
  const location = useLocation();

  useEffect(() => {
    getUserToken();
  }, [location]);

  return (
    <div style={{ minWidth: 375, maxWidth: 1500 }} className="mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
