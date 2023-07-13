type RawMaterial = {
  category: string;
  icon: string;
  subfields: { name: string }[];
};

const rawMaterials: RawMaterial[] = [
  {
    category: "Energy",
    icon: "materialCategory/energy",
    subfields: [
      { name: "Brent" },
      { name: "Natural gas" },
      { name: "Gasoline" },
      { name: "Coal" },
      { name: "UK Gas" },
      { name: "Ethanol" },
    ],
  },
  {
    category: "Metals",
    icon: "materialCategory/metal",
    subfields: [
      { name: "Gold" },
      { name: "Silver" },
      { name: "Copper" },
      { name: "Steel" },
      { name: "Iron Ore" },
      { name: "Lithium" },
      { name: "Platinum" },
      { name: "Titanium" },
      { name: "HRC Steel" },
      { name: "Cobalt" },
      { name: "Lead" },
      { name: "Aluminum" },
      { name: "Tin" },
      { name: "Zinc" },
      { name: "Nickel" },
      { name: "Molybdenum" },
      { name: "Palladium" },
      { name: "Rhodium" },
      { name: "Neodymium" },
      { name: "Tellurium" },
      { name: "Iron Ore 62% fe" },
      { name: "Magnesium" },
      { name: "Gallium" },
      { name: "Germanium" },
      { name: "Manganese" },
      { name: "Indium" },
    ],
  },
  {
    category: "Plastic",
    icon: "materialCategory/plastic",
    subfields: [
      { name: "Polyethylene" },
      { name: "Polyvinyl" },
      { name: "Polypropylene" },
    ],
  },
  {
    category: "ESG",
    icon: "materialCategory/ESG",
    subfields: [
      { name: "Solar Energy Index" },
      { name: "EU Carbon Permits" },
      { name: "Wind Energy Index" },
    ],
  },
  {
    category: "Others",
    icon: "materialCategory/others",
    subfields: [{ name: "Kraft Pulp" }, { name: "Rubber" }],
  },
];

export const filterValidMaterials = (materials: string[]) => {
  const validMaterials = materials.filter((material) =>
    allRawMaterials.find((rawMaterial) => rawMaterial.name === material)
  );
  return validMaterials;
};

export const allRawMaterials: { name: string }[] = rawMaterials.reduce(
  (acc: { name: string }[], curr) => {
    return [...acc, ...curr.subfields];
  },
  []
);

export default rawMaterials;
