import fs from 'fs';
import path from 'path';
import { parse } from 'graphql';

import { SchemaTypesBuilder } from './schemaTypesBuilder';
import { DocumentType, DefinitionType, FieldType, SchemaFieldType, ModelType, ModelsType } from './types';
import { Models, ModelTypeNode, Field, CustomScalarNodes } from './schemaClasses';
import { enumType, interfaceType, pageInfoType, batchPayload, scalarLong } from './constants';

const typeBuilder = new SchemaTypesBuilder();

export class SchemaBuilder {
  models: any
	customScalars: any

  constructor() {
		this.models = new Models();
		this.customScalars = new CustomScalarNodes();
  }

	private parseDataModel(): DocumentType {
    return parse(fs.readFileSync(path.join(__dirname, "datamodel.graphql"), "utf-8"));
  }
  
  private getModelTypeNames(): Array<string> {
    let typeNames: Array<string> = ['Int', 'Boolean', 'String', 'Float', 'ID'];
    const definitions = this.parseDataModel().definitions;
    definitions.map((def: DefinitionType) => {
      typeNames = [...typeNames, def.name.value];
    });
    return typeNames;
	}

  private getFieldProperties(def: DefinitionType): void {
    let fields: Array<SchemaFieldType> = [];
    const typeNode = new ModelTypeNode(def.name.value);

    def.fields.map((field: FieldType) => {

			const { type, directives } = field;
			const validFields = this.getModelTypeNames();

      const fieldRequired = type.kind === 'NonNullType',
						isListType = type.type && type.type.kind === 'ListType',
						fieldValueRequired = isListType && type.type.type.kind === 'NonNullType',
      			isUnique = directives && directives[0] && directives[0].name && directives[0].name.value === 'unique',
      			value = this.getFieldValue(field, fieldRequired, isListType);
						
      if (!validFields.includes(value)) {
				this.customScalars.addCustomScalar(value);
			}
			
			const name = field.name.value;
			fields.push(new Field(name, value, isListType, fieldValueRequired, fieldRequired, isUnique));
			typeNode.addFields(fields);
		});
		
		this.models.addModel(typeNode);
  }

  private getFieldValue(field: FieldType, isNonNullType: boolean, isListType: boolean): string {
    let value;
    const fieldValue = field.type.type;
    if (isListType) {
      value = fieldValue.type.name.value
    } else if (!isListType && isNonNullType) {
      value = fieldValue.name.value;
    } else {
      value = field.type && field.type.name && field.type.name.value;
    }
    return value;
  }

  private getModelTypes(): void {
		const definitions = this.parseDataModel().definitions;

    definitions.map((definition: DefinitionType) => this.getFieldProperties(definition));
	}

	private getCustomScalarTypes() {
		return this.customScalars.customScalars.map(scalar =>  `scalar ${scalar}\n\n`);
	}
	
	private buildSchemaStrings(models: ModelsType) {
		let aggregates = '';
		let buildString = '';

		models.models.map((model: ModelType) => {
      const fields = model.fields;
      aggregates += `${typeBuilder.aggregateType(model)}`;
      buildString += `${typeBuilder.printType(model.name, fields)}${typeBuilder.printConnection(model)}${typeBuilder.createInput(model)}${typeBuilder.createEdge(model)}${typeBuilder.orderByInput(model)}${typeBuilder.previousValues(model)}${typeBuilder.subscriptionPayload(model)}${typeBuilder.subscriptionWhereInput(model)}${typeBuilder.updateInput(model)}${typeBuilder.modelWhereInput(model)}${typeBuilder.whereUniqueInput(model)}`;
		});

		return [aggregates, buildString];
	}

  private printModelSchema(models: ModelsType): void {
		const typeFields = this.buildSchemaStrings(models);
    const modelString = `${typeFields[0]}${this.getCustomScalarTypes()}${scalarLong}${batchPayload}${typeBuilder.mutationType(models.models)}\n${enumType}\n${interfaceType}\n${pageInfoType}\n${typeBuilder.queryType(models)}${typeBuilder.subscriptionType(models.models)}${typeFields[1]}`;
    
    fs.writeFileSync(
      path.join(__dirname, "schema.graphql"),
      modelString
    );
  }

  private generateSchema(): void {
    return this.printModelSchema(this.models);
  }

  public writeSchema(): void {
    this.parseDataModel();
    this.getModelTypes();
    return this.generateSchema();
  }
}

const builder = new SchemaBuilder;
builder.writeSchema();