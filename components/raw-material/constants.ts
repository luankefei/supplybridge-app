type RawMaterial = {
  category: string;
  icon: string;
  subfields: { name: string; description?: string; apiName: string }[];
};

// export const QuickAddMaterials: RawMaterial[] = [
//   {
//     category: "EV-related",
//     icon: "materialCategory/energy",
//     subfields: [
//       { name: "Cobalt" },
//       { name: "Lithium" },
//       { name: "Nickel" },
//       { name: "Magnesium" },
//     ],
//   },
// ];

export const apiNamesMap: Record<string, string> = {
  Copper: "copper",
  "Iron Ore": "iron_ore",
  Aluminum: "aluminum",
  Zinc: "zinc",
  Tin: "tin",
  Nickel: "nickel",
  Titanium: "titanium",
  Brent: "brent",
  Ethanol: "ethanol",
  Polyethylene: "polyethylene",
  Manganese: "manganese",
  "HRC Steel": "hrc_steel",
  Steel: "steel",
  Gold: "gold",
  Silver: "silver",
  Platinum: "platinum",
  Lithium: "lithium",
  Cobalt: "cobalt",
  Lead: "lead",
  Polyvinyl: "polyvinyl",
  Germanium: "germanium",
  Rhodium: "rhodium",
  Molybdenum: "molybdenum",
  Palladium: "palladium",
  Neodymium: "neodymium",
  Tellurium: "tellurium",
  Gallium: "gallium",
  "Natural gas": "natural_gas",
  "UK Gas": "uk_gas",
  Gasoline: "gasoline",
  Coal: "coal",
  Magnesium: "magnesium",
};
const rawMaterials: RawMaterial[] = [
  {
    category: "Energy",
    icon: "materialCategory/energy",
    subfields: [
      {
        name: "Brent",
        description:
          "Brent Crude oil is a major benchmark price for purchases of oil worldwide. While Brent Crude oil is sourced from the North Sea the oil production coming from Europe, Africa and the Middle East flowing West tends to be priced relative to this oil.",
        apiName: "brent",
      },
      {
        name: "Natural gas",
        description:
          "Natural gas accounts for almost a quarter of United States energy consumption. The NYMEX Division natural gas futures contract is widely used as a national benchmark price. The futures contract trades in units of 10,000 million British thermal units (mmBtu). The price is based on delivery at the Henry Hub in Louisiana, the nexus of 16 intra- and interstate natural gas pipeline systems that draw supplies from the region's prolific gas deposits. The United States is the biggest natural gas producer followed by Russia.",
        apiName: "natural_gas",
      },
      {
        name: "Gasoline",
        description:
          "Gasoline is the largest single volume refined product sold in the United States accounting for almost half of national oil consumption. The NYMEX Division New York harbor unleaded gasoline futures contract and reformulated gasoline blendstock for oxygen blending (RBOB) futures contract trade in units of 42,000 gallons (1,000 barrels). They are based on delivery at petroleum products terminals in the harbor, the major East Coast trading center for imports and domestic shipments from refineries in the New York harbor area or from the Gulf Coast refining centers.",
        apiName: "gasoline",
      },
      {
        name: "Coal",
        description:
          "Coal futures are available for trading in the Intercontinental Exchange and on the New York Mercantile Exchange. The standard GC Newcastle contact listed on ICE weights 1,000 metric tonnes. Coal is the major fuel used for generating electricity worldwide. The biggest producer and consumer of coal is China. Other big producers include: United States, India, Australia, Indonesia, Russia, South Africa, Germany and Poland. The biggest exporters of coal are: Indonesia, Australia, Russia, United States, Colombia, South Africa and Kazakhstan.",
        apiName: "coal",
      },
      {
        name: "UK Gas",
        description:
          "UK Natural Gas Futures is a national benchmark price. Contracts are for physical delivery through the transfer of rights in respect of Natural Gas at the National Balancing Point (NBP) Virtual Trading Point, operated by National Grid, the transmissions system operator in the UK. Delivery is made equally each day throughout the delivery period. Futures are available for trading in the Intercontinental Exchange Inc. (ICE).",
        apiName: "uk_gas",
      },
      {
        name: "Ethanol",
        description:
          "The ethanol market is growing rapidly, particularly due to the governments mandate for renewable fuels. Ethanol is largely produced through fermenting starch or sugar-based feedstocks. In the United States, corn is the principal raw material; in Brazil, the world's leading ethanol producer, sugar cane is widely used. In the United States, Ethanol Futures are available for Trading in The Chicago Board of Trade (CBOT® ).",
        apiName: "ethanol",
      },
    ],
  },
  {
    category: "Metals",
    icon: "materialCategory/metal",
    subfields: [
      {
        name: "Gold",
        description:
          "Gold is mostly traded on the OTC London market, the US futures market (COMEX) and the Shanghai Gold Exchange (SGE). The standard future contract is 100 troy ounces. Gold is an attractive investment during periods of political and economic uncertainty. Half of the gold consumption in the world is in jewelry, 40% in investments, and 10% in industry. The biggest producers of gold are China, Australia, United States, South Africa, Russia, Peru and Indonesia. The biggest consumers of gold jewelry are India, China, United States, Turkey, Saudi Arabia, Russia and UAE.",
        apiName: "gold",
      },
      {
        name: "Silver",
        description:
          "Silver futures and options contracts are used by mining companies, fabricators of finished products, and users of silver-content industrial materials to manage their price risk. As a precious metal, silver also plays a role in investment portfolios. The largest industrial users of silver are the photographic, jewelry, and electronic industries. The biggest producers of silver are: Mexico, Peru and China followed by Australia, Chile, Bolivia, United States, Poland and Russia.",
        apiName: "silver",
      },
      {
        name: "Copper",
        description:
          "Copper futures are widely traded on the London Metal Exchange (LME), at the COMEX and on the Multi-Commodity Exchange in India. The standard contract is 25,000 lbs. Copper is the third most widely used metal in the world. Chile accounts for over one third of world's copper production followed by Peru, Democratic Republic of the Congo, China, United States, Australia, Indonesia, Zambia, Canada and Poland. The biggest importers of copper are China, Japan, India, South Korea and Germany.",
        apiName: "copper",
      },
      {
        name: "Steel",
        description:
          "Steel Rebar is mostly traded on the Shanghai Futures Exchange and London Metal Exchange. The standard future contract is 10 tons. Steel is one of the world’s most important materials used in construction, cars and all sorts of machines and appliances. By far the biggest producer of crude steel is China, followed by European Union, Japan, United States, India, Russia and South Korea.",
        apiName: "steel",
      },
      {
        name: "Iron Ore",
        description:
          "Iron ore prices refer to Iron Ore Fine China Import 63.5 percent grade Spot Cost and Freight for the delivery at the Chinese port of Tianjin. Is used to make steel for infrastructure and other construction projects. The biggest producers of iron ore are China, Australia and Brazil. Others include India, Russia, Ukraine and South Africa.",
        apiName: "iron_ore",
      },
      {
        name: "Lithium",
        description:
          "Lithium is a silver-white light metal. Lithium hydroxide is used in batteries for electrical vehicles and mobile phones. Lithium hydroxide is produced from a chemical reaction between lithium carbonate and calcium hydroxide. The biggest lithium producers are Chile, China, Australia and Argentina. The largest lithium importers are China, Japan, South Korea and the United States.",
        apiName: "lithium",
      },
      {
        name: "Platinum",
        description:
          "Platinum is mostly traded on the New York Mercantile Exchange, the Tokyo Commodity Exchange and the London Bullion Market. Platinum futures contract trades in units of 50 troy ounces. Platinum is among the world's scarcest metals and is used primarily in the production of automotive catalytic converters, in petroleum refineries and in the chemical and electrical industry. South Africa accounts for 80% of production followed by Russia and North America.",
        apiName: "platinum",
      },
      {
        name: "Titanium",
        description:
          "Futures contracts for Titanium are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Titanium over time.",
        apiName: "titanium",
      },
      {
        name: "HRC Steel",
        description:
          "US Midwest Domestic Hot-Rolled Coil Steel Futures are widely traded on the New York Mercantile Exchange (NYMEX). Futures contracts for hot-rolled coil steel are financial instruments that allow producers, large consumers, and speculators to offset or assume the risk of a price change of holding a quantity of hot-rolled coil steel over time. Hot rolling, the process used to make hot rolled steel, involves rolling steel at high temperatures. Hot rolled steel is used in various applications such as agricultural equipment, automobile parts, construction materials, and railroad equipment.",
        apiName: "hrc_steel",
      },
      {
        name: "Cobalt",
        description:
          "Cobalt is a hard, lustrous, grey metal with a high melting point (1493°C). Cobalt is used mainly in the production of chemicals (58 percent), superalloys for gas turbine blades and jet aircraft engines, special steel, carbides, diamond tools, and magnets. By far, the biggest producer of cobalt is DR Congo (more than 50%) followed by Russia (4%), Australia, the Philippines, and Cuba. Cobalt futures are available for trading on The London Metal Exchange (LME). The standard contact has a size of 1 tonne. Futures contracts for Cobalt are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Cobalt over time.",
        apiName: "cobalt",
      },
      {
        name: "Lead",
        description:
          "Lead is a soft, malleable, ductile, bluish-white, dense metallic element, extracted from galena and found in ore with zinc, silver and copper. 80 percent of modern lead usage is in the production of batteries. Lead is also often used to line tanks that store corrosive liquids and as a shield against X and gamma-ray radiation. The biggest producers of lead are Australia, China and USA, followed by Peru, Canada, Mexico, Sweden, Morocco, South Africa and North Korea. Lead Futures are available for trading in The London Metal Exchange (LME). The standard contact has a size of 25 tonnes.",
        apiName: "lead",
      },
      {
        name: "Aluminum",
        description:
          "Aluminum futures are mostly traded on the London Metal Exchange (LME), the New York Mercantile Exchange (COMEX) and the Shanghai Futures Exchange. The standard future contract size is 5 tons. Aluminum is used widely in aerospace applications, packaging, automobiles and railroad cars and as a construction material. The biggest producers of aluminum are: The Aluminum Corporation of China (Chalco), Alcoa and Alumina Ltd, Rio Tinto from Australia, UC Rusal of Russia, Xinfa from China, Norsk Hydro ASA from Norway and South 32 from Australia. China accounts for nearly 60 percent of global aluminum output. The biggest resources of bauxites, the raw material for aluminum are located in Australia, China and Guinea.",
        apiName: "aluminum",
      },
      {
        name: "Tin",
        description:
          "Tin is a silvery, malleable metal mainly used in the production of solder and to coat other metals to prevent corrosion. It is widely used in metal in the environmental and sustainability landscape, particularly in photovoltaic installations, electric vehicles, and electronics. The biggest producers of tin are China, Malaysia, Indonesia, Peru, Thailand, Bolivia and Myanmar. Tin Futures are available for trading in The London Metal Exchange (LME). The standard contact weighs 5 tonnes.",
        apiName: "tin",
      },
      {
        name: "Zinc",
        description:
          "Zinc Futures are available for trading in The London Metal Exchange (LME). The standard contract size it 25 tonnes. Zinc is often used in die-casting alloys, castings, brass products, sheeting products, chemicals, medicine, paints and batteries. The biggest producers of zinc are. China, Peru, Australia, United States, Canada, India and Kazakhstan.",
        apiName: "zinc",
      },
      {
        name: "Nickel",
        description:
          "Nickel is mainly used in the production of stainless steel and other alloys and can be found in food preparation equipment, mobile phones, medical equipment, transport, buildings, power generation. The biggest producers of nickel are Indonesia, the Philippines, Russia, New Caledonia, Australia and Canada. Nickel futures are available for trading in The London Metal Exchange (LME). The standard contact has a weight of 6 tonnes.",
        apiName: "nickel",
      },
      {
        name: "Molybdenum",
        description:
          "Molybdenum is a silvery metal with the sixth-highest melting point of any element, it can withstand extremely high temperatures and is highly resistant to corrosion. Molybdenum is mainly used as an alloying agent in stainless steel, and also in the manufacture of aircraft parts and industrial motors. The biggest producers of the metal are: China, United States, Chile, Peru and Mexico. Molybdenum Futures are available for trading in The London Metal Exchange (LME). The standard contact has a weight of 6 tonnes.",
        apiName: "molybdenum",
      },
      {
        name: "Palladium",
        description:
          "Palladium is a soft silver-white metal used mostly in the production of catalytic converters for petrol cars, electronics, dentistry, medicine, hydrogen purification, chemical applications, groundwater treatment and jewelry. The biggest producers of palladium are by far Russia and South Africa (70-80% of world output) followed by United States, Canada and Zimbabwe. Palladium Futures are available for trading in London Platinum and Palladium Market and on the New York Mercantile Exchange. The standard contact weights 100 troy ounces. .",
        apiName: "palladium",
      },
      {
        name: "Rhodium",
        description:
          "Rhodium is a silver-white metallic element resistant to corrosion and highly reflective. It is considered the rarest and most valuable precious metal in the world. The main use for rhodium is in catalytic converters designed to clean vehicle emissions. The biggest producer of rhodium is South Africa (60% of the world supply) followed by Russia (10%). There is no futures market for rhodium, but there are a few exchanges that trade the element including Johnson Matthey in Hong Kong. .",
        apiName: "rhodium",
      },
      {
        name: "Neodymium",
        description:
          "Neodymium is the strongest permanent magnet material yet discovered. It is widely used in microphones, professional loudspeakers, headphones, computer hard disks, electric motors and generators. It is a rare-earth mineral mostly extracted in China, the United States, Brazil, India, Sri Lanka, and Australia.",
        apiName: "neodymium",
      },
      {
        name: "Tellurium",
        description:
          "Tellurium is used in alloys, mostly with copper and stainless steel, to improve their machinability. Globally, the primary producers of tellurium are Sweden, Japan, Russia, China, the United States, and Peru. Futures are available for trading in the Shanghai Metal Market (SMM).",
        apiName: "tellurium",
      },
      {
        name: "Iron Ore 62% fe",
        description:
          "Iron ore prices refer to Iron Ore Fine China Import 62 percent grade Spot Cost and Freight for the delivery at the Chinese port of Tianjin. Is used to make steel for infrastructure and other construction projects. The biggest producers of iron ore are China, Australia and Brazil. Others include India, Russia, Ukraine and South Africa.",
        apiName: "",
      },
      {
        name: "Magnesium",
        description:
          "The biggest Magnesium producer is China, accounting for about 87% of the total production. Magnesium is a critical material for hardening aluminum alloys and is used in everything from power tools to laptops. Major consumers are China (39%), followed by Europe and North America (each around 19%) and Japan (4%).",
        apiName: "magnesium",
      },
      {
        name: "Gallium",
        description:
          "Gallium is a soft, silvery-white metal, similar to aluminum. It is an important component of many semiconductors. It is a useful silicon substitute for the electronics industry and it is also used in red LEDs.China accounts for more than 80% of global low-grade primary gallium capacity. Germany, Japan, the Republic of Korea, Russia, and Ukraine are also significant producers. Futures are available for trading in the Shanghai Metal Market (SMM). Futures contracts for Gallium are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Gallium over time.",
        apiName: "gallium",
      },
      {
        name: "Germanium",
        description:
          "Germanium is a semiconductor mainly used as a transistor in thousands of electronic applications. The biggest producers of the metal are China, responsible for around 60% of total production, Canada, Finland, Russia and the United States. Futures are available for trading in the Shanghai Metal Market (SMM). Futures contracts for Germanium are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Germanium over time.",
        apiName: "germanium",
      },
      {
        name: "Manganese",
        description:
          "Manganese Ore is primarily used in steel and iron production among other uses like as an additive in unleaded gasoline and as pigments for the coloring of ceramics and glass. This page refers to the Manganese Ore with 32% manganese, and 20% iron in North China, Tianjin port from South Africa.",
        apiName: "manganese",
      },
      {
        name: "Indium",
        description:
          "Indium is a soft, silvery metal that is stable in air and water. Most indium is used to make indium tin oxide (ITO), which is an important part of touch screens, flatscreen TVs and solar panels. It conducts electricity, bonds strongly to glass and is transparent. Indium is one of the least abundant minerals on Earth. It has been found uncombined in nature, but typically it is found associated with zinc minerals and iron, lead and copper ores. It is commercially produced as a by-product of zinc refining. Futures are available for trading in the Shanghai Metal Market (SMM). Futures contracts for Indium are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Indium over time.",
        apiName: "",
      },
      {
        name: "Uranium",
        description:
          "Uranium is a highly dense metal which occurs in most rocks and is mostly used as a fuel in nuclear power plants. The standard contract unit is 250 pounds of U3O8 and is traded on New York Mercantile Exchange. Top uranium producers are Kazakhstan, Canada and Australia.",
        apiName: "uranium",
      },
    ],
  },
  {
    category: "Plastic",
    icon: "materialCategory/plastic",
    subfields: [
      {
        name: "Polyethylene",
        description:
          "Polyethylene is a member of the family of polyolefin resins. It is the most widely used plastic globally and often finds use in typical applications like bottles, bags, toys, and tubes. Polyethylene futures are widely traded on the Dalian Commodity Exchange (DCE), and the standard contract size is 5 tonnes. Futures contracts for Polyethylene are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Polyethylene over time.",
        apiName: "polyethylene",
      },
      {
        name: "Polyvinyl",
        description:
          "Polyvinyl is the world's third-most widely produced synthetic polymer of plastic (after polyethylene and polypropylene). Polyvinyl futures are widely traded on the Dalian Commodity Exchange (DCE), and the standard contract size is 5 tonnes. Futures contracts for Polyvinyl are financial instruments that allow producers, large consumers, and speculators, to offset or assume the risk of a price change of holding a quantity of Polyvinyl over time.",
        apiName: "polyvinyl",
      },
      {
        name: "Polypropylene",
        description:
          "Polypropylene futures are widely traded on the Dalian Commodity Exchange (DCE), and the standard contract size is 5 tonnes. Polypropylene is a thermoplastic polymer used in a wide range of applications such as consumer product packaging, plastic parts for various industries such as the automotive industry, special devices such as living hinges, and textiles.",
        apiName: "polypropylene",
      },
    ],
  },
  {
    category: "ESG",
    icon: "materialCategory/ESG",
    subfields: [
      {
        name: "Solar Energy Index",
        description:
          "The Solar Energy Index CFD tracks the performance of publicly traded companies in the solar energy sector as well as those businesses that do not produce energy but make most of their revenues by providing goods and services to the solar energy industry.",
        apiName: "",
      },
      {
        name: "EU Carbon Permits",
        description:
          "Allowances for carbon emissions are first allocated considering EU directives for the maximum amount of greenhouse gases that can be emitted. Allowances for carbon emissions are then auctioned and traded.",
        apiName: "",
      },
      {
        name: "Wind Energy Index",
        description:
          "The Wind Energy Index CFD tracks the performance of publicly traded companies in the wind energy sector as well as those businesses that do not produce energy but make most of their revenues by providing goods and services to the wind energy industry.",
        apiName: "",
      },
    ],
  },
  {
    category: "Others",
    icon: "materialCategory/others",
    subfields: [
      {
        name: "Kraft Pulp",
        description:
          "Bleached Softwood Kraft Pulp futures are widely traded on the Shanghai Stock Exchange (SSEC), and the standard contract is 10 tonnes. Kraft pulping is the most common form of chemical pulping, at 80% of the total chemical pulping industry.",
        apiName: "",
      },
      {
        name: "Rubber",
        description:
          "Natural rubber is high resilience, extremely waterproof, and stretchable material. Is used extensively in many applications and products, either alone or in combination with other materials. The biggest producers of rubber are China, Indonesia, Malaysia and Thailand. Others include Papua New Guinea, Philippines, Singapore, Sri Lanka, Thailand, Vietnam, Cambodia, and India. Rubber Futures are available for trading on several exchanges including Osaka Exchange, Singapore Exchange (SGX), the Malaysian Rubber Exchange and the Shanghai International Energy Exchange.",
        apiName: "",
      },
    ],
  },
  { category: "More", icon: "materialCategory/others", subfields: [] },
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
