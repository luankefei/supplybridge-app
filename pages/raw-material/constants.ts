type RawMaterial = {
  category: string;
  subfields: { name: string }[];
};

const rawMaterials: RawMaterial[] = [
  {
    category: "metal",
    subfields: [
      {
        name: "Gold",
      },
      {
        name: "Silver",
      },
      {
        name: "Steel",
      },
      {
        name: "HRCSteel",
      },
      {
        name: "Copper",
      },
      {
        name: "Plantinum",
      },
      {
        name: "Titanium",
      },
      {
        name: "Lithium",
      },
      {
        name: "IronOre",
      },
      {
        name: "Palladium",
      },
    ],
  },
  {
    category: "plastic",
    subfields: [
      {
        name: "Polyethylene",
      },
      {
        name: "Polyvinyl",
      },
      {
        name: "Plypropylene",
      },
    ],
  },
  {
    category: "other",
    subfields: [],
  },
];

export const allRawMaterials: { name: string }[] = rawMaterials.reduce(
  (acc: { name: string }[], curr) => {
    return [...acc, ...curr.subfields];
  },
  []
);

export default rawMaterials;
