## Javascript MedicalDrone Sim

1. To run you will first have to disable CORs otherwise local runs will not work, should be able to use run to run chrome like this.

# Windows
chrome.exe --disable-web-security

# OSX
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

2. Then drop the index.html into your new browser window.

3. Finally there are two missions to pick from, mission 1 demonstrates obstacle avoidance while mission 2 demos the package dropping.