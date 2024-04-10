import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default class ClaimService {
  static instance = null;

  tags = [
    { name: "Rua", color: "lightgreen" },
    { name: "Poste", color: "lightgreen" },
    { name: "Casa", color: "lightgreen" },
    { name: "Morro", color: "lightgreen" },
  ];

  claims = [
    {
      id: "21aa2ab5-5c2f-4876-b427-480eebcad81a",
      name: "Lâmpada queimada",
      date: "2024-01-01",
      description: "Lâmpada do poste da rua queimada",
      tags: [
        this.tags[0],
        this.tags[1],
      ],
      location: {
        latitude: 37.422094,
        longitude: -122.083922,
        altitude: 0,
      },
    },
    {
      id: "9692c93c-6d5b-451b-a4e2-9f887a9cd074",
      date: "2024-01-01",
      name: "Deslizamento de terra",
      description: "Perigo de deslizamento de terra em cima da casa",
      tags: [
        this.tags[2],
        this.tags[3],
      ],
      location: {
        latitude: -23.55052,
        longitude: -46.633308,
        altitude: 0,
      },
    },
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

  updateClaim(claimToSave) {
    this.claims = this.claims.map((claim) => {
      if (claim.id === claimToSave.id) {
        return { ...claim, ...claimToSave };
      }
      return claim;
    });
  }
}
