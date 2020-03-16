import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import BacklogTable from "./BacklogTable";
import NewBacklog from "./NewBacklog";
import PersonalBacklogTable from "./PersonalBacklog";

import APIURL from "../helpers/enviroment";

const Main = props => {
  const [backlog, setBacklog] = useState([]);
  function fetchBacklog() {
    fetch(`${APIURL}/backlog/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      })
    })
      .then(res => res.json())
      .then(backlogData => {
        setBacklog(backlogData);
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    fetchBacklog();
  }, []);

  console.log(localStorage.userType);
  return (
    <Container>
      <h1>WELCOME!</h1>
      <Button onClick={props.clickLogout}>Logout!</Button>
      <Row>
        <Col md="6">
          {localStorage.userType === "Manager" ? (
            <NewBacklog token={props.token} fetchBacklog={fetchBacklog} />
          ) : localStorage.userType === "User" ? (
            <PersonalBacklogTable
              backlog={backlog}
              token={props.token}
              fetchBacklog={fetchBacklog}
            />
          ) : null}
        </Col>
        <Col md="6">
          <BacklogTable
            backlog={backlog}
            token={props.token}
            fetchBacklog={fetchBacklog}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
