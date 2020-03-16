import React from "react";
import { Table, Button } from "reactstrap";
// import NewBacklog from "./NewBacklog";

const BacklogTable = props => {
  //
  const deleteBacklog = backlog => {
    console.log(props);
    fetch(`http://localhost:3003/backlog/${backlog.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      })
    }).then(() => props.fetchBacklog());
  };

  const backlogUpdate = backlog => {
    fetch(`http://localhost:3003/backlog/${backlog.id}`, {
      method: "PUT",
      body: JSON.stringify({
        workingUser: localStorage.userName,
        status: "Working"
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      })
    }).then(() => props.fetchBacklog());
  };

  //

  //
  const backlogMapper = () => {
    return props.backlog.map((backlog, index) => {
      return (
        <tr key={index} id={backlog.id}>
          <th>{index + 1}</th>
          <td>{backlog.item}</td>
          <td>{backlog.description}</td>
          <td>{backlog.status}</td>
          <td>{backlog.workingUser}</td>
          <td></td>
          {localStorage.userType === "Manager" ? (
            <Button
              color="danger"
              onClick={() => {
                deleteBacklog(backlog);
              }}
            >
              DELETE
            </Button>
          ) : localStorage.userType === "User" && backlog.workingUser == 0 ? (
            (console.log(typeof backlog.workingUser),
            (
              <Button
                color="warning"
                onClick={() => {
                  backlogUpdate(backlog);
                }}
              >
                add to Personal Backlog
              </Button>
            ))
          ) : null}
        </tr>
      );
    });
  };
  return (
    <div>
      <h2>Team Backlog</h2>
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
export default BacklogTable;
