/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/channels/me",
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      "avatars.githubusercontent.com",
      "i.pravatar.cc",
      "picsum.photos",
    ].map((hostname) => ({ protocol: "https", hostname })),
  },
};

module.exports = nextConfig;
