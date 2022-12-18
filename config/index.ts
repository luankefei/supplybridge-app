import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const API_URL: string | undefined = publicRuntimeConfig.NEXT_PUBLIC_API_URL
export {
  API_URL,
};
