CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# Install website
#

install:
	@echo "\n${HR}"
	@echo "Installing website..."
	@echo "${HR}\n"
	@npm install
	@bower install
	@echo "Install dependencies...               ${CHECK} Done"
	@grunt
	@echo "Building project...                   ${CHECK} Done"
