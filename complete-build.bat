@Echo off
cmd /C mvn clean
cd kia.platform.ui/kia.platform.ui.clickdummy/src/main/jcr_root/clickdummy
cmd /C npm install
cmd /C npm run aembuilddev
cd ../../../../../../

cmd /C  mvn install
cd kia.platform.complete
cmd /C mvn install -PautoInstallPackage
cd ../