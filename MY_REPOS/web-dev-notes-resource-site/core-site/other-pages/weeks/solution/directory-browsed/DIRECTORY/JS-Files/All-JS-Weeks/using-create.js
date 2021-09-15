const { Pet, PetType, PetOwner, Owner, sequelize } = require('./models');

async function insertNewPet() {
  const dog = await PetType.findOne({
    where: {
      type: 'Dog'
    }
  });

  // const pet = Pet.build({
  //   name: 'Fido',
  //   age: 4,
  //   petTypeId: dog.id,
  // });

  // await pet.save();

  const pet = await Pet.create({
    name: 'Fido, Jr.',
    age: 1,
    petTypeId: dog.id,
  });

  const owner = await Owner.create({
    firstName: 'Zaphox',
    lastName: 'Beeblebrox',
  });

  await owner.addPet(pet);

  // Here to just close the connection to end
  // the process
  sequelize.close();
}

insertNewPet();
