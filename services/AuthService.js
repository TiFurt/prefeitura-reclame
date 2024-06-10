import { signal } from "@preact/signals-core";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, getReactNativePersistence, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { app } from "../firebaseConfig";

export default class AuthService {
  static instance = null;

  recentAuthenticated = false;
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  static getInstance() {
    if (AuthService.instance == null) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  login() {
    this.recentAuthenticated = true;
  }

  logout() {
    this.recentAuthenticated = false;
  }

  isAuthenticated() {
    return !!this.auth.currentUser;
  }

  register(user) {
    const createResponse = createUserWithEmailAndPassword(this.auth, user.email, user.password);

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

  onAuthStateChanged(onChange) {
    onAuthStateChanged(this.auth, (user) => onChange(user));
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}