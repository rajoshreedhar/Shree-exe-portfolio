import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const phaserArcadeMin = path.resolve(
        process.cwd(),
        "node_modules/phaser/dist/phaser-arcade-physics.min.js"
      );

      config.resolve = config.resolve ?? {};
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        // Use Phaser's official pre-minified Arcade-Physics UMD bundle (1.26 MB vs 8.8 MB)
        // and skip Webpack AST parsing so Adventure Mode compiles & boots almost instantly.
        phaser$: phaserArcadeMin,
      };

      config.module = config.module ?? {};
      const existingNoParse = config.module.noParse;
      const phaserNoParse = /phaser-arcade-physics\.min\.js$/;
      if (Array.isArray(existingNoParse)) {
        config.module.noParse = [...existingNoParse, phaserNoParse];
      } else if (existingNoParse) {
        config.module.noParse = [existingNoParse, phaserNoParse];
      } else {
        config.module.noParse = phaserNoParse;
      }
    }
    return config;
  },
};

export default nextConfig;
