import Row from "react-bootstrap/esm/Row";
import Alert from "react-bootstrap/esm/Alert";
import Table from "react-bootstrap/esm/Table";
import TemplateRegister from "./TemplateRegister";

function UserTemplates() {
  const user = "1";

  return (
    <>
      <Row className="col-lg-9 col-11 mx-auto pt-4 px-0">
        {user ? (
          <Table hover className="">
            <thead>
              <tr>
                <th>Form Name</th>
                <th>Created by</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {Array.from({ length: 3 }).map((i, ind) => (
                <TemplateRegister key={ind}/>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert
            variant="dark"
            className="col-md-7 col-sm-10 col-12 mx-auto d-flex flex-column align-items-center pb-0 m-0 px-1"
          >
            <Alert.Heading className="">Hey, user!</Alert.Heading>
            <p className="text-center">
              If you want to access the whole functionalities, go ahead and{" "}
              <Alert.Link href="register">register</Alert.Link> yourself!
            </p>
          </Alert>
        )}
      </Row>
    </>
  );
}

export default UserTemplates;
