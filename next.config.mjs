/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};
module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default nextConfig;
