import axios, { AxiosRequestConfig } from "axios";
import { CDS_API_URL, CDS_API_KEY } from "config";

/**
 * Common-Data-Service request
 *
 * Some of the endpoints:
 * /data/materialPrices
 * /data/news
 * /data/news_gpt_processed
 *
 */
export const cdsRequest = axios.create({
  baseURL: CDS_API_URL,
  timeout: 60000,
});

cdsRequest.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  requestConfig.headers = {
    ...requestConfig.headers,
    "x-api-key": CDS_API_KEY,
  };
  return requestConfig;
});
