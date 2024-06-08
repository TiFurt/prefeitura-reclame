import { signal } from "@preact/signals-core";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

  register(user) {
    const auth = getAuth();
    const createResponse = createUserWithEmailAndPassword(auth, user.email, user.password);

    createResponse
      .then((userCredential) => {
        if (userCredential) {
          this.createUser(userCredential.user.uid, user);
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });

    return createResponse;
  }

  async createUser(uid, user) {
    const newuser = {
      id: uid,
      ...user
    };
    await setDoc(doc(db, "users", uid), newuser);
  }
}