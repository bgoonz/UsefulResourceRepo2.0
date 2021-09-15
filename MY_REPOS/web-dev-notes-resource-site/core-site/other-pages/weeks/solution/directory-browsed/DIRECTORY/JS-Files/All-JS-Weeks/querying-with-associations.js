const {
  Pet,
  Owner,
  PetType,
  Sequelize: { Op },
  sequelize,
} = require('./models');

async function queryPetTypes() {
  const p = await Pet.create({ name: 'Fido', petTypeId: 4, age: 4 });
  const o = await Owner.create({ firstName: 'Zaphod', lastName: 'Beeblebrox' });
  const o2 = await Owner.create({ firstName: 'Arthur', lastName: 'Dent' });
  await p.addOwner(o);
  await p.addOwner(o2);

  let pet;
  pet = await Pet.findByPk(p.id);
  console.log(pet.id, pet.name, pet.age, pet.petTypeId, pet.PetType, pet.Owners);

  // Eager load pet type
  pet = await Pet.findByPk(p.id, { include: PetType });
  console.log(pet.id, pet.name, pet.age, pet.petTypeId, pet.PetType.type, pet.Owners);

  // Lazy load owners
  const owners = await pet.getOwners();
  console.log(owners.length);
  console.log('OWNERS');
  for (let owner of owners) {
    console.log(owner.id, owner.firstName, owner.lastName);
  }

  // Eager load owners
  pet = await Pet.findByPk(p.id, { include: [PetType, Owner] });
  console.log(pet.id, pet.name, pet.age, pet.petTypeId, pet.PetType.type, pet.Owners.length);

  console.log('OWNERS');
  for (let owner of pet.Owners) {
    console.log(owner.id, owner.firstName, owner.lastName);
  }

  sequelize.close();
}

queryPetTypes();
