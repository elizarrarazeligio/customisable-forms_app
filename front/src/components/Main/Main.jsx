import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { toast } from "react-toastify";
import templateApi from "../../utils/templateApi";

function Main() {
  const { setUser } = useContext(UsersContext);
  const userData = useLoaderData();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);

  const getTemplates = (user_id) => {
    templateApi
      .getUserTemplates(user_id)
      .then((res) => setTemplates(res))
      .catch((err) => console.log(err));
  };

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
    <div style={{ minWidth: 375, maxWidth: 1500 }} className="mx-auto">
      <Header />
      <Outlet context={[templates, getTemplates]} />
      <Footer />
    </div>
  );
}

export default Main;
