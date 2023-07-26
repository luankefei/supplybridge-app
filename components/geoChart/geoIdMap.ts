import { EnumRegion, EnumSubRegion } from "./geoUtils";

/**
 * Everything in this file GPT Generated
 * -- so it can be wrong. come modify this file if you find any errors
 * -- and clear this comment when it becomes error-free
 *
 */

const CountryToRegionMap: Record<string, EnumRegion> = {
  AFG: EnumRegion.APAC,
  AGO: EnumRegion.EMEA,
  ALB: EnumRegion.EMEA,
  ARE: EnumRegion.EMEA,
  ARG: EnumRegion.Americas,
  ARM: EnumRegion.EMEA,
  ATF: EnumRegion.EMEA,
  AUS: EnumRegion.APAC,
  AUT: EnumRegion.EMEA,
  AZE: EnumRegion.EMEA,
  BDI: EnumRegion.EMEA,
  BEL: EnumRegion.EMEA,
  BEN: EnumRegion.EMEA,
  BFA: EnumRegion.EMEA,
  BGD: EnumRegion.APAC,
  BGR: EnumRegion.EMEA,
  BHS: EnumRegion.Americas,
  BIH: EnumRegion.EMEA,
  BLR: EnumRegion.EMEA,
  BLZ: EnumRegion.Americas,
  BOL: EnumRegion.Americas,
  BRA: EnumRegion.Americas,
  BRN: EnumRegion.APAC,
  BTN: EnumRegion.APAC,
  BWA: EnumRegion.EMEA,
  CAF: EnumRegion.EMEA,
  CAN: EnumRegion.Americas,
  CHE: EnumRegion.EMEA,
  CHL: EnumRegion.Americas,
  CHN: EnumRegion.APAC,
  CIV: EnumRegion.EMEA,
  CMR: EnumRegion.EMEA,
  COD: EnumRegion.EMEA,
  COG: EnumRegion.EMEA,
  COL: EnumRegion.Americas,
  CRI: EnumRegion.Americas,
  CUB: EnumRegion.Americas,
  CYP: EnumRegion.EMEA,
  CZE: EnumRegion.EMEA,
  DEU: EnumRegion.EMEA,
  DJI: EnumRegion.EMEA,
  DNK: EnumRegion.EMEA,
  GRL: EnumRegion.EMEA,
  DOM: EnumRegion.Americas,
  DZA: EnumRegion.EMEA,
  ECU: EnumRegion.Americas,
  EGY: EnumRegion.EMEA,
  ERI: EnumRegion.EMEA,
  ESP: EnumRegion.EMEA,
  EST: EnumRegion.EMEA,
  ETH: EnumRegion.EMEA,
  FIN: EnumRegion.EMEA,
  FJI: EnumRegion.APAC,
  FRA: EnumRegion.EMEA,
  GUF: EnumRegion.Americas,
  GAB: EnumRegion.EMEA,
  GBR: EnumRegion.EMEA,
  GEO: EnumRegion.EMEA,
  GHA: EnumRegion.EMEA,
  GIN: EnumRegion.EMEA,
  GMB: EnumRegion.EMEA,
  GNB: EnumRegion.EMEA,
  GNQ: EnumRegion.EMEA,
  GRC: EnumRegion.EMEA,
  GTM: EnumRegion.Americas,
  GUY: EnumRegion.Americas,
  HND: EnumRegion.Americas,
  HRV: EnumRegion.EMEA,
  HTI: EnumRegion.Americas,
  HUN: EnumRegion.EMEA,
  IDN: EnumRegion.APAC,
  IND: EnumRegion.APAC,
  IRL: EnumRegion.EMEA,
  IRN: EnumRegion.APAC,
  IRQ: EnumRegion.APAC,
  ISL: EnumRegion.EMEA,
  ISR: EnumRegion.EMEA,
  ITA: EnumRegion.EMEA,
  JAM: EnumRegion.Americas,
  JOR: EnumRegion.EMEA,
  JPN: EnumRegion.APAC,
  KAZ: EnumRegion.APAC,
  KEN: EnumRegion.EMEA,
  KGZ: EnumRegion.APAC,
  KHM: EnumRegion.APAC,
  KOR: EnumRegion.APAC,
  XXK: EnumRegion.EMEA,
  KWT: EnumRegion.EMEA,
  LAO: EnumRegion.APAC,
  LBN: EnumRegion.EMEA,
  LBR: EnumRegion.EMEA,
  LBY: EnumRegion.EMEA,
  LKA: EnumRegion.APAC,
  LSO: EnumRegion.EMEA,
  LTU: EnumRegion.EMEA,
  LUX: EnumRegion.EMEA,
  LVA: EnumRegion.EMEA,
  MAR: EnumRegion.EMEA,
  MDA: EnumRegion.EMEA,
  MDG: EnumRegion.EMEA,
  MEX: EnumRegion.Americas,
  MKD: EnumRegion.EMEA,
  MLI: EnumRegion.EMEA,
  MMR: EnumRegion.APAC,
  MNE: EnumRegion.EMEA,
  MNG: EnumRegion.APAC,
  MOZ: EnumRegion.EMEA,
  MRT: EnumRegion.EMEA,
  MWI: EnumRegion.EMEA,
  MYS: EnumRegion.APAC,
  NAM: EnumRegion.EMEA,
  NCL: EnumRegion.APAC,
  NER: EnumRegion.EMEA,
  NGA: EnumRegion.EMEA,
  NIC: EnumRegion.Americas,
  NLD: EnumRegion.EMEA,
  NOR: EnumRegion.EMEA,
  NPL: EnumRegion.APAC,
  NZL: EnumRegion.APAC,
  OMN: EnumRegion.EMEA,
  PAK: EnumRegion.APAC,
  PAN: EnumRegion.Americas,
  PER: EnumRegion.Americas,
  PHL: EnumRegion.APAC,
  PNG: EnumRegion.APAC,
  POL: EnumRegion.EMEA,
  PRI: EnumRegion.Americas,
  PRK: EnumRegion.APAC,
  PRT: EnumRegion.EMEA,
  PRY: EnumRegion.Americas,
  QAT: EnumRegion.EMEA,
  ROU: EnumRegion.EMEA,
  RUS: EnumRegion.APAC,
  RWA: EnumRegion.EMEA,
  ESH: EnumRegion.EMEA,
  SAU: EnumRegion.EMEA,
  SDN: EnumRegion.EMEA,
  SSD: EnumRegion.EMEA,
  SEN: EnumRegion.EMEA,
  SLB: EnumRegion.APAC,
  SLE: EnumRegion.EMEA,
  SLV: EnumRegion.Americas,
  SOM: EnumRegion.EMEA,
  SRB: EnumRegion.EMEA,
  SUR: EnumRegion.Americas,
  SVK: EnumRegion.EMEA,
  SVN: EnumRegion.EMEA,
  SWE: EnumRegion.EMEA,
  SWZ: EnumRegion.EMEA,
  SYR: EnumRegion.EMEA,
  TCD: EnumRegion.EMEA,
  TGO: EnumRegion.EMEA,
  THA: EnumRegion.APAC,
  TJK: EnumRegion.APAC,
  TKM: EnumRegion.APAC,
  TLS: EnumRegion.APAC,
  TTO: EnumRegion.Americas,
  TUN: EnumRegion.EMEA,
  TUR: EnumRegion.EMEA,
  TWN: EnumRegion.APAC,
  TZA: EnumRegion.EMEA,
  UGA: EnumRegion.EMEA,
  UKR: EnumRegion.EMEA,
  URY: EnumRegion.Americas,
  USA: EnumRegion.Americas,
  UZB: EnumRegion.APAC,
  VEN: EnumRegion.Americas,
  VNM: EnumRegion.APAC,
  VUT: EnumRegion.APAC,
  PSX: EnumRegion.EMEA,
  YEM: EnumRegion.EMEA,
  ZAF: EnumRegion.EMEA,
  ZMB: EnumRegion.EMEA,
  ZWE: EnumRegion.EMEA,
  CPV: EnumRegion.EMEA,
  COM: EnumRegion.EMEA,
  MUS: EnumRegion.EMEA,
  SYC: EnumRegion.EMEA,
  BHR: EnumRegion.EMEA,
  MDV: EnumRegion.APAC,
  MHL: EnumRegion.APAC,
  FSM: EnumRegion.APAC,
  NRU: EnumRegion.APAC,
  PLW: EnumRegion.APAC,
  WSM: EnumRegion.APAC,
  SGP: EnumRegion.APAC,
  TON: EnumRegion.APAC,
  TUV: EnumRegion.APAC,
  ATG: EnumRegion.Americas,
  BRB: EnumRegion.Americas,
  DMA: EnumRegion.Americas,
  GRD: EnumRegion.Americas,
  KNA: EnumRegion.Americas,
  LCA: EnumRegion.Americas,
  VCT: EnumRegion.Americas,
  AND: EnumRegion.EMEA,
  LIE: EnumRegion.EMEA,
  MLT: EnumRegion.EMEA,
  MCO: EnumRegion.EMEA,
  SMR: EnumRegion.EMEA,
  KIR: EnumRegion.APAC,
  STP: EnumRegion.EMEA,
  HKG: EnumRegion.APAC,
};

