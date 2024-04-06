import { signal } from "@preact/signals-core";

export default class AuthService {
  static instance = null;

  authenticated = signal(false);

  static getInstance() {
    if (AuthService.instance == null) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  login() {
    this.authenticated.value = true;
  }

  logout() {
    this.authenticated.value = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}