export const areasData = {
  areas: [
    {
      area: "RiNo",
      details: "/api/v1/areas/590",
    },
    {
      area: "Park Hill",
      details: "/api/v1/areas/751",
    },
    {
      area: "LoHi",
      details: "/api/v1/areas/408",
    },
    {
      area: "Cap Hill",
      details: "/api/v1/areas/240",
    },
  ],
};

export const areaData = [
  {
    id: 408,
    name: "Lower Highlands",
    location: "West of Downtown",
    about:
      "The Lower Highlands area, often referred to as the Highlands or LoHi, was one of the first areas to experience massive growth from the downtown area. Known for many great bars and restaurants with a great eastern facing view of the Downtown area.",
    region_code: 640399,
    listings: [
      "/api/v1/listings/83331",
      "/api/v1/listings/411",
      "/api/v1/listings/92",
      "/api/v1/listings/6135",
      "/api/v1/listings/9",
      "/api/v1/listings/11",
      "/api/v1/listings/77",
    ],
  },
  {
    id: 590,
    name: "River North",
    location: "North of Downtown Denver",
    about:
      "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
    region_code: 6356834,
    quick_search: "o5kod9f5cqo0",
    listings: [
      "/api/v1/listings/3",
      "/api/v1/listings/44",
      "/api/v1/listings/221",
      "/api/v1/listings/744",
      "/api/v1/listings/90",
      "/api/v1/listings/310",
    ],
  },
  {
    id: 240,
    name: "Capitol Hill",
    location: "Southwest of Downtown",
    about:
      "Capitol Hill is home to many historic homes and parks in the Denver area. Cap Hill offers great proximity to Downtown area and has many options for enjoying the wonderful weather in Denver.",
    region_code: 6035251,
    quick_search: "2mxzlp185o800",
    listings: [
      "/api/v1/listings/66",
      "/api/v1/listings/555",
      "/api/v1/listings/27",
      "/api/v1/listings/8",
    ],
  },
  {
    id: 751,
    name: "Park Hill",
    location: "East of Downtown Denver",
    about:
      "Park Hill features one of the best views of the downtown area and surrounding mountains. With easy access to City Park and the major highways, Park Hill also includes many unique styles of homes.",
    region_code: 6648386,
    quick_search: "g1m0tsxzl0o0",
    listings: [
      "/api/v1/listings/3921",
      "/api/v1/listings/56",
      "/api/v1/listings/21",
    ],
  },
];

export const listingDataOne = {
  listing_id: 44,
  area_id: 590,
  name: "Lowkey Industrial Chic",
  address: {
    street: "2441 Broadway Ave",
    zip: "80205",
  },
  details: {
    neighborhood_id: 5124122,
    superhost: true,
    seller_source: "91jss1",
    beds: 1,
    baths: 1.5,
    cost_per_night: 220,
    features: ["city views", "industrial motif", "rooftop"],
  },
  dev_id: "jaenku",
  area: "rino",
  db_connect: 694530,
};

export const listingDataTwo = {
  listing_id: 221,
  area_id: 590,
  name: "New Modern Flat in RiNo",
  address: {
    street: "2459 Lawrence St",
    zip: "80205",
  },
  details: {
    neighborhood_id: 5124122,
    superhost: true,
    seller_source: "91jss1",
    beds: 3,
    baths: 5,
    cost_per_night: 285,
    features: ["rooftop", "proximity to bars/restaurants", "new appliances"],
  },
  dev_id: "amukct",
  area: "rino",
  db_connect: 872937,
};