const CountryToSubRegionMap: Record<string, EnumSubRegion> = {
  AFG: EnumSubRegion.Asia,
  AGO: EnumSubRegion.Africa,
  ALB: EnumSubRegion.Europe,
  ARE: EnumSubRegion.MiddleEast,
  ARG: EnumSubRegion.SouthAmerica,
  ARM: EnumSubRegion.Europe,
  ATF: EnumSubRegion.Europe,
  AUS: EnumSubRegion.Oceania,
  AUT: EnumSubRegion.Europe,
  AZE: EnumSubRegion.MiddleEast,
  BDI: EnumSubRegion.Africa,
  BEL: EnumSubRegion.Europe,
  BEN: EnumSubRegion.Africa,
  BFA: EnumSubRegion.Africa,
  BGD: EnumSubRegion.Asia,
  BGR: EnumSubRegion.Europe,
  BHS: EnumSubRegion.NorthNCentralAmerica,
  BIH: EnumSubRegion.Europe,
  BLR: EnumSubRegion.Europe,
  BLZ: EnumSubRegion.NorthNCentralAmerica,
  BOL: EnumSubRegion.SouthAmerica,
  BRA: EnumSubRegion.SouthAmerica,
  BRN: EnumSubRegion.Asia,
  BTN: EnumSubRegion.Asia,
  BWA: EnumSubRegion.Africa,
  CAF: EnumSubRegion.Africa,
  CAN: EnumSubRegion.NorthNCentralAmerica,
  CHE: EnumSubRegion.Europe,
  CHL: EnumSubRegion.SouthAmerica,
  CHN: EnumSubRegion.Asia,
  CIV: EnumSubRegion.Africa,
  CMR: EnumSubRegion.Africa,
  COD: EnumSubRegion.Africa,
  COG: EnumSubRegion.Africa,
  COL: EnumSubRegion.SouthAmerica,
  CRI: EnumSubRegion.NorthNCentralAmerica,
  CUB: EnumSubRegion.NorthNCentralAmerica,
  CYP: EnumSubRegion.MiddleEast,
  CZE: EnumSubRegion.Europe,
  DEU: EnumSubRegion.Europe,
  DJI: EnumSubRegion.Africa,
  DNK: EnumSubRegion.Europe,
  GRL: EnumSubRegion.NorthNCentralAmerica,
  DOM: EnumSubRegion.NorthNCentralAmerica,
  DZA: EnumSubRegion.Africa,
  ECU: EnumSubRegion.SouthAmerica,
  EGY: EnumSubRegion.MiddleEast,
  ERI: EnumSubRegion.Africa,
  ESP: EnumSubRegion.Europe,
  EST: EnumSubRegion.Europe,
  ETH: EnumSubRegion.Africa,
  FIN: EnumSubRegion.Europe,
  FJI: EnumSubRegion.Oceania,
  FRA: EnumSubRegion.Europe,
  GUF: EnumSubRegion.SouthAmerica,
  GAB: EnumSubRegion.Africa,
  GBR: EnumSubRegion.Europe,
  GEO: EnumSubRegion.MiddleEast,
  GHA: EnumSubRegion.Africa,
  GIN: EnumSubRegion.Africa,
  GMB: EnumSubRegion.Africa,
  GNB: EnumSubRegion.Africa,
  GNQ: EnumSubRegion.Africa,
  GRC: EnumSubRegion.Europe,
  GTM: EnumSubRegion.NorthNCentralAmerica,
  GUY: EnumSubRegion.SouthAmerica,
  HND: EnumSubRegion.NorthNCentralAmerica,
  HRV: EnumSubRegion.Europe,
  HTI: EnumSubRegion.NorthNCentralAmerica,
  HUN: EnumSubRegion.Europe,
  IDN: EnumSubRegion.Asia,
  IND: EnumSubRegion.Asia,
  IRL: EnumSubRegion.Europe,
  IRN: EnumSubRegion.Asia,
  IRQ: EnumSubRegion.Asia,
  ISL: EnumSubRegion.Europe,
  ISR: EnumSubRegion.MiddleEast,
  ITA: EnumSubRegion.Europe,
  JAM: EnumSubRegion.NorthNCentralAmerica,
  JOR: EnumSubRegion.MiddleEast,
  JPN: EnumSubRegion.Asia,
  KAZ: EnumSubRegion.Asia,
  KEN: EnumSubRegion.Africa,
  KGZ: EnumSubRegion.Asia,
  KHM: EnumSubRegion.Asia,
  KOR: EnumSubRegion.Asia,
  XXK: EnumSubRegion.Europe,
  KWT: EnumSubRegion.MiddleEast,
  LAO: EnumSubRegion.Asia,
  LBN: EnumSubRegion.MiddleEast,
  LBR: EnumSubRegion.Africa,
  LBY: EnumSubRegion.Africa,
  LKA: EnumSubRegion.Asia,
  LSO: EnumSubRegion.Africa,
  LTU: EnumSubRegion.Europe,
  LUX: EnumSubRegion.Europe,
  LVA: EnumSubRegion.Europe,
  MAR: EnumSubRegion.Africa,
  MDA: EnumSubRegion.Europe,
  MDG: EnumSubRegion.Africa,
  MEX: EnumSubRegion.NorthNCentralAmerica,
  MKD: EnumSubRegion.Europe,
  MLI: EnumSubRegion.Africa,
  MMR: EnumSubRegion.Asia,
  MNE: EnumSubRegion.Europe,
  MNG: EnumSubRegion.Asia,
  MOZ: EnumSubRegion.Africa,
  MRT: EnumSubRegion.Africa,
  MWI: EnumSubRegion.Africa,
  MYS: EnumSubRegion.Asia,
  NAM: EnumSubRegion.Africa,
  NCL: EnumSubRegion.Oceania,
  NER: EnumSubRegion.Africa,
  NGA: EnumSubRegion.Africa,
  NIC: EnumSubRegion.NorthNCentralAmerica,
  NLD: EnumSubRegion.Europe,
  NOR: EnumSubRegion.Europe,
  NPL: EnumSubRegion.Asia,
  NZL: EnumSubRegion.Oceania,
  OMN: EnumSubRegion.MiddleEast,
  PAK: EnumSubRegion.Asia,
  PAN: EnumSubRegion.NorthNCentralAmerica,
  PER: EnumSubRegion.SouthAmerica,
  PHL: EnumSubRegion.Asia,
  PNG: EnumSubRegion.Oceania,
  POL: EnumSubRegion.Europe,
  PRI: EnumSubRegion.NorthNCentralAmerica,
  PRK: EnumSubRegion.Asia,
  PRT: EnumSubRegion.Europe,
  PRY: EnumSubRegion.SouthAmerica,
  QAT: EnumSubRegion.MiddleEast,
  ROU: EnumSubRegion.Europe,
  RUS: EnumSubRegion.Asia,
  RWA: EnumSubRegion.Africa,
  ESH: EnumSubRegion.Africa,
  SAU: EnumSubRegion.MiddleEast,
  SDN: EnumSubRegion.Africa,
  SSD: EnumSubRegion.Africa,
  SEN: EnumSubRegion.Africa,
  SLB: EnumSubRegion.Oceania,
  SLE: EnumSubRegion.Africa,
  SLV: EnumSubRegion.NorthNCentralAmerica,
  SOM: EnumSubRegion.Africa,
  SRB: EnumSubRegion.Europe,
  SUR: EnumSubRegion.SouthAmerica,
  SVK: EnumSubRegion.Europe,
  SVN: EnumSubRegion.Europe,
  SWE: EnumSubRegion.Europe,
  SWZ: EnumSubRegion.Africa,
  SYR: EnumSubRegion.MiddleEast,
  TCD: EnumSubRegion.Africa,
  TGO: EnumSubRegion.Africa,
  THA: EnumSubRegion.Asia,
  TJK: EnumSubRegion.Asia,
  TKM: EnumSubRegion.Asia,
  TLS: EnumSubRegion.Asia,
  TTO: EnumSubRegion.NorthNCentralAmerica,
  TUN: EnumSubRegion.Africa,
  TUR: EnumSubRegion.Europe,
  TWN: EnumSubRegion.Asia,
  TZA: EnumSubRegion.Africa,
  UGA: EnumSubRegion.Africa,
  UKR: EnumSubRegion.Europe,
  URY: EnumSubRegion.SouthAmerica,
  USA: EnumSubRegion.NorthNCentralAmerica,
  UZB: EnumSubRegion.Asia,
  VEN: EnumSubRegion.SouthAmerica,
  VNM: EnumSubRegion.Asia,
  VUT: EnumSubRegion.Oceania,
  PSX: EnumSubRegion.MiddleEast,
  YEM: EnumSubRegion.MiddleEast,
  ZAF: EnumSubRegion.Africa,
  ZMB: EnumSubRegion.Africa,
  ZWE: EnumSubRegion.Africa,
  CPV: EnumSubRegion.Africa,
  COM: EnumSubRegion.Africa,
  MUS: EnumSubRegion.Africa,
  SYC: EnumSubRegion.Africa,
  BHR: EnumSubRegion.MiddleEast,
  MDV: EnumSubRegion.Asia,
  MHL: EnumSubRegion.Oceania,
  FSM: EnumSubRegion.Oceania,
  NRU: EnumSubRegion.Oceania,
  PLW: EnumSubRegion.Oceania,
  WSM: EnumSubRegion.Oceania,
  SGP: EnumSubRegion.Asia,
  TON: EnumSubRegion.Oceania,
  TUV: EnumSubRegion.Oceania,
  ATG: EnumSubRegion.NorthNCentralAmerica,
  BRB: EnumSubRegion.NorthNCentralAmerica,
  DMA: EnumSubRegion.NorthNCentralAmerica,
  GRD: EnumSubRegion.NorthNCentralAmerica,
  KNA: EnumSubRegion.NorthNCentralAmerica,
  LCA: EnumSubRegion.NorthNCentralAmerica,
  VCT: EnumSubRegion.NorthNCentralAmerica,
  AND: EnumSubRegion.Europe,
  LIE: EnumSubRegion.Europe,
  MLT: EnumSubRegion.Europe,
  MCO: EnumSubRegion.Europe,
  SMR: EnumSubRegion.Europe,
  KIR: EnumSubRegion.Oceania,
  STP: EnumSubRegion.Africa,
  HKG: EnumSubRegion.Asia,
};

