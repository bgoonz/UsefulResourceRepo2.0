module.exports = function makeLogger(argv)
{
	return function logit(message)
	{
		if (!argv || !argv.silent) console.log(message);
	};
};
