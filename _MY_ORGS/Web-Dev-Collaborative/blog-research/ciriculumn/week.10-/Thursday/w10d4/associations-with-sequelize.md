```
const {Pet, Owner, PetType, sequelize } = require('./models');

async fucntion queryPetsTypesAndOwnders(){
// Lazy Load
  const pet = await Pet.findByPk(1);
  console.log(
    pet.id,
    pet.name,
    pet.age,
    pet.petTypeId,
    pet.PetType,
    pet.Owners
}

// Lazy Load
  const pet = await Pet.findByPk(1, {include:[PetType, Owner]});
  console.log(
    pet.id,
    pet.name,
    pet.age,
    pet.petTypeId,
    pet.PetType.type
}

const o = await Owner.create({firstName: 'Arthur', lastName:Dent});

for (let owner of pet.Owners){
  console.log(owner.id, owner.firstName, owner.lastName);
}

pet.belongsToMany();

sequelize.close
```
