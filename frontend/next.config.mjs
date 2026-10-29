const mediaHost = new URL(process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://mobilemalldarbhanga.com");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: mediaHost.protocol.replace(":", ""), hostname: mediaHost.hostname }],
  },
};

export default nextConfig;
