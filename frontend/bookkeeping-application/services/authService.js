import API from "./api";

const AuthService = {
  login: (data) => {
    return API.post("/login", data)
      .then((res) => {
        setHeadersAndStorage(res.data.user, res.data.token);
        return res.data;
      })
      .catch((err) => {
        console.log("Auth service err", err);
      });
  },
  register: (data) => {
    return API.post("/register", data)
      .then((res) => {
        setHeadersAndStorage(res.user, res.token);
        return res.data;
      })
      .catch((err) => {
        console.log("Auth service err", err);
      });
  },
  logout: () => {
    //remove the JWT token from the AXIOS instance
    API.defaults.headers["Authorization"] = "";
    //remove user&token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

const setHeadersAndStorage = (user, token) => {
  //set applicaion headers of AXIOS instance
  //can now set the authorization default header using the JWT Token sent form the server
  //whenever we make contact with the server, we use the token for authorization
  //This will allow the server to know which user is making contact
  API.defaults.headers["Authorization"] = `Bearer ${token}`;

  //save user&token to local storage
  //we cannot store a JS object. Must convert to string.
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
};

export default AuthService;
