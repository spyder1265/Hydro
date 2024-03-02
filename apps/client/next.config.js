/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "flowbite.s3.amazonaws.com" },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "wallpaperaccess.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "source.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
