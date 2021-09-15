const SchemaFieldGenerator = require('./schemaFieldGenerator');

const FieldGenerator = new SchemaFieldGenerator;
const testInput = require('./testInput');

describe("Schema field generator function should return the correct strings.", () => {
  test("Schema type field should render the correct field.", () => {
    expect(FieldGenerator.generateSchemaField(testInput.testFields[0])).toBe(`  id: ID`)
  });

  test("Subscription payload fields should be correct.", () => {
    expect(FieldGenerator.subscriptionPayloadFields(testInput.testModel[0])).toBe(`  mutation: MutationType\n  node: User\n  updatedFields: [String!]\n  previousValues: UserPreviousValues`)
  });

  test("Type fields should be rendered correctly", () => {
    expect(FieldGenerator.printTypeFields(testInput.testFields)).toBe(`  id: ID\n  name: String\n  age: Int`)
  });

  test("Unique input fields are rendered correctly.", () => {
    expect(FieldGenerator.generateUniqueInputFields(testInput.testModel[0])).toBe('  id: ID')
  });
});