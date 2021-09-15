const { PetType, sequelize } = require('./models');

async function deletePetType() {
	await PetType.destroy({
		where: {
			id: [ 4, 5, 6 ]
		}
	});

	// Here to just close the connection to end
	// the process
	sequelize.close();
}

deletePetType();
