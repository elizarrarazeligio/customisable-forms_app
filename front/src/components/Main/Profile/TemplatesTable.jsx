import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import TemplateRegister from "./TemplateRegister";

function TemplatesTable() {
  return (
    <>
      <Row className="col-lg-9 col-11 mx-auto pt-4 px-0">
        <p className="fw-bold fs-5 m-0 px-2 text-muted">My templates</p>
        <Table hover className="">
          <thead>
            <tr>
              <th className="col-sm-8 col-6">Name</th>
              <th className="col-sm-3 col-5">Last updated</th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {Array.from({ length: 1 }).map((i, ind) => (
              <TemplateRegister key={ind} />
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default TemplatesTable;
