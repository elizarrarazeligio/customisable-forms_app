import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";

function SingleLine({ answers, themes }) {
  return (
    <Row className="mx-auto col-12 col-sm-9 col-md-6">
      <Table bordered striped className="table-sm m-0" variant={themes.table}>
        <thead>
          <tr>
            <th
              colSpan={2}
              className="fw-semibold"
              style={{ fontSize: "0.9rem" }}
            >
              Latest registers
            </th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {answers.slice(0, 5).map((answer, ind) => {
            return (
              <tr key={ind}>
                <td className="fw-semibold" style={{ fontSize: "0.8rem" }}>
                  {ind + 1}
                </td>
                <td className="text-start ps-3" style={{ fontSize: "0.9rem" }}>
                  {answer.answer}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Row>
  );
}

export default SingleLine;
