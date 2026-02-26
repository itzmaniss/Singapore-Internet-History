/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactCompiler: true,
  images: {
    remotePatterns: [
        { hostname: "upload.wikimedia.org" },
    ],
},
};

export default nextConfig;
