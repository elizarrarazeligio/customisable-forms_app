import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import checkboxApi from "../../../../../../utils/checkboxApi";

function CheckboxOption({ checkbox, setCheckboxChange, checkboxes }) {
  const [option, setOption] = useState(checkbox.option);

  const handleDeleteCheckbox = () => {
    checkboxApi
      .deleteCheckbox(checkbox.checkbox_id)
      .then(() => setCheckboxChange([true]))
      .catch((err) => err.then(console.log(err)));
  };

  return (
    <Form.Group className="ms-3 d-flex align-items-center pb-2">
      <Form.Check type="checkbox" disabled />
      <Form.Control
        type="text"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Checkbox Option"
        className="bg-white rounded-0 w-75 ms-2"
        required
      />
      <Button
        className="ms-1 p-1 bg-white border-white"
        style={{ width: 35 }}
        onClick={() => handleDeleteCheckbox()}
        disabled={checkboxes.length == 1 ? true : false}
      >
        <i className="bi bi-trash-fill text-danger mx-0"></i>
      </Button>
    </Form.Group>
  );
}

export default CheckboxOption;
