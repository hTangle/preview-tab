mv dist/main.html dist/main.html.tmp
cp dist/main.html.tmp/index.html dist/main.html
rm -r dist/main.html.tmp

mv dist/popup.html dist/popup.html.tmp
cp dist/popup.html.tmp/index.html dist/popup.html
rm -r dist/popup.html.tmp