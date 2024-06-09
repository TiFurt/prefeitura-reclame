import "react-native-get-random-values";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import AuthService from "./AuthService";

export default class ClaimService {
  static instance = null;

  _claimsRef = collection(db, "claims");
  _tagsRef = collection(db, "tags");

  static getInstance() {
    if (ClaimService.instance == null) {
      ClaimService.instance = new ClaimService();
    }

    return ClaimService.instance;
  }

  async getTags() {
    const querySnapshot = await getDocs(this._tagsRef);
    return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  }

  async getClaims() {
    const querySnapshot = await getDocs(this._claimsRef);
    const allTags = await this.getTags();

    const result = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const date = data.date.toDate();

      const tags = data.tags?.map((tag) => {
        return allTags.find((tagData) => tagData.id === tag.id);
      }) || [];

      return {
        ...data,
        date,
        tags
      };
    });

    return Promise.all(result);
  }

  async createClaim(claim) {
    const id = uuidv4();
    const tags = claim.tags?.map((tag) => doc(db, "tags", tag)) || [];
    const newClaim = {
      id,
      date: serverTimestamp(),
      ...claim,
      tags,
      userId: AuthService.getInstance().getCurrentUser().uid
    };
    await setDoc(doc(db, "claims", id), newClaim);
  }

  async updateClaim(claimToSave) {
    const tags = claimToSave.tags?.map((tag) => doc(db, "tags", tag)) || [];
    const updatedClaim = {
      ...claimToSave,
      tags: tags
    };
    await updateDoc(doc(db, "claims", claimToSave.id), updatedClaim);
  }
}
