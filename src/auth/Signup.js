import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ManagerMakeTeam from "./managerMakeTeam";

const Signup = props => {
  const [username, setUsername] = useState(""); //the Username value passed to the DB
  const [password, setPassword] = useState(""); //the value Password passed to the DB
  const [userType, setUserType] = useState(""); // a YES/NO value that users select If they are a manager or not
  const [teams, setTeams] = useState([]); // the data recieved from the DB to display all team names
  const [pickedTeam, setPickedTeam] = useState(""); // the value sent to the database for TeamName
  const [makeTeam, setMakeTeam] = useState(false); // open and controll the make-team-modal used by managers only
  let disablebtn = true; // turns off the submit button if all forms are not filled

  if (userType === "") {
    disablebtn = true;
  } else {
    disablebtn = false;
  }
  let sendType = ""; //converting the YES/NO value to manager or user for the DB
  if (userType === "No") {
    sendType = "User";
  } else if ((sendType = "")) {
    sendType = "User";
  } else {
    sendType = "Manager";
  }

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3003/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        userType: sendType,
        team: pickedTeam
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(data =>
        data.sessionToken
          ? (props.updateToken(data.sessionToken),
            props.setNewUserType(
              data.user.userType,
              props.setNewUserName(data.user.username)
            ))
          : alert(data.errors[0].message)
      );
  };

  function joinTeam() {
    fetch("http://localhost:3003/team/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(data => setTeams(data));
  }

  useEffect(() => {
    if (userType === "No") {
      joinTeam();
    }
  }, [userType]);
  useEffect(() => {
    if (userType === "Yes") {
      setMakeTeam(true);
    }
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <Form id="submitUserForm" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={e => setUsername(e.target.value)}
            name="username"
            value={username}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
          />
          <br />
          <label htmlFor="userType">Are you a manager? </label>
          <select
            id="userType"
            name="Manager"
            onChange={e => setUserType(e.target.value)}
          >
            <option value=""></option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {userType === "No" ? <div>Please Select your team</div> : null}
          {userType === "No"
            ? teams.map(team => {
                return (
                  <div>
                    <input
                      type="radio"
                      name="teamChoice"
                      id={team.teamName}
                      value={team.teamName}
                      onChange={e => setPickedTeam(e.target.value)}
                    />
                    <label htmlFor={team.teamName}>{team.teamName}</label>
                    <br></br>
                  </div>
                );
              })
            : null}
          {makeTeam === true ? (
            <ManagerMakeTeam
              makeTeam={setMakeTeam}
              pickedTeam={setPickedTeam}
              username={username}
            />
          ) : (
            <></>
          )}
        </FormGroup>
        <Button type="submit" id="submitBtn" disabled={disablebtn}>
          Signup
        </Button>
      </Form>
    </div>
  );
};
export default Signup;
