import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import APIURL from "../helpers/enviroment";

const NewBacklog = props => {
  const [newItem, setNewItem] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${APIURL}/backlog/add`, {
      method: "POST",
      body: JSON.stringify({
        item: newItem,
        description: description
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      })
    })
      .then(res => res.json())
      .then(backlogData => {
        setNewItem("");
        setDescription("");
        props.fetchBacklog();
      });
  };
  return (
    <>
      <h3>Add Item To Team Backlog</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="itemName" />
          <Input
            name="item"
            placeholder=" Item Name"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Description" />
          <Input
            name="description"
            placeholder=" Item Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Submit Item</Button>
      </Form>
    </>
  );
};
export default NewBacklog;
