import { ModelType, SchemaFieldType } from './types';

export class Models {
  models: ModelType[]

  constructor() {
    this.models = [];
  }

  addModel(model: ModelType) {
    this.models.push(model);
  }
}

export class CustomScalarNodes {
	customScalars: Array<string>

	constructor() {
		this.customScalars = [];
	}

	addCustomScalar(scalar: string) {
		this.customScalars.push(scalar)
	}
}

export class ModelTypeNode {
  name: string
  fields?: SchemaFieldType[] | string[]

  constructor(name: string) {
    this.name = name;
    this.fields = [];
  }

  addFields(fields: SchemaFieldType[] | string[]) {
    this.fields = fields;
  }
}

export class Field {
	name: string 
  value: string 
  isListType: boolean
  fieldValueRequired: boolean 
	fieldRequired: boolean
	isUnique: boolean

  constructor(name: string, value: string, isListType: boolean, fieldValueRequired: boolean, fieldRequired: boolean, isUnique: boolean) {
    this.name = name;
    this.value = value;
    this.isListType = isListType;
    this.fieldValueRequired = fieldValueRequired;
		this.fieldRequired = fieldRequired;
		this.isUnique = isUnique;
  }
}
