const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const logSuccess = (message) => {
	message = `AgilityCMS => ${message} `;
	console.log('\x1b[32m%s\x1b[0m', message);
}

const logWarning = (message) => {
	message = `AgilityCMS => ${message} `;
	console.log('\x1b[33m%s\x1b[0m', message);
}

const logError = (message) => {
	message = `AgilityCMS => ${message} `;
	console.log('\x1b[31m%s\x1b[0m', message);
}

const logInfo = (message) => {
	message = `AgilityCMS => ${message} `;
	console.log(message);
}

const logDebug = (message) => {
	console.log('#######################################################################');
	message = `AgilityCMS(debug) => ${message} `;
	console.log('"\x1b[35m%s\x1b[0m', message);
};


module.exports = {
	logDebug,
	logInfo,
	logError,
	logWarning,
	logSuccess,
	asyncForEach
}