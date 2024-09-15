/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
    BASE_API_URL: process.env.BASE_API_URL,
  },
};

export default nextConfig;
