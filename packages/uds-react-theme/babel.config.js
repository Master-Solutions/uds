module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react'
  ],
  plugins: [
    //'@babel/plugin-proposal-export-default-from',
    //'@babel/plugin-proposal-export-namespace-from',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
