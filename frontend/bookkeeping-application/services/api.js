import axios from "axios";

//get token from local storage if already logged in
let token = "";
if (typeof window !== "undefined") {
  localStorage.hasOwnProperty("token")
    ? (token = `${localStorage.getItem("token").replace(/^"(.*)"$/, "$1")}`)
    : (token = "");
}

console.log(token);

const API = axios.create({
  baseURL: "http://127.0.0.1:4000",
  headers: {
    Accept: "application/json",
    Authorization: token,
  },
});

export default API;
