import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Input from "./Input";
import { useState } from "react";
import userApi from "../../../utils/userApi";
import { toast } from "react-toastify";

function ProfileSettings({ showModal, handleClose, themes, user }) {
  const [phone, setPhone] = useState(user.account?.Phone || "");
  const [country, setCountry] = useState(user.account?.BillingCountry || "");
  const [state, setState] = useState(user.account?.BillingState || "");
  const [city, setCity] = useState(user.account?.BillingCity || "");
  const [postal, setPostal] = useState(user.account?.BillingPostalCode || "");

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    userApi
      .updateAccountInfo(user.id, {
        country,
        state,
        city,
        postal,
        phone,
      })
      .then((res) => toast.success(res.message))
      .catch((err) => err.then((res) => toast.error(res.message)))
      .finally(() => handleClose());
  };

  return (
    <Modal centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>My Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => handleAccountSubmit(e)}>
        <Modal.Body className="d-flex flex-column align-items-center col-12">
          <h6 className="pb-2 col-12 col-sm-11">Personal Information</h6>
          <Input
            type="email"
            label="Email:"
            option={1}
            value={user.account.Name}
          />
          <Input
            type="tel"
            label="Phone:"
            option={1}
            value={phone}
            setter={setPhone}
          />

          <h6 className="pt-4 col-12 col-sm-11">Address</h6>
          <Row className="m-0 p-0 col-12 col-sm-11">
            <Input
              type="text"
              label="Country:"
              option={2}
              value={country}
              setter={setCountry}
            />
            <Input
              type="text"
              label="State:"
              option={2}
              value={state}
              setter={setState}
            />
          </Row>
          <Row className="m-0 p-0 col-12 col-sm-11">
            <Input
              type="text"
              label="City:"
              option={2}
              value={city}
              setter={setCity}
            />
            <Input
              type="number"
              label="Postal Code:"
              option={2}
              value={postal}
              setter={setPostal}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column justify-content-center">
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProfileSettings;