const CountryToTwoLetterCodeMap: Record<string, string> = {
  AFG: "AG",
  AGO: "AO",
  ALB: "AL",
  ARE: "AE",
  ARG: "AR",
  ARM: "AM",
  ATF: "TF",
  AUS: "AU",
  AUT: "AT",
  AZE: "AZ",
  BDI: "BI",
  BEL: "BE",
  BEN: "BJ",
  BFA: "BF",
  BGD: "BD",
  BGR: "BG",
  BHS: "BS",
  BIH: "BA",
  BLR: "BY",
  BLZ: "BZ",
  BOL: "BO",
  BRA: "BR",
  BRN: "BN",
  BTN: "BT",
  BWA: "BW",
  CAF: "CF",
  CAN: "CA",
  CHE: "CH",
  CHL: "CL",
  CHN: "CN",
  CIV: "CI",
  CMR: "CM",
  COD: "CD",
  COG: "CG",
  COL: "CO",
  CRI: "CR",
  CUB: "CU",
  CYP: "CY",
  CZE: "CZ",
  DEU: "DE",
  DJI: "DJ",
  DNK: "DK",
  GRL: "GL",
  DOM: "DO",
  DZA: "DZ",
  ECU: "EC",
  EGY: "EG",
  ERI: "ER",
  ESP: "ES",
  EST: "EE",
  ETH: "ET",
  FIN: "FI",
  FJI: "FJ",
  FRA: "FR",
  GUF: "GF",
  GAB: "GA",
  GBR: "GB",
  GEO: "GE",
  GHA: "GH",
  GIN: "GN",
  GMB: "GM",
  GNB: "GW",
  GNQ: "GQ",
  GRC: "GR",
  GTM: "GT",
  GUY: "GY",
  HND: "HN",
  HRV: "HR",
  HTI: "HT",
  HUN: "HU",
  IDN: "ID",
  IND: "IN",
  IRL: "IE",
  IRN: "IR",
  IRQ: "IQ",
  ISL: "IS",
  ISR: "IL",
  ITA: "IT",
  JAM: "JM",
  JOR: "JO",
  JPN: "JP",
  KAZ: "KZ",
  KEN: "KE",
  KGZ: "KG",
  KHM: "KH",
  KOR: "KR",
  XXK: "XK",
  KWT: "KW",
  LAO: "LA",
  LBN: "LB",
  LBR: "LR",
  LBY: "LY",
  LKA: "LK",
  LSO: "LS",
  LTU: "LT",
  LUX: "LU",
  LVA: "LV",
  MAR: "MA",
  MDA: "MD",
  MDG: "MG",
  MEX: "MX",
  MKD: "MK",
  MLI: "ML",
  MMR: "MM",
  MNE: "ME",
  MNG: "MN",
  MOZ: "MZ",
  MRT: "MR",
  MWI: "MW",
  MYS: "MY",
  NAM: "NA",
  NCL: "NC",
  NER: "NE",
  NGA: "NG",
  NIC: "NI",
  NLD: "NL",
  NOR: "NO",
  NPL: "NP",
  NZL: "NZ",
  OMN: "OM",
  PAK: "PK",
  PAN: "PA",
  PER: "PE",
  PHL: "PH",
  PNG: "PG",
  POL: "PL",
  PRI: "PR",
  PRK: "KP",
  PRT: "PT",
  PRY: "PY",
  QAT: "QA",
  ROU: "RO",
  RUS: "RU",
  RWA: "RW",
  ESH: "EH",
  SAU: "SA",
  SDN: "SD",
  SSD: "SS",
  SEN: "SN",
  SLB: "SB",
  SLE: "SL",
  SLV: "SV",
  SOM: "SO",
  SRB: "RS",
  SUR: "SR",
  SVK: "SK",
  SVN: "SI",
  SWE: "SE",
  SWZ: "SZ",
  SYR: "SY",
  TCD: "TD",
  TGO: "TG",
  THA: "TH",
  TJK: "TJ",
  TKM: "TM",
  TLS: "TL",
  TTO: "TT",
  TUN: "TN",
  TUR: "TR",
  TWN: "TW",
  TZA: "TZ",
  UGA: "UG",
  UKR: "UA",
  URY: "UY",
  USA: "US",
  UZB: "UZ",
  VEN: "VE",
  VNM: "VN",
  VUT: "VU",
  PSX: "PS",
  YEM: "YE",
  ZAF: "ZA",
  ZMB: "ZM",
  ZWE: "ZW",
  CPV: "CV",
  CUW: "CW",
  MAF: "MF",
  SPM: "PM",
  SXM: "SX",
};

