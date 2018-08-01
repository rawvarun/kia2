echo "Running Maven Build"
cd kia.platform.ui/kia.platform.ui.clickdummy/src/main/jcr_root/clickdummy
npm install
npm run aembuilddev
cd ../../../../../../

mvn clean install
cd kia.platform.complete
mvn clean install -PautoInstallPackage
echo "Maven Build Completed"