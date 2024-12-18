import apiAuth from "./apiAuth";
import authHeader from "./auth-header";

import { API_URL } from "./common.service";

class UserService {
  getUserData() {
    return apiAuth.get(API_URL + `users/current/`, {
      headers: authHeader(),
    });
  }
  saveUserData(id: any, userData: any) {
    return apiAuth.patch(API_URL + `users/${id}/`, userData, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