const TwoLetterCodeToCountryCodeMap: Record<string, string> = {
  AG: "AFG",
  AO: "AGO",
  AL: "ALB",
  AE: "ARE",
  AR: "ARG",
  AM: "ARM",
  TF: "ATF",
  AU: "AUS",
  AT: "AUT",
  AZ: "AZE",
  BI: "BDI",
  BE: "BEL",
  BJ: "BEN",
  BF: "BFA",
  BD: "BGD",
  BG: "BGR",
  BS: "BHS",
  BA: "BIH",
  BY: "BLR",
  BZ: "BLZ",
  BO: "BOL",
  BR: "BRA",
  BN: "BRN",
  BT: "BTN",
  BW: "BWA",
  CF: "CAF",
  CA: "CAN",
  CH: "CHE",
  CL: "CHL",
  CN: "CHN",
  CI: "CIV",
  CM: "CMR",
  CD: "COD",
  CG: "COG",
  CO: "COL",
  CR: "CRI",
  CU: "CUB",
  CY: "CYP",
  CZ: "CZE",
  DE: "DEU",
  DJ: "DJI",
  DK: "DNK",
  GL: "GRL",
  DO: "DOM",
  DZ: "DZA",
  EC: "ECU",
  EG: "EGY",
  ER: "ERI",
  ES: "ESP",
  EE: "EST",
  ET: "ETH",
  FI: "FIN",
  FJ: "FJI",
  FR: "FRA",
  GF: "GUF",
  GA: "GAB",
  GB: "GBR",
  GE: "GEO",
  GH: "GHA",
  GN: "GIN",
  GM: "GMB",
  GW: "GNB",
  GQ: "GNQ",
  GR: "GRC",
  GT: "GTM",
  GY: "GUY",
  HN: "HND",
  HR: "HRV",
  HT: "HTI",
  HU: "HUN",
  ID: "IDN",
  IN: "IND",
  IE: "IRL",
  IR: "IRN",
  IQ: "IRQ",
  IS: "ISL",
  IL: "ISR",
  IT: "ITA",
  JM: "JAM",
  JO: "JOR",
  JP: "JPN",
  KZ: "KAZ",
  KE: "KEN",
  KG: "KGZ",
  KH: "KHM",
  KR: "KOR",
  XK: "XXK",
  KW: "KWT",
  LA: "LAO",
  LB: "LBN",
  LR: "LBR",
  LY: "LBY",
  LK: "LKA",
  LS: "LSO",
  LT: "LTU",
  LU: "LUX",
  LV: "LVA",
  MA: "MAR",
  MD: "MDA",
  MG: "MDG",
  MX: "MEX",
  MK: "MKD",
  ML: "MLI",
  MM: "MMR",
  ME: "MNE",
  MN: "MNG",
  MZ: "MOZ",
  MR: "MRT",
  MW: "MWI",
  MY: "MYS",
  NA: "NAM",
  NC: "NCL",
  NE: "NER",
  NG: "NGA",
  NI: "NIC",
  NL: "NLD",
  NO: "NOR",
  NP: "NPL",
  NZ: "NZL",
  OM: "OMN",
  PK: "PAK",
  PA: "PAN",
  PE: "PER",
  PH: "PHL",
  PG: "PNG",
  PL: "POL",
  PR: "PRI",
  KP: "PRK",
  PT: "PRT",
  PY: "PRY",
  QA: "QAT",
  RO: "ROU",
  RU: "RUS",
  RW: "RWA",
  EH: "ESH",
  SA: "SAU",
  SD: "SDN",
  SS: "SSD",
  SN: "SEN",
  SB: "SLB",
  SL: "SLE",
  SV: "SLV",
  SO: "SOM",
  RS: "SRB",
  SR: "SUR",
  SK: "SVK",
  SI: "SVN",
  SE: "SWE",
  SZ: "SWZ",
  SY: "SYR",
  TD: "TCD",
  TG: "TGO",
  TH: "THA",
  TJ: "TJK",
  TM: "TKM",
  TL: "TLS",
  TT: "TTO",
  TN: "TUN",
  TR: "TUR",
  TW: "TWN",
  TZ: "TZA",
  UG: "UGA",
  UA: "UKR",
  UY: "URY",
  US: "USA",
  UZ: "UZB",
  VE: "VEN",
  VN: "VNM",
  VU: "VUT",
  PS: "PSX",
  YE: "YEM",
  ZA: "ZAF",
  ZM: "ZMB",
  ZW: "ZWE",
  CV: "CPV",
  CW: "CUW",
  MF: "MAF",
  PM: "SPM",
  SX: "SXM",
  HK: "HKG",
  SG: "SGP",
  LI: "LIE",
  MT: "MLT",
  MC: "MCO",
  /// Then this is a hack
  BIH: "BIH",
  FIN: "FIN",
  NMK: "MKD",
  EST: "EST",
};

