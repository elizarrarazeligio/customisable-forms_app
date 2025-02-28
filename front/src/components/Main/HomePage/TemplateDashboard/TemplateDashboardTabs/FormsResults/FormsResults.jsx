import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import FormResultRegister from "./FormResultRegister";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../../../../contexts/ThemeContext";

function FormsResults() {
  const answeredForms = useLoaderData();
  const [forms, setForms] = useState(answeredForms.response.forms);
  const themes = useContext(ThemeContext);

  return (
    <Container fluid className={`${themes.bg3} px-2 pt-2 pb-4 rounded mb-1`}>
      <Row className="mx-auto pt-4 px-0 col-lg-10 col-11">
        <h2 className="text-center mb-3">Answered Forms</h2>

        <hr />
        <p className="text-center">
          Here you will find further information of all the answered forms
          created from this template.
          <br />
          To see the answers, click on the form you would like to review.
        </p>
        <hr />
      </Row>

      <Row className="overflow-auto mx-auto pt-2 px-0 col-lg-10 col-11 mb-2">
        <Table hover striped variant={themes.table}>
          <thead>
            <tr>
              <th className="col-1"></th>
              <th className="col-3">User</th>
              <th className="col-4">Email</th>
              <th className="col-4">Created at</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {forms ? (
              forms.map((form, ind) => (
                <FormResultRegister key={ind} form={form} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted fw-semibold">
                  No Forms Answered Yet
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default FormsResults;
