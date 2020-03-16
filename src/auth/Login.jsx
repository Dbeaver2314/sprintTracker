import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import APIURL from "../helpers/enviroment";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${APIURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(data => {
        props.setNewUserType(data.user.userType);
        props.updateToken(data.sessionToken);
        props.setNewUserName(data.user.username);
      })
      .catch(err => alert("incorrect username or password"));
  };
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};
export default Login;
