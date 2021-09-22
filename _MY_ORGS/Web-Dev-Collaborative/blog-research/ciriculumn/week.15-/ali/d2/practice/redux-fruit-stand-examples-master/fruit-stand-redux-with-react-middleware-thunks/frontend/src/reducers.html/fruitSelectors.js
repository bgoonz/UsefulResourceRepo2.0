
export const getFruitIDs = ({ fruit }) => (
  fruit.map((fruitObj) => fruitObj.id)
);

export const getFruitNames = ({ fruit }) => (
  fruit.map((fruitObj) => fruitObj.name)
);

export const getDistinctFruitNames = ({ fruit }) => {
  const fruitNames = fruit.map((fruitObj) => fruitObj.name);
  const distinctFruitNames = Array.from(new Set(fruitNames)).sort();
  return distinctFruitNames;
};
