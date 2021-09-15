```
petTypes = await PetType.findAll({
  where: {
    type: {
        [Op.substring]: 'a'
      }
   }
});
console.log(petTypes.length);

sequelize.close();

```

```
petType = await PetType.findByPk(3)
```

```
petType = await PetType.findOne({
  where:{
    type: [Op.substring]:'a'
  }
})
```

```
petTypes = await PetType.findCreateFind({
where:{type: 'Bird'}});

petType = petTypes[0];
```