const TwoLetterCodeToCounryCoordinatesMap: Record<
  string,
  {
    latitude: number;
    longitude: number;
  }
> = {
  AD: { longitude: 1.601554, latitude: 42.546245 },
  AE: { longitude: 53.847818, latitude: 23.424076 },
  AF: { longitude: 67.709953, latitude: 33.93911 },
  AG: { longitude: -61.796428, latitude: 17.060816 },
  AI: { longitude: -63.068615, latitude: 18.220554 },
  AL: { longitude: 20.168331, latitude: 41.153332 },
  AM: { longitude: 45.038189, latitude: 40.069099 },
  AN: { longitude: -69.060087, latitude: 12.226079 },
  AO: { longitude: 17.873887, latitude: -11.202692 },
  AQ: { longitude: -0.071389, latitude: -75.250973 },
  AR: { longitude: -63.616672, latitude: -38.416097 },
  AS: { longitude: -170.132217, latitude: -14.270972 },
  AT: { longitude: 14.550072, latitude: 47.516231 },
  AU: { longitude: 133.775136, latitude: -25.274398 },
  AW: { longitude: -69.968338, latitude: 12.52111 },
  AZ: { longitude: 47.576927, latitude: 40.143105 },
  BA: { longitude: 17.679076, latitude: 43.915886 },
  BB: { longitude: -59.543198, latitude: 13.193887 },
  BD: { longitude: 90.356331, latitude: 23.684994 },
  BE: { longitude: 4.469936, latitude: 50.503887 },
  BF: { longitude: -1.561593, latitude: 12.238333 },
  BG: { longitude: 25.48583, latitude: 42.733883 },
  BH: { longitude: 50.637772, latitude: 25.930414 },
  BI: { longitude: 29.918886, latitude: -3.373056 },
  BJ: { longitude: 2.315834, latitude: 9.30769 },
  BM: { longitude: -64.75737, latitude: 32.321384 },
  BN: { longitude: 114.727669, latitude: 4.535277 },
  BO: { longitude: -63.588653, latitude: -16.290154 },
  BR: { longitude: -51.92528, latitude: -14.235004 },
  BS: { longitude: -77.39628, latitude: 25.03428 },
  BT: { longitude: 90.433601, latitude: 27.514162 },
  BV: { longitude: 3.413194, latitude: -54.423199 },
  BW: { longitude: 24.684866, latitude: -22.328474 },
  BY: { longitude: 27.953389, latitude: 53.709807 },
  BZ: { longitude: -88.49765, latitude: 17.189877 },
  CA: { longitude: -106.346771, latitude: 56.130366 },
  CC: { longitude: 96.870956, latitude: -12.164165 },
  CD: { longitude: 21.758664, latitude: -4.038333 },
  CF: { longitude: 20.939444, latitude: 6.611111 },
  CG: { longitude: 15.827659, latitude: -0.228021 },
  CH: { longitude: 8.227512, latitude: 46.818188 },
  CI: { longitude: -5.54708, latitude: 7.539989 },
  CK: { longitude: -159.777671, latitude: -21.236736 },
  CL: { longitude: -71.542969, latitude: -35.675147 },
  CM: { longitude: 12.354722, latitude: 7.369722 },
  CN: { longitude: 104.195397, latitude: 35.86166 },
  CO: { longitude: -74.297333, latitude: 4.570868 },
  CR: { longitude: -83.753428, latitude: 9.748917 },
  CU: { longitude: -77.781167, latitude: 21.521757 },
  CV: { longitude: -24.013197, latitude: 16.002082 },
  CX: { longitude: 105.690449, latitude: -10.447525 },
  CY: { longitude: 33.429859, latitude: 35.126413 },
  CZ: { longitude: 15.472962, latitude: 49.817492 },
  DE: { longitude: 10.451526, latitude: 51.165691 },
  DJ: { longitude: 42.590275, latitude: 11.825138 },
  DK: { longitude: 9.501785, latitude: 56.26392 },
  DM: { longitude: -61.370976, latitude: 15.414999 },
  DO: { longitude: -70.162651, latitude: 18.735693 },
  DZ: { longitude: 1.659626, latitude: 28.033886 },
  EC: { longitude: -78.183406, latitude: -1.831239 },
  EE: { longitude: 25.013607, latitude: 58.595272 },
  EG: { longitude: 30.802498, latitude: 26.820553 },
  EH: { longitude: -12.885834, latitude: 24.215527 },
  ER: { longitude: 39.782334, latitude: 15.179384 },
  ES: { longitude: -3.74922, latitude: 40.463667 },
  ET: { longitude: 40.489673, latitude: 9.145 },
  FI: { longitude: 25.748151, latitude: 61.92411 },
  FIN: { longitude: 25.748151, latitude: 61.92411 }, // outlier FIN
  FJ: { longitude: 179.414413, latitude: -16.578193 },
  FK: { longitude: -59.523613, latitude: -51.796253 },
  FM: { longitude: 150.550812, latitude: 7.425554 },
  FO: { longitude: -6.911806, latitude: 61.892635 },
  FR: { longitude: 2.213749, latitude: 46.227638 },
  GA: { longitude: 11.609444, latitude: -0.803689 },
  GB: { longitude: -3.435973, latitude: 55.378051 },
  GD: { longitude: -61.604171, latitude: 12.262776 },
  GE: { longitude: 43.356892, latitude: 42.315407 },
  GF: { longitude: -53.125782, latitude: 3.933889 },
  GG: { longitude: -2.585278, latitude: 49.465691 },
  GH: { longitude: -1.023194, latitude: 7.946527 },
  GI: { longitude: -5.345374, latitude: 36.137741 },
  GL: { longitude: -42.604303, latitude: 71.706936 },
  GM: { longitude: -15.310139, latitude: 13.443182 },
  GN: { longitude: -9.696645, latitude: 9.945587 },
  GP: { longitude: -62.067641, latitude: 16.995971 },
  GQ: { longitude: 10.267895, latitude: 1.650801 },
  GR: { longitude: 21.824312, latitude: 39.074208 },
  GS: { longitude: -36.587909, latitude: -54.429579 },
  GT: { longitude: -90.230759, latitude: 15.783471 },
  GU: { longitude: 144.793731, latitude: 13.444304 },
  GW: { longitude: -15.180413, latitude: 11.803749 },
  GY: { longitude: -58.93018, latitude: 4.860416 },
  GZ: { longitude: 34.308825, latitude: 31.354676 },
  HK: { longitude: 114.109497, latitude: 22.396428 },
  HM: { longitude: 73.504158, latitude: -53.08181 },
  HN: { longitude: -86.241905, latitude: 15.199999 },
  HR: { longitude: 15.2, latitude: 45.1 },
  HT: { longitude: -72.285215, latitude: 18.971187 },
  HU: { longitude: 19.503304, latitude: 47.162494 },
  ID: { longitude: 113.921327, latitude: -0.789275 },
  IE: { longitude: -8.24389, latitude: 53.41291 },
  IL: { longitude: 34.851612, latitude: 31.046051 },
  IM: { longitude: -4.548056, latitude: 54.236107 },
  IN: { longitude: 78.96288, latitude: 20.593684 },
  IO: { longitude: 71.876519, latitude: -6.343194 },
  IQ: { longitude: 43.679291, latitude: 33.223191 },
  IR: { longitude: 53.688046, latitude: 32.427908 },
  IS: { longitude: -19.020835, latitude: 64.963051 },
  IT: { longitude: 12.56738, latitude: 41.87194 },
  JE: { longitude: -2.13125, latitude: 49.214439 },
  JM: { longitude: -77.297508, latitude: 18.109581 },
  JO: { longitude: 36.238414, latitude: 30.585164 },
  JP: { longitude: 138.252924, latitude: 36.204824 },
  KE: { longitude: 37.906193, latitude: -0.023559 },
  KG: { longitude: 74.766098, latitude: 41.20438 },
  KH: { longitude: 104.990963, latitude: 12.565679 },
  KI: { longitude: -168.734039, latitude: -3.370417 },
  KM: { longitude: 43.872219, latitude: -11.875001 },
  KN: { longitude: -62.782998, latitude: 17.357822 },
  KP: { longitude: 127.510093, latitude: 40.339852 },
  KR: { longitude: 127.766922, latitude: 35.907757 },
  KW: { longitude: 47.481766, latitude: 29.31166 },
  KY: { longitude: -80.566956, latitude: 19.513469 },
  KZ: { longitude: 66.923684, latitude: 48.019573 },
  LA: { longitude: 102.495496, latitude: 19.85627 },
  LB: { longitude: 35.862285, latitude: 33.854721 },
  LC: { longitude: -60.978893, latitude: 13.909444 },
  LI: { longitude: 9.555373, latitude: 47.166 },
  LK: { longitude: 80.771797, latitude: 7.873054 },
  LR: { longitude: -9.429499, latitude: 6.428055 },
  LS: { longitude: 28.233608, latitude: -29.609988 },
  LT: { longitude: 23.881275, latitude: 55.169438 },
  LU: { longitude: 6.129583, latitude: 49.815273 },
  LV: { longitude: 24.603189, latitude: 56.879635 },
  LY: { longitude: 17.228331, latitude: 26.3351 },
  MA: { longitude: -7.09262, latitude: 31.791702 },
  MC: { longitude: 7.412841, latitude: 43.750298 },
  MD: { longitude: 28.369885, latitude: 47.411631 },
  ME: { longitude: 19.37439, latitude: 42.708678 },
  MG: { longitude: 46.869107, latitude: -18.766947 },
  MH: { longitude: 171.184478, latitude: 7.131474 },
  MK: { longitude: 21.745275, latitude: 41.608635 },
  NMK: { longitude: 21.745275, latitude: 41.608635 }, // outlier NMK = MK
  ML: { longitude: -3.996166, latitude: 17.570692 },
  MM: { longitude: 95.956223, latitude: 21.913965 },
  MN: { longitude: 103.846656, latitude: 46.862496 },
  MO: { longitude: 113.543873, latitude: 22.198745 },
  MP: { longitude: 145.38469, latitude: 17.33083 },
  MQ: { longitude: -61.024174, latitude: 14.641528 },
  MR: { longitude: -10.940835, latitude: 21.00789 },
  MS: { longitude: -62.187366, latitude: 16.742498 },
  MT: { longitude: 14.375416, latitude: 35.937496 },
  MU: { longitude: 57.552152, latitude: -20.348404 },
  MV: { longitude: 73.22068, latitude: 3.202778 },
  MW: { longitude: 34.301525, latitude: -13.254308 },
  MX: { longitude: -102.552784, latitude: 23.634501 },
  MY: { longitude: 101.975766, latitude: 4.210484 },
  MZ: { longitude: 35.529562, latitude: -18.665695 },
  NC: { longitude: 165.618042, latitude: -20.904305 },
  NE: { longitude: 8.081666, latitude: 17.607789 },
  NF: { longitude: 167.954712, latitude: -29.040835 },
  NG: { longitude: 8.675277, latitude: 9.081999 },
  NI: { longitude: -85.207229, latitude: 12.865416 },
  NL: { longitude: 5.291266, latitude: 52.132633 },
  NO: { longitude: 8.468946, latitude: 60.472024 },
  NP: { longitude: 84.124008, latitude: 28.394857 },
  NR: { longitude: 166.931503, latitude: -0.522778 },
  NU: { longitude: -169.867233, latitude: -19.054445 },
  NZ: { longitude: 174.885971, latitude: -40.900557 },
  OM: { longitude: 55.923255, latitude: 21.512583 },
  PA: { longitude: -80.782127, latitude: 8.537981 },
  PE: { longitude: -75.015152, latitude: -9.189967 },
  PF: { longitude: -149.406843, latitude: -17.679742 },
  PG: { longitude: 143.95555, latitude: -6.314993 },
  PH: { longitude: 121.774017, latitude: 12.879721 },
  PK: { longitude: 69.345116, latitude: 30.375321 },
  PL: { longitude: 19.145136, latitude: 51.919438 },
  PM: { longitude: -56.27111, latitude: 46.941936 },
  PN: { longitude: -127.439308, latitude: -24.703615 },
  PR: { longitude: -66.590149, latitude: 18.220833 },
  PS: { longitude: 35.233154, latitude: 31.952162 },
  PT: { longitude: -8.224454, latitude: 39.399872 },
  PW: { longitude: 134.58252, latitude: 7.51498 },
  PY: { longitude: -58.443832, latitude: -23.442503 },
  QA: { longitude: 51.183884, latitude: 25.354826 },
  RE: { longitude: 55.536384, latitude: -21.115141 },
  RO: { longitude: 24.96676, latitude: 45.943161 },
  RS: { longitude: 21.005859, latitude: 44.016521 },
  RU: { longitude: 105.318756, latitude: 61.52401 },
  RW: { longitude: 29.873888, latitude: -1.940278 },
  SA: { longitude: 45.079162, latitude: 23.885942 },
  SB: { longitude: 160.156194, latitude: -9.64571 },
  SC: { longitude: 55.491977, latitude: -4.679574 },
  SD: { longitude: 30.217636, latitude: 12.862807 },
  SE: { longitude: 18.643501, latitude: 60.128161 },
  SG: { longitude: 103.819836, latitude: 1.352083 },
  SH: { longitude: -10.030696, latitude: -24.143474 },
  SI: { longitude: 14.995463, latitude: 46.151241 },
  SJ: { longitude: 23.670272, latitude: 77.553604 },
  SK: { longitude: 19.699024, latitude: 48.669026 },
  SL: { longitude: -11.779889, latitude: 8.460555 },
  SM: { longitude: 12.457777, latitude: 43.94236 },
  SN: { longitude: -14.452362, latitude: 14.497401 },
  SO: { longitude: 46.199616, latitude: 5.152149 },
  SR: { longitude: -56.027783, latitude: 3.919305 },
  ST: { longitude: 6.613081, latitude: 0.18636 },
  SV: { longitude: -88.89653, latitude: 13.794185 },
  SY: { longitude: 38.996815, latitude: 34.802075 },
  SZ: { longitude: 31.465866, latitude: -26.522503 },
  TC: { longitude: -71.797928, latitude: 21.694025 },
  TD: { longitude: 18.732207, latitude: 15.454166 },
  TF: { longitude: 69.348557, latitude: -49.280366 },
  TG: { longitude: 0.824782, latitude: 8.619543 },
  TH: { longitude: 100.992541, latitude: 15.870032 },
  TJ: { longitude: 71.276093, latitude: 38.861034 },
  TK: { longitude: -171.855881, latitude: -8.967363 },
  TL: { longitude: 125.727539, latitude: -8.874217 },
  TM: { longitude: 59.556278, latitude: 38.969719 },
  TN: { longitude: 9.537499, latitude: 33.886917 },
  TO: { longitude: -175.198242, latitude: -21.178986 },
  TR: { longitude: 35.243322, latitude: 38.963745 },
  TT: { longitude: -61.222503, latitude: 10.691803 },
  TV: { longitude: 177.64933, latitude: -7.109535 },
  TW: { longitude: 120.960515, latitude: 23.69781 },
  TZ: { longitude: 34.888822, latitude: -6.369028 },
  UA: { longitude: 31.16558, latitude: 48.379433 },
  UG: { longitude: 32.290275, latitude: 1.373333 },
  US: { longitude: -95.712891, latitude: 37.09024 },
  UY: { longitude: -55.765835, latitude: -32.522779 },
  UZ: { longitude: 64.585262, latitude: 41.377491 },
  VA: { longitude: 12.453389, latitude: 41.902916 },
  VC: { longitude: -61.287228, latitude: 12.984305 },
  VE: { longitude: -66.58973, latitude: 6.42375 },
  VG: { longitude: -64.639968, latitude: 18.420695 },
  VI: { longitude: -64.896335, latitude: 18.335765 },
  VN: { longitude: 108.277199, latitude: 14.058324 },
  VU: { longitude: 166.959158, latitude: -15.376706 },
  WF: { longitude: -177.156097, latitude: -13.768752 },
  WS: { longitude: -172.104629, latitude: -13.759029 },
  XK: { longitude: 20.902977, latitude: 42.602636 },
  YE: { longitude: 48.516388, latitude: 15.552727 },
  YT: { longitude: 45.166244, latitude: -12.8275 },
  ZA: { longitude: 22.937506, latitude: -30.559482 },
  ZM: { longitude: 27.849332, latitude: -13.133897 },
  ZW: { longitude: 29.154857, latitude: -19.015438 },
};

export {
  CountryToRegionMap,
  CountryToSubRegionMap,
  CountryToTwoLetterCodeMap,
  TwoLetterCodeToCountryCodeMap,
  TwoLetterCodeToCounryCoordinatesMap,
};
