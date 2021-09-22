export interface DocumentType {
  kind: string,
  definitions: Array<DefinitionType>
}

export interface DefinitionType {
  kind: string 
  description?: string 
  name: NameType 
  interfaces?: Array<any>
  directives?: Array<any>
  fields: FieldType[]
  loc: any
}

export interface FieldType {
  kind: string
  description?: string 
  name: NameType
  arguments?: Array<any>
  type: TypeType
  directives?: Array<any> | undefined
  loc: any
}

export interface NameType {
  kind: string
  value: string 
  loc: any
}

export interface TypeType {
  kind: string 
  type: NameType | TypeType
  loc: any
}
export interface SchemaFieldType {
  name: string 
  value: string 
  isListType: boolean
  fieldValueRequired: boolean 
  fieldRequired: boolean
}

export interface ModelType {
  name: string 
  fields: SchemaFieldType[]
}

export interface ModelsType {
  models: ModelType[]
}

 

