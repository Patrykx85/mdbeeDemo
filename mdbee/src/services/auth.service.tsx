import axios from "axios";
import { setUser, removeUser, getUser } from "./token.service";
import { API_URL } from "./common.service";

class Auth {
  async register(email: string, password: string) {
    console.log(email);
    const response = await axios.post(API_URL + "api/users/", {
      email,
      password,
    });
    return response.data;
  }

  async login(email: string, password: string) {
    console.log(email);
    const response = await axios.post(API_URL + "api/token/", {
      email,
      password,
    });
    console.log(response);
    if (response.data.access) {
      setUser(response.data);
    }
    return response;
  }

  logout() {
    removeUser();
  }

  getCurrentUser() {
    return getUser();
  }
}

const AuthService = new Auth();

export default AuthService;
