import Form from "react-bootstrap/Form";

function UserRegister() {
  return (
    <>
      {/* {users.map((user) => ( */}
      {/* <tr key={user.user_id}> */}
      <tr>
        <td>
          <Form>
            <Form.Check
              type="checkbox"
              className="ms-1"
              // id={user.user_id}
              // checked={user.checked}
              // onChange={(e) => handleCheckUser(e)}
            />
          </Form>
        </td>
        <td>
          Eligio Elizarraraz Molina
          {/* {user.last_name}, {user.first_name} */}
        </td>
        <td>
          eligio2008@live.com.mx
          {/* {user.email} */}
        </td>
        <td>
          <p className="my-1 bg-primary text-white text-center">true</p>
        </td>
        <td>
          <p className="my-1 bg-secondary text-white text-center">Blocked</p>
          {/* {user.status ? (
            <p className="my-1 bg-success text-white text-center w-75">
              Active
            </p>
          ) : (
            <p className="my-1 bg-danger text-white text-center w-75">
              Blocked
            </p>
          )} */}
        </td>
      </tr>
      {/* ))} */}
    </>
  );
}
export default UserRegister;
