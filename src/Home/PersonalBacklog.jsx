import React from "react";
import { Table, Button } from "reactstrap";
// import NewBacklog from "./NewBacklog";

const PersonalBacklogTable = props => {
  //

  const personalBacklogUpdate = backlog => {
    fetch(`http://localhost:3003/backlog/${backlog.id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Complete"
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      })
    }).then(() => props.fetchBacklog());
  };

  //
  const backlogMapper = () => {
    return props.backlog.map((backlog, index) => {
      return backlog.workingUser === localStorage.userName &&
        backlog.status === "Working" ? (
        <tr key={index} id={backlog.id}>
          <th>{index + 1}</th>
          <td>{backlog.item}</td>
          <td>{backlog.description}</td>
          <td>{backlog.status}</td>
          <td>{backlog.workingUser}</td>
          <td></td>
          <Button
            color="warning"
            onClick={() => {
              personalBacklogUpdate(backlog);
            }}
          >
            Mark as complete
          </Button>
        </tr>
      ) : null;
    });
  };
  return (
    <div>
      <h2>Personal Backlog</h2>
      <Table dark striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Current Team Member working</th>
          </tr>
        </thead>
        <tbody>{backlogMapper()}</tbody>
      </Table>
    </div>
  );
};
export default PersonalBacklogTable;
