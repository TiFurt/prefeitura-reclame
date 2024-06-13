import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebaseConfig";
import AuthService from "./AuthService";
import { getAllClaims, saveClaims, syncClaims } from "./LocalDatabase";
import { getIsConnected } from "./NetworkInfo";

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
    if (!getIsConnected()) {
      return (await getAllClaims(true))
        .map((claim) => {
          claim.tags = JSON.parse(claim.tags);
          claim.image = JSON.parse(claim.image);
          claim.location = {
            latitude: claim.latitude,
            longitude: claim.longitude
          };
          delete claim.latitude;
          delete claim.longitude;
          return claim;
        });
    }

    const notDeletedQuery = query(this._claimsRef, where("deletedAt", "==", null));
    const querySnapshot = await getDocs(notDeletedQuery);
    const allTags = await this.getTags();

    const request = querySnapshot.docs.map(async (doc) => {
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

    const result = await Promise.all(request);
    saveClaims(result);
    syncClaims(result);

    return result;
  }

  async createClaim(claim) {
    if (!getIsConnected()) {
      const id = uuidv4();
      const newClaim = {
        ...claim,
        id,
        date: new Date(),
        tags: [],
        userId: AuthService.getInstance().getCurrentUser()?.uid,
        deletedAt: null
      };

      saveClaims([newClaim], false);
      return;
    }

    const id = uuidv4();
    const tags = claim.tags?.map((tag) => doc(db, "tags", tag)) || [];
    const newClaim = {
      id,
      date: serverTimestamp(),
      ...claim,
      tags,
      userId: AuthService.getInstance().getCurrentUser()?.uid,
      deletedAt: null
    };

    setDoc(doc(db, "claims", id), newClaim).then(() => {
      saveClaims([newClaim], false);
    });
  }

  async updateClaim(claimToSave) {
    const tags = claimToSave.tags?.map((tag) => doc(db, "tags", tag)) || [];
    const updatedClaim = {
      ...claimToSave,
      tags: tags,
      deletedAt: null
    };

    updateDoc(doc(db, "claims", claimToSave.id), updatedClaim).then(() => {
      saveClaims([updatedClaim], false);
    });
  }

  async deleteClaim(claimId) {
    updateDoc(doc(db, "claims", claimId), { deletedAt: serverTimestamp() }).then(async () => {
      const querySnapshot = await getDocs(doc(db, "claims", claimId));
      const claim = querySnapshot.docs[0].data();
      saveClaims([claim], false);
    });
  }
}
