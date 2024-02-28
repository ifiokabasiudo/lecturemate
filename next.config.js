/** @type {import('next').NextConfig} */
// const nextConfig = {}

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    webpack: (config) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        config.externals.push({
            sharp: "commonjs sharp",
            canvas: "commonjs canvas",
        });
        return config;
    },
};
    

module.exports = nextConfig
