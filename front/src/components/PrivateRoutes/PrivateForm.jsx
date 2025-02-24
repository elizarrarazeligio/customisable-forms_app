import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";

function PrivateForm() {
  const { user } = useContext(UsersContext);

  return user ? <Outlet /> : <Navigate to="/home" />;
}

export default PrivateForm;
