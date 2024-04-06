import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default class ClaimService {
  static instance = null;

  claims = [
    {
      id: "21aa2ab5-5c2f-4876-b427-480eebcad81a",
      name: "Claim 1",
      date: "2024-01-01",
      description: "Descrição da reclamação",
      tags: [
        { name: "Tag Test 1", color: "lightgreen" },
        { name: "Tag Test 2", color: "lightgreen" },
      ],
    },
    {
      id: "9692c93c-6d5b-451b-a4e2-9f887a9cd074",
      date: "2024-01-01",
      name: "Claim 5",
      description: "Descrição da reclamação",
    },
  ];

  tags = [
    { name: "Rua", color: "lightgreen" },
    { name: "Poste", color: "lightgreen" },
    { name: "Casa", color: "lightgreen" },
    { name: "Morro", color: "lightgreen" },
  ];

  static getInstance() {
    if (ClaimService.instance == null) {
      ClaimService.instance = new ClaimService();
    }

    return ClaimService.instance;
  }

  getTags() {
    return this.tags;
  }

  getClaimById(id) {
    return this.claims.find((claim) => claim.id === id);
  }

  createClaim(claim) {
    this.claims = [...this.claims, { id: uuidv4(), date: new Date(), ...claim }];
  }
}
