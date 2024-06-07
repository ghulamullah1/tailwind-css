import axios from "axios";
import keycloak from "keycloak-js";

const keyInstance = new keycloak({
  realm: "server realm",
  url: "http://localhost:8080/",
  clientId: "react-client",
});

function initializeKeyCloak(onCallBack) {
  keyInstance
    .init({
      onLoad: "login-required",
      checkLoginIframe: true,
      pkceMethod: "S256",
    })
    .then((auth) => {
      if (!auth) {
        console.log("User is not Authenticated");
      } else {
        axios.interceptors.request.use((e) => {
          e.headers.Authorization = `Bearer ${keyInstance.token}`;
          return e;
        });
      }
      // onCallBack();
    })
    .catch((err) => console.log(err));
}

const doLogin = () => keyInstance.login;
const isLogin = () => keyInstance.login;
const getParsedToken = () => keyInstance.tokenParsed;
const getToken = () => keyInstance.token;
const logout = (opt) => keyInstance.logout(opt);
const updateToken = (successCB) =>
  keyInstance.updateToken(5).then(successCB).catch(doLogin);

export const Services = {
  initializeKeyCloak,
  doLogin,
  isLogin,
  getParsedToken,
  getToken,
  updateToken,
  logout,
  keyInstance,
};
