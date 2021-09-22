import { SchemaFieldType, ModelType } from './types';
import pluralize from 'pluralize';
import { mutationValues , subscriptionValues, subscriptionFieldValues, whereInputFields } from './constants';

export class SchemaFieldGenerator {

  public generateSchemaField(field: SchemaFieldType): string {
    const { name, value, isListType, fieldValueRequired, fieldRequired } = field;
		return  `  ${name}: ${isListType ? '[' : ''}${value}${fieldValueRequired ? '!' : ''}${isListType ? ']' : ''}${fieldRequired ? '!' : ''}`;
  }

  public subscriptionPayloadFields(model: ModelType): string {
    return subscriptionValues(model);
  }

  private generateMutationSchemaField(value: string, type: ModelType): string {
    const isUnique = type.fields.some((field: SchemaFieldType) => field.name === 'id');
    const { name } = type;

    switch (value) {
      case 'create':
        return `  create${name}(data: ${name}CreateInput): [${name}!]`
      case 'update':
        return isUnique ? `  update${name}(data: ${name}UpdateInput, where: ${name}WhereUniqueInput): ${name}` : null;
      case 'delete':
        return `  delete${name}(where: ${name}WhereUniqueInput): ${name}`
      case 'upsert':
        return isUnique ?  `  upsert${name}(where: ${name}WhereUniqueInput, create: ${name}CreateInput!, update: ${name}UpdateInput!): ${name}!` : null;
      case 'updateMany':
        return `  updateMany${pluralize(name)}(data: ${name}UpdateInput, where: ${name}WhereInput): BatchPayload!`;
      case 'deleteMany':
        return `  deleteMany${pluralize(name)}(where: ${name}WhereInput): BatchPayload!`;
    }
  }

  public printTypeFields(fields: SchemaFieldType[]): string {
		return fields.map((field: SchemaFieldType) => this.generateSchemaField(field)).join('\n');
  }

  public generateMutationFields(model: SchemaFieldType[]): string {  
    const printFields = (value: string) => {
      return model.map((type: SchemaFieldType) => {
        return this.generateMutationSchemaField(value, type);
      }).join('\n');
    }

    return mutationValues.map((value: string) => printFields(value)).join('\n');
  }

  public generateUniqueInputFields(model: ModelType): string {
    const values = model.fields.filter((field: SchemaFieldType) => field.isUnique || field.name === 'id');
    return values.map(value => `  ${value.name}: ${value.value}`).join('\n');
  }

  public generateSubcriptionFields(model: ModelType): string {
    const values = subscriptionFieldValues(model);
    return values.map(value => `  ${value.name}: ${value.value}`).join('\n');
  }

  public generateSubscriptionTypeFields(models: ModelType[]): string {
    function printFields(model: ModelType) {
      const { name } = model;
      return `  ${name.toLowerCase()}(where: ${name}SubscriptionWhereInput): ${name}SubscriptionPayload`;
    }
    return models.map((model: ModelType) => printFields(model)).join('\n');
  }

  public printInputTypeFields(fields: SchemaFieldType[]): string {
    const uniqueFields = fields.filter(field => !field.isUnique || !field.name === "id");
    return uniqueFields.map((field: SchemaFieldType) => `  ${field.name}: ${field.value}`).join('\n');
  }

  public generateQueryFields(models: ModelType[]): string {
    let queryString = ''

    function printQuery(type: string, name: string) {
      if (type === 'plural') {
        return `  ${pluralize(name.toLowerCase())}(where: ${name}WhereInput, orderBy: ${name}OrderInput, skip: Int, after: String, before: String, first: Int, last: Int): [${name}!]`
      }
      return `  ${name.toLowerCase()}(where: ${name}WhereUniqueInput!): ${name}`
    }

    // Find another way instead of mapping twice.
    models.map((model: ModelType) => {
      queryString += `${printQuery('plural', model.name)}\n`
    })

    models.map((model: ModelType) => {
      if (model.fields.some((field: SchemaFieldType) => field.isUnique || field.name === 'id')) {
        queryString += `${printQuery('single', model.name)}\n`
      }
		})
		    
    return queryString;
  }

  public generateWhereInputFields(model: ModelType): string{
    function printInputFields(field: SchemaFieldType) {
      // TODO: Add support for top level types instead of making them default int.
      const fieldValue = Object.keys(whereInputFields).includes(field.value.toLowerCase()) ? field.value.toLowerCase() : 'int';
      return whereInputFields[fieldValue].map(inputField => {
        const fieldValue = inputField === '_in' || inputField ===  '_not_in' ? `[${field.value}!]` : field.value;
        return `  ${field.name}${inputField}: ${fieldValue}`;
      }).join('\n')
    }

    return `  AND: [${model.name}WhereInput!]\n  OR: [${model.name}WhereInput!]\n  NOT: [${model.name}WhereInput!]\n${model.fields.map(field => printInputFields(field)).join('\n')}`
  }

  public orderEnumFields(model: ModelType): string {
    return model.fields.map((field: SchemaFieldType) => `  ${field.name}_ASC\n  ${field.name}_DESC`).join('\n')
  }
}