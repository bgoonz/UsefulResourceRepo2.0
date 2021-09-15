const { Pet, PetType, sequelize } = require('./models');

async function insertNewPet() {
  const dog = await PetType.findOne({
    where: {
      type: 'Dog'
    }
  });

  const pet = Pet.build({
    name: 'Fido',
    age: 4,
    petTypeId: dog.id,
  });

  await pet.save();

  // Here to just close the connection to end
  // the process
  sequelize.close();
}

insertNewPet();
