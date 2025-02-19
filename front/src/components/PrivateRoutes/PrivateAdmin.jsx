import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";

function PrivateAdmin() {
  const { user } = useContext(UsersContext);

  return user && user.admin ? <Outlet /> : <Navigate to="/home" />;
}

export default PrivateAdmin;
