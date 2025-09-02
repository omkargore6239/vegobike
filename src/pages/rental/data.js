// src/pages/rental/data.js
export const LOCATIONS = [
  { id: "blr", name: "Bengaluru" },
  { id: "mum", name: "Mumbai" },
  { id: "del", name: "Delhi" },
  { id: "hyd", name: "Hyderabad" },
];

export const BIKES = [
  // Bengaluru Bikes
  {
    id: "bk-101",
    company: "Honda",
    name: "Activa 6G",
    number: "KA-01 AB 1234",
    type: "Scooter",
    location: "blr",
    store_address: "MG Road, Brigade Road, Bengaluru, Karnataka 560001",
    pricePerHour: 80,
    rating: 4.5,
    packages: {
      "1_day": 800,
      "7_days": 3500,
      "15_days": 4000,
      "30_days": 6500
    },
    refundable_deposit: 1000,
    features: [],
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: "bk-102",
    company: "Yamaha",
    name: "FZ-S V3",
    number: "KA-02 CD 5678",
    type: "Street",
    location: "blr",
    store_address: "5th Block, Koramangala, Bengaluru, Karnataka 560034",
    pricePerHour: 120,
    rating: 4.7,
    packages: {
      "1_day": 820,
      "7_days": 3600,
      "15_days": 4100,
      "30_days": 6700
    },
    refundable_deposit: 1000,
    features: [],
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: "bk-103",
    company: "KTM",
    name: "Duke 200",
    number: "KA-03 EF 9876",
    type: "Naked",
    location: "blr",
    store_address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    pricePerHour: 180,
    rating: 4.8,
    packages: {
      "1_day": 1200,
      "7_days": 5500,
      "15_days": 7000,
      "30_days": 10500
    },
    refundable_deposit: 1000,
    features: [],
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: "bk-104",
    company: "Bajaj",
    name: "Pulsar NS 200",
    number: "KA-04 GH 3456",
    type: "Street",
    location: "blr",
    store_address: "ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066",
    pricePerHour: 150,
    rating: 4.6,
    packages: {
      "1_day": 950,
      "7_days": 4200,
      "15_days": 5500,
      "30_days": 8500
    },
    refundable_deposit: 1000,
    features: [],
    image: "https://picsum.photos/300/200?random=4",
  },

  // Mumbai Bikes
  {
    id: "bk-201",
    company: "Royal Enfield",
    name: "Classic 350",
    number: "MH-01 IJ 1234",
    type: "Cruiser",
    location: "mum",
    store_address: "Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    pricePerHour: 160,
    rating: 4.6,
    packages: {
      "1_day": 900,
      "7_days": 4000,
      "15_days": 4500,
      "30_days": 7000
    },
    refundable_deposit: 1000,
    features: [],
    image: "https://picsum.photos/300/200?random=5",
  },
  {
    id: "bk-202",
    company: "Honda",
    name: "CB Shine",
    number: "MH-02 KL 5678",
    type: "Commuter",
    location: "mum",
    store_address: "SV Road, Andheri East, Mumbai, Maharashtra 400069",
    pricePerHour: 100,
    rating: 4.4,
    packages: {
      "1_day": 750,
      "7_days": 3200,
      "15_days": 3800,
      "30_days": 6000
    },
    refundable_deposit: 1000,
    features: [],
    image: "https://picsum.photos/300/200?random=6",
  }
];
