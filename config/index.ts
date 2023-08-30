const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
const _ENV_DEF = process.env.NEXT_PUBLIC_ENV || "development";
const VERSION = process.env.NEXT_PUBLIC_VERSION || "no-version";

export enum EnumENVIRONMENT {
  development = "development",
  production = "production",
}

let ENV: EnumENVIRONMENT;
switch (_ENV_DEF) {
  case "production":
    ENV = EnumENVIRONMENT.production;
    break;
  case "dev":
  case "development":
  default:
    ENV = EnumENVIRONMENT.development;
    break;
}
const CDS_API_URL = process.env.NEXT_PUBLIC_CDS_API_URL;
const CDS_API_KEY = process.env.NEXT_PUBLIC_CDS_API_KEY;

export { API_URL, ENV, VERSION, CDS_API_URL, CDS_API_KEY };
