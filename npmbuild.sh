cd roche.pharma.customerportal.ui/roche.pharma.customerportal.ui.clickdummy/src/main/jcr_root/clickdummy
echo "Removing Node Modules Folder"
rm -rf node_modules
echo "Removed"
sleep 2;
npm install -g npm@latest
npm install
npm install -g grunt-cli
npm install grunt --save-dev
npm install aemsync -g
echo "Done"