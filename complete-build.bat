@Echo off
cmd /C mvn clean
cd roche.pharma.customerportal.ui/roche.pharma.customerportal.ui.clickdummy/src/main/jcr_root/clickdummy
cmd /C grunt
cd ../../../../../../

cmd /C  mvn install
cd roche.pharma.customerportal.complete
cmd /C mvn install -PautoInstallPackage
cd ../