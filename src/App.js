import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./auth/Auth";
import React, { useState, useEffect } from "react";
import Main from "./Home/Main";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = newToken => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };
  const setNewUserType = NewUserType => {
    localStorage.setItem("userType", NewUserType);
    setUserType(NewUserType);
  };
  const setNewUserName = NewUserName => {
    localStorage.setItem("userName", NewUserName);
    setUserName(NewUserName);
  };
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };
  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Main token={sessionToken} userType={userType} clickLogout={clearToken} />
    ) : (
      <Auth
        updateToken={updateToken}
        setNewUserType={setNewUserType}
        setNewUserName={setNewUserName}
      />
    );
  };

  return <div>{protectedViews()}</div>;
}
export default App;
