import { defineConfig } from 'umi';

export default defineConfig({
  npmClient: 'yarn',
  exportStatic:{
  },
  cssMinifier: 'esbuild',
  cssMinifierOptions: {
    minifyWhitespace: true,
    minifySyntax: true,
  },
  routes:[
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/main.html', component: 'index' },
    { exact: true, path: '/docs', component: 'docs' },
    { exact: true, path: '/docs.html', component: 'docs' },
    { exact: true, path: '/popup', component: 'popup' },
    { exact: true, path: '/popup.html', component: 'popup' },
  ]
});
