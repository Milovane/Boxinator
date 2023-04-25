import Keycloak from "keycloak-js";

// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json");
let user = null;

/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
  return keycloak.init(config);
};

function updateUser(newUser) {
  user = newUser;
}

async function checkAuthentication() {
  if (keycloak.authenticated) {
    fetchUserWithId();
  }
}

async function fetchUserWithId() {
  const userId = keycloak.subject;

  try {
    const apiResponse = await fetch(
      `http://localhost:8080/api/v1/users/${userId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + keycloak.token,
          "User-Agent": "any-name",
        },
      }
    );

    console.log(apiResponse);

    if (apiResponse.ok) {
      //User exists
      user = await apiResponse.json();
    }
  } catch (error) {
    console.log(error);
  }
}

keycloak.onAuthSuccess = () => {
  checkAuthentication();
};

keycloak.onAuthLogout = () => {
  user = null;
};

/** @type { Keycloak } keycloak */
export default keycloak;
export { user, updateUser };
