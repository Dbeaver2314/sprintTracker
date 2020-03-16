import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
  Modal
} from "reactstrap";
import APIURL from "../helpers/enviroment";

const ManagerMakeTeam = props => {
  const [editName, setEditName] = useState("");
  props.pickedTeam(editName);
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  const createTeam = () => {
    fetch(`${APIURL}/team/add`, {
      method: "POST",
      body: JSON.stringify({
        teamName: editName,
        username: props.username
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(res => {
      props.makeTeam(false);
    });
  };

  return (
    <Modal isOpen={modal}>
      <ModalHeader toggle={toggle}>Create Your Team</ModalHeader>
      <ModalBody>
        <Form onSubmit={createTeam}>
          <FormGroup>
            <Label htmlFor="teamName">New Team Name</Label>
            <Input
              name="teamName"
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ManagerMakeTeam;
