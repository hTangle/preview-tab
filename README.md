# preview-tab[chrome/edge extension]
The new tab page of the edge browser is very difficult to use, 
so I try to write a simple new tab page to replace it.
> All your data is in your browser storage!!! 
> 
> All delete should think twice
## Screenshot of extension
* new tab page
  ![new tab page](https://image.ahsup.top/20221126200053.png)
* change background image
  ![change background image](https://image.ahsup.top/20221126200130.png)
* add current page to new tab page
  ![add current page to new tab page](https://image.ahsup.top/20221126200224.png)

## How to use
```shell
git clone https://github.com/hTangle/preview-tab.git
cd preview-tab
yarn install
yarn build
bash gen.sh
```
Extension base dir is `preview-tab/dist`.
You can open url `edge://extensions/` in edge and try to load unpacked from dir `preview-tab/dist`