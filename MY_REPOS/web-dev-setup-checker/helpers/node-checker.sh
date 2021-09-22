source ./helpers/utils.sh
source $(shell_startup_file) > /dev/null 2>&1
source ./helpers/colors.sh
LEGACY_NODE_VERSION=12
LTS_NODE_VERSION=14

NODE=$(which node)
NODE_IS_FROM_NVM=$(echo $NODE | grep -c "nvm")
NODE_VERSION=$($NODE --version)
NODE_IS_LTS=$(echo $NODE_VERSION | grep -c $LTS_NODE_VERSION)
NODE_IS_LEGACY=$(echo $NODE_VERSION | grep -c $LEGACY_NODE_VERSION)
NPM=$(which npm)
NPM_VERSION=$($NPM --version)
MOCHA=$(which mocha)
MOCHA_VERSION=$($MOCHA --version)
MOCHA_IS_FROM_NVM=$(echo $MOCHA | grep -c ".nvm")
NVM_COMMAND="curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash"
NVM_LINES="export NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm"
NODE_ARCH=$($NODE ./helpers/node-arch-check.js)

hr
title "Checking Node.JS"
hr
echo "Node Binary: ${NODE}"
echo "Node Architecture: ${NODE_ARCH}"
echo "Node Version: ${NODE_VERSION}"
echo "NPM Binary: ${NPM}"
echo "NPM Version: ${NPM_VERSION}"
echo "Mocha Binary: ${MOCHA}"
echo "Mocha Version: ${MOCHA_VERSION}"

if [ ! -d $NVM_DIR ]; then
    c_red "NVM isn't installed into your home directory"
    c_red "Please run this command to install it"
    echo
    f_bold "$NVM_COMMAND"
    exit 1;
fi

if [ -z "$NVM_DIR" ]; then
    c_red "NVM isn't initialized properly"
    c_red "Please check your startup files for the correct NVM startup lines"
    echo
    f_bold $NVM_LINES
    exit 1;
fi

# Check node and version
if [ -z "$NODE" ]; then
    c_red "Couldn't find the node binary in your PATH. Check to make sure NVM"
    c_red "is setup correctly"
    echo
    f_bold "You might want to restart your terminal"
    f_bold "Or you might need to install node with this command:"
    echo 
    f_bold "nvm install $LTS_NODE_VERSION"
    exit 1;
fi

if [ $NODE_IS_FROM_NVM != 1 ]; then
    c_red "Your node version isn't coming from NVM"
    c_red "Check to make sure you don't have node installed globally"
    c_red "somewhere in your PATH"
    c_red "Node binary = ${NODE}"
    exit 1;
fi

if [ $NODE_IS_LTS = 1 ]; then
    c_yellow "You are running the current LTS version of Node.JS ${LTS_NODE_VERSION}"
    c_yellow "This will probably work but hasn't been tested thoroughly yet."
    c_yellow "Please use nvm to install version ${LEGACY_NODE_VERSION} instead"
    c_yellow "Run 'nvm install $LEGACY_NODE_VERSION'"
    c_yellow "Followed by 'nvm alias default $LEGACY_NODE_VERSION"
fi

if [ $NODE_IS_LTS != 1 ] && [ $NODE_IS_LEGACY != 1 ]; then
    c_red "You aren't running Node.JS ${LEGACY_NODE_VERSION}"
    c_red "Please use nvm to update to version ${LEGACY_NODE_VERSION}"
    c_red "Run 'nvm install $LEGACY_NODE_VERSION'"
    c_red "Followed by 'nvm alias default $LEGACY_NODE_VERSION"
    exit 1;
fi

# Check for mocha install

if [ -z "$MOCHA" ]; then
    c_red "You don't have mocha installed globally"
    echo
    f_bold "run 'npm install -g mocha' to install it"
    exit 1;
fi

if [ $MOCHA_IS_FROM_NVM != 1 ]; then
    c_red "You have mocha but it's not coming from your nvm node installation."
    c_red "Please install mocha with 'npm install -g mocha'"
    c_red "Mocha binary = ${MOCHA}"
    exit 1;
fi

c_green "Node.JS is OK"
