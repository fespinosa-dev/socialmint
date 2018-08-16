import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import Cookies from "js-cookie";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const defaults = { headers: headers, credentials: "include" };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  let baseUrl = `http://localhost:8080/login?username=${
    loginRequest.usernameOrEmail
  }&password=${loginRequest.password}`;
  return fetch(baseUrl, { credentials: "include", method: "post" }).then(
    response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
  );
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET"
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET"
  });
}

export function getCurrentUser() {
  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function geLoggedInUsers() {
  return request({
    url: API_BASE_URL + "/users/online",
    method: "GET"
  });
}

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: "GET"
  });
}
