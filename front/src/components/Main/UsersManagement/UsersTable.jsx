import UserRegister from "./UserRegister";
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";
import userApi from "../../../utils/userApi.js";

function UsersTable({ users, check, setCheck, checkAll, setCheckAll, themes }) {
  const handleCheckUser = (e) => {
    userApi.checkUser(e.currentTarget.id).then(() => setCheck(!check));
  };

  const handleCheckAll = (e) => {
    userApi
      .checkAllUsers(e.currentTarget.checked)
      .then(() => setCheckAll(!checkAll));
  };

  return (
    <>
      <Table striped className="table-sm" variant={themes.table}>
        <thead>
          <tr>
            <th className="col-1">
              <ToggleButton
                className="btn btn-sm m-0 px-1 py-0"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={checkAll}
                value="1"
                onChange={(e) => handleCheckAll(e)}
              >
                <i className="bi bi-caret-down-fill"></i>
              </ToggleButton>
            </th>
            <th className="col-4">Name</th>
            <th className="col-5">Email</th>
            <th className="col-1">Admin</th>
            <th className="col-1">Status</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {users.map((user) => {
            return (
              <UserRegister
                key={user.user_id}
                user={user}
                handleCheckUser={handleCheckUser}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
export default UsersTable;
