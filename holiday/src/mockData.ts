
export interface Listing {
  id: string;
  title: string;
  description: string;
  cost: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  dates: {
    from: string;
    to: string;
  };
  images: string[];
  isShared: boolean;
  isSeeking: boolean;
  contact: {
    name: string;
    email: string;
    phone?: string;
    instagram?: string;
    preferredMethod: "email" | "phone" | "instagram";
  };
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "1 bed 1 bath dream",
    description: "A beautiful one bedroom apartment with lots of natural light and modern furniture.",
    cost: "$1,500/month",
    location: "Brooklyn, NY",
    bedrooms: 1,
    bathrooms: 1,
    dates: {
      from: "2023-06-01",
      to: "2023-08-30",
    },
    images: ["/lovable-uploads/8183b311-def9-4e3e-a8aa-7cccfb42c3a1.png"],
    isShared: false,
    isSeeking: false,
    contact: {
      name: "Alex Johnson",
      email: "alex@example.com",
      preferredMethod: "email",
    },
  },
  {
    id: "2",
    title: "2 bed 2 bath loft",
    description: "Spacious loft in the heart of downtown with two bedrooms and bathrooms.",
    cost: "$2,800/month",
    location: "Manhattan, NY",
    bedrooms: 2,
    bathrooms: 2,
    dates: {
      from: "2023-07-15",
      to: "2023-12-31",
    },
    images: ["/lovable-uploads/cd6bde65-4224-4f85-8cab-5a095e00afb1.png"],
    isShared: true,
    isSeeking: false,
    contact: {
      name: "Jordan Smith",
      email: "jordan@example.com",
      phone: "212-555-1234",
      preferredMethod: "phone",
    },
  },
  {
    id: "3",
    title: "cdmx casita",
    description: "Charming casita in Mexico City with beautiful garden views.",
    cost: "$1,200/month",
    location: "Mexico City, MX",
    bedrooms: 1,
    bathrooms: 1,
    dates: {
      from: "2023-08-01",
      to: "2023-10-31",
    },
    images: ["/lovable-uploads/f266f989-fc96-426f-8ed7-300311b17aff.png"],
    isShared: false,
    isSeeking: false,
    contact: {
      name: "Casey Morgan",
      email: "casey@example.com",
      instagram: "@caseyincdmx",
      preferredMethod: "instagram",
    },
  },
  {
    id: "4",
    title: "Seeking 1BR in Brooklyn",
    description: "Looking for a one bedroom apartment in Brooklyn for 3 months.",
    cost: "$1,800/month",
    location: "Brooklyn, NY",
    bedrooms: 1,
    bathrooms: 1,
    dates: {
      from: "2023-09-01",
      to: "2023-11-30",
    },
    images: [],
    isShared: false,
    isSeeking: true,
    contact: {
      name: "Taylor Reed",
      email: "taylor@example.com",
      instagram: "@tay_reed",
      preferredMethod: "instagram",
    },
  },
];

export default mockListings;
