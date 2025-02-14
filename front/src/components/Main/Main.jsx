import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UsersContext";

function Main() {
  const { getUserToken, user } = useContext(UsersContext);
  // const userData = useLoaderData();
  const location = useLocation();

  useEffect(() => {
    // console.log(userData);
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
