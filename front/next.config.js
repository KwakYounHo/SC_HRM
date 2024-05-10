/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lnoclojxtunpfsxtepwf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/ST_HRM/**",
      },
    ],
  },
};

module.exports = nextConfig;
