export default {
  npmClient: 'yarn',
  exportStatic:{
    htmlSuffix: true,
  },
  cssMinifier: 'esbuild',
  cssMinifierOptions: {
    minifyWhitespace: true,
    minifySyntax: true,
  },
  dynamicImport: {},
};
