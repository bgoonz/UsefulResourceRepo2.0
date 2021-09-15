const readline = require('readline');
const { PetType, sequelize } = require('./models');

async function deletePetType() {
	const petType = await PetType.create({
		type: 'Salamander'
	});

	await pause();

	await petType.destroy();

	// Here to just close the connection to end
	// the process
	sequelize.close();
}

deletePetType();

async function pause() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((good) => {
		rl.question('hit enter to continue...', () => {
			good();
			rl.close();
		});
	});
}
