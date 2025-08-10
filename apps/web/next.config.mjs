/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cyberidle/game-core', '@cyberidle/content'],
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        resourceQuery: /url/,
        type: 'asset/resource',
      }
    );
    return config;
  },
};

export default nextConfig;
