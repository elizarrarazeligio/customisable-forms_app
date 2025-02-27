import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { toast } from "react-toastify";

function PrivateTemplates() {
  const { user } = useContext(UsersContext);
  const templateData = useLoaderData();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(templateData.response);

  useEffect(() => {
    if (templateData.status == "success") {
      setTemplate(templateData.response);
    } else if (templateData.status == "error") {
      navigate("/home");
      toast.error(templateData.response);
    }
  }, [templateData]);

  return user && (user.admin || user.id == template.user_id) ? (
    <Outlet context={[template]} />
  ) : !template.private ||
    (user &&
      template.private &&
      template.allowed_users.includes(user.email)) ? (
    <Navigate to={`/${template.hash}/form`} />
  ) : (
    <Navigate to={"/home"} />
  );
}

export default PrivateTemplates;
