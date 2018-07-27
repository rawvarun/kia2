echo "Running Maven Build"
cd roche.pharma.customerportal.ui/roche.pharma.customerportal.ui.clickdummy/src/main/jcr_root/clickdummy
grunt aem
cd ../../../../../../

mvn clean install
cd roche.pharma.customerportal.complete
mvn clean install -PautoInstallPackage
echo "Maven Build Completed"