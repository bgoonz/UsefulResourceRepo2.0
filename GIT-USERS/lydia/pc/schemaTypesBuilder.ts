import { SchemaFieldGenerator } from './schemaFieldGenerator';
import { SchemaFieldType,  ModelType, ModelsType } from './types';

export class SchemaTypesBuilder {
  fieldGenerator: any

  constructor() {
    this.fieldGenerator = new SchemaFieldGenerator;    
  }

  public generateScalar(scalar: string): string {
    return `scalar ${scalar}`;
  }
  
  private inputType(name: string, fields: SchemaFieldType[] | string): string {
    return `type ${name} {\n${fields}\n}\n\n`
  }

  private enumType(name: string, fields: SchemaFieldType[]): string {
    return `enum ${name} {\n${fields}\n}\n\n`
  }

  private inputInputType(name: string, fields: SchemaFieldType[]): string {
    return `input ${name} {\n${fields}\n}\n\n`
  }

  private pageInfoType(model: ModelType) {
    return `  pageInfo: PageInfo!\n  edges: [${model.name}Edge]! \n  aggregate: Aggregate${model.name}!`
  }

  public printType(name: string, fields: SchemaFieldType[] | string[]): string {
    const hasID = fields.some((field: SchemaFieldType) => field.name === 'id');
		const typeName = `${name} ${hasID ? 'implements Node' : ''}`;
    return this.inputType(
      typeName,
      this.fieldGenerator.printTypeFields(fields)
    );
  }

  public scalarType(name: string): string {
    return `scalar ${name} \n\nscalar Long\n\n`
  }

  public updateInput(model: ModelType): string {
    return this.inputType(
      `${model.name}UpdateInput`, 
      this.fieldGenerator.printInputTypeFields(model.fields),
    );
  }
  
  public subscriptionPayload(model: ModelType) {
    return this.inputType(
      `${model.name}SubscriptionPayload`, 
      this.fieldGenerator.subscriptionPayloadFields(model)
    );
  }
  
  public aggregateType(model: ModelType): string {
    return this.inputType(
      `Aggregate${model.name}`, 
      '  count: Int!'
    );
  }
  
  public mutationType(model: ModelType[]): string {
    return this.inputType(
      'Mutation',
      this.fieldGenerator.generateMutationFields(model)
    );
  }
  
  public queryType(model: ModelsType): string {
    return this.inputType(
      'Query',
      this.fieldGenerator.generateQueryFields(model.models)
    );
  }

  public subscriptionType(models: ModelType[]): string {
    return this.inputType(
      'Subscription',
      this.fieldGenerator.generateSubscriptionTypeFields(models)
    );
  }
  
  public previousValues(model: ModelType): string {
    return this.inputType(
      `${model.name}PreviousValues`,
      this.fieldGenerator.printTypeFields(model.fields)
    );
  }
  
  public orderByInput(model: ModelType): string {
    return this.enumType(
      `${model.name}OrderByInput`,
      this.fieldGenerator.orderEnumFields(model)
    );
  }

  public whereUniqueInput(model: ModelType): string {
    if (model.fields.some(field => field.isUnique || field.name === "id")) {
      return this.inputInputType(
        `${model.name}WhereUniqueInput`,
        this.fieldGenerator.generateUniqueInputFields(model)
      );
    } 
    return null
  }
  
  public createEdge(model: ModelType): string {
    return this.inputType(
      `${model.name}Edge`,
      `  node: ${model.name}!\n  cursor: String!`
    );
  }
  
  public createInput(model: ModelType): string {
    // TODO: Remove weird way of not rendering type.
    if (!model.fields.length || model.fields.every(field => field.name === 'id')) return '';
    return this.inputType(
      `${model.name}CreateInput`,
      this.fieldGenerator.printTypeFields(model.fields)
    );
  }
  
  public printConnection(model: ModelType): string {
    return this.inputType(
      `${model.name}Connection`,
      this.pageInfoType(model)
    );
  }
  
  public subscriptionWhereInput(model: ModelType): string {
    return this.inputInputType(
      `${model.name}SubscriptionWhereInput`,
      this.fieldGenerator.generateSubcriptionFields(model)
    );
  }

  public modelWhereInput(model: ModelType): string {
    return this.inputInputType(
      `${model.name}WhereInput`,
      this.fieldGenerator.generateWhereInputFields(model)
    );
  }
}