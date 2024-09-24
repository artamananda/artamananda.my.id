/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
    BASE_API_URL: process.env.BASE_API_URL,
    STORAGE_URL: process.env.STORAGE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.STORAGE_URL.split("/")[
            process.env.STORAGE_URL.split("/").length - 2
          ],
        port: "",
        pathname: `/${process.env.STORAGE_URL.split("/").pop()}/**`,
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: `admin.${process.env.APP_URL}`,
          },
        ],
        destination: "/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
