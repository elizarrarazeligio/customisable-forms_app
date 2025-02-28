import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import TemplateRegister from "./TemplateRegister";
import FormRegister from "./FormRegister";

function ProfileTable({ title, array, setManageChange, themes }) {
  return (
    <>
      <Row className="col-lg-9 col-11 mx-auto pt-4 px-0">
        <p className={`fw-bold fs-5 m-0 px-2 ${themes.text2}`}>{title}</p>
        <Table hover striped variant={themes.table}>
          <thead>
            <tr>
              <th className="col-sm-6 col-6">Name</th>
              <th className="col-sm-5 col-5">Created on</th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {array.length != 0 ? (
              array.map((item, ind) =>
                Object.hasOwn(item, "form_id") ? (
                  <FormRegister
                    key={ind}
                    form={item}
                    setManageChange={setManageChange}
                    themes={themes}
                  />
                ) : (
                  <TemplateRegister
                    key={ind}
                    template={item}
                    setManageChange={setManageChange}
                    themes={themes}
                  />
                )
              )
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-muted fw-semibold">
                  No Registers
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default ProfileTable;
