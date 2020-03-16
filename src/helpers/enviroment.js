let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3003";
    break;
  case "dcb-sprint-tracker2020.herokuapp.com":
    APIURL = "https://dcb-sprint-tracker.herokuapp.com";
}

export default APIURL;
