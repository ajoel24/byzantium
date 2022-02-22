/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@byzantium/graphql-client']);

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM({
  nextConfig,
});
