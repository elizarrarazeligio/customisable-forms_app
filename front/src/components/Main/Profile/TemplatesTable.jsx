import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import TemplateRegister from "./TemplateRegister";

function TemplatesTable({ templates, setManageChange }) {
  return (
    <>
      <Row className="col-lg-9 col-11 mx-auto pt-4 px-0">
        <p className="fw-bold fs-5 m-0 px-2 text-muted">My templates</p>
        <Table hover className="">
          <thead>
            <tr>
              <th className="col-sm-6 col-6">Name</th>
              <th className="col-sm-5 col-5">Created on</th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {templates.map((template) => (
              <TemplateRegister
                key={template.template_id}
                template={template}
                setManageChange={setManageChange}
              />
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default TemplatesTable;
