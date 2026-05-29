module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@features': './features',
            '@shared': './shared',
            '@lib': './lib',
            '@store': './store',
            '@constants': './constants',
            '@translations': './translations',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
