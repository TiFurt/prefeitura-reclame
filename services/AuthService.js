import { signal } from "@preact/signals-core";

export default class AuthService {
  static instance = null;

  authenticated = signal(false);

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    AuthService.instance = this;
  }

  static getInstance() {
    return AuthService.instance || new AuthService();
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