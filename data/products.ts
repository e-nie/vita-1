export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    brand?: string;
    stock_status?: 'IN_STOCK' | 'OUT_OF_STOCK';
}

export const products: Product[] = [
    {
        id: "01JS2RTT6H0G449G3CB5D6NANZ",
        name: "Combination Pliers",
        price: 14.15,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT6M979VSG9TV18BN5RQ",
        name: "Pliers",
        price: 12.01,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT6QYRZV1XKYSAW63XFC",
        name: "Bolt Cutters",
        price: 48.41,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT6SYDJBKY24SW2M4RVY",
        name: "Long Nose Pliers",
        price: 14.24,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "OUT_OF_STOCK"
    },
    {
        id: "01JS2RTT6VD5ZFZNK06DJ3GF9V",
        name: "Slip Joint Pliers",
        price: 9.17,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT6XNNCPX46W167AF0SY",
        name: "Claw Hammer with Shock Reduction Grip",
        price: 13.41,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT70E6XRRTM513HH5ZPH",
        name: "Hammer",
        price: 12.58,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT715R75DJA7SKBQB5QM",
        name: "Claw Hammer",
        price: 11.48,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT73BJH8F1C51MSVP0AG",
        name: "Thor Hammer",
        price: 11.14,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT74G142N9YAXDP4XKM7",
        name: "Sledgehammer",
        price: 17.75,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT76Z84ZXB2XMY0Q94TV",
        name: "Claw Hammer with Fiberglass Handle",
        price: 20.14,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2RTT778RT18T6ZCY5191VP",
        name: "Court Hammer",
        price: 18.63,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQ65SYTC12W49M0JFK0",
        name: "Adjustable Wrench",
        price: 20.33,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQ7REEYPJZWRZTYX716",
        name: "Angled Spanner",
        price: 14.14,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KR6K93S0A7M3Q3TX5W4",
        name: "Belt Sander",
        price: 73.59,
        category: "Power Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQC06Y9QXYP77DP67BX",
        name: "Chisels Set",
        price: 12.96,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KR7WB8KP5NNATJTAF2Q",
        name: "Circular Saw",
        price: 80.19,
        category: "Power Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQSF53GP6ZFJX8J8VMJ",
        name: "Construction Helmet",
        price: 41.29,
        category: "Safety Gear",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KRD91KVRKC7BE2NXETH",
        name: "Cordless Drill 12V",
        price: 46.50,
        category: "Power Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KRBBKW33M0V4GTTQM4F",
        name: "Cordless Drill 24V",
        price: 66.54,
        category: "Power Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQWNNX3Z9T0568YXWMP",
        name: "Cross-head screws",
        price: 7.99,
        category: "Fasteners",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KR0KMRS4T7JFH5R5RGF",
        name: "Drawer Tool Cabinet",
        price: 89.55,
        category: "Storage Solutions",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQSF53GP6ZFJX8J8VMK",
        name: "Ear Protection",
        price: 18.58,
        category: "Safety Gear",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQX7WVWA34S44XV2Z94",
        name: "Flat-Head Wood Screws",
        price: 3.95,
        category: "Fasteners",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KR4Z00VTVYDSYDZHR7E",
        name: "Leather toolbelt",
        price: 61.16,
        category: "Tool Belts",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQYGGGCB0RNHARJBR45",
        name: "M4 Nuts",
        price: 4.65,
        category: "Fasteners",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQHYFYXJ9XVNFK09ZWK",
        name: "Measuring Tape",
        price: 10.07,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQB8G9K5VX5YC396BCR",
        name: "Mini Screwdriver",
        price: 13.96,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQVP3HW1K44KJE074RF",
        name: "Nuts and bolts",
        price: 5.55,
        category: "Fasteners",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQ8X5MNJ8KM323PBJ9M",
        name: "Open-end Spanners (Set)",
        price: 38.51,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQ9SBNHQBXHPZKW10CN",
        name: "Phillips Screwdriver",
        price: 4.92,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQQJ6PGMYCZZKT97ZZM",
        name: "Protective Gloves",
        price: 21.42,
        category: "Safety Gear",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQN3Q63V0T6VDBYZNK5",
        name: "Safety Goggles",
        price: 24.26,
        category: "Safety Gear",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQP491G7WA97M8ZCQRQ",
        name: "Safety Helmet Face Shield",
        price: 35.62,
        category: "Safety Gear",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQTS2Q21WN97A3ET1NZ",
        name: "Screws",
        price: 6.25,
        category: "Fasteners",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KR549N540NTMM211AFW",
        name: "Sheet Sander",
        price: 58.48,
        category: "Power Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQMTZ4ZNDKF83B3VZMP",
        name: "Square Ruler",
        price: 15.75,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQRWVDEWHV8GVJTV6K4",
        name: "Super-thin Protection Gloves",
        price: 38.45,
        category: "Safety Gear",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQFNAPHSHHWWJP5DQPT",
        name: "Swiss Woodcarving Chisels",
        price: 22.96,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQJFH1426HS931PQPJJ",
        name: "Tape Measure 5m",
        price: 12.91,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQGSW2MRK8XBXHCE8M4",
        name: "Tape Measure 7.5m",
        price: 7.23,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KR1XKZM3WZKD683H49M",
        name: "Tool Cabinet",
        price: 86.71,
        category: "Storage Solutions",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQZ53F38PMESV4Q58F9",
        name: "Washers",
        price: 3.55,
        category: "Fasteners",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQDYWHCBWWG12V326GM",
        name: "Wood Carving Chisels",
        price: 45.23,
        category: "Hand Tools",
        brand: "MightyCraft Hardware",
        stock_status: "IN_STOCK"
    },
    {
        id: "01JS2W8KQ505Y9X39SBBEFF1PE",
        name: "Wood Saw",
        price: 12.18,
        category: "Hand Tools",
        brand: "ForgeFlex Tools",
        stock_status: "IN_STOCK"
    }
];
