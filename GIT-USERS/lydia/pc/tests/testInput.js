export const testFields = [
  { name: 'id', value: 'ID', nullType: true, listType: false, isUnique: true, },
  { name: 'name', value: 'String', nullType: false, listType: false, isUnique: false, },
  { name: 'age', value: 'Int', nullType: true, listType: false, isUnique: false, }
];

export const testModel = [{
  name: 'User',
  fields: testFields
}];