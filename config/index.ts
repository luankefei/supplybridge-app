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

export { API_URL, ENV, VERSION };
