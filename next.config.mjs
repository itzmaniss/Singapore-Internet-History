/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
        { hostname: "upload.wikimedia.org" },
    ],
},
};

export default nextConfig;
