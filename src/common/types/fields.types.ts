export enum FieldType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  TEXTNUMBER = 'TEXTNUMBER',
  COUNTER = 'COUNTER',
  PROGRESS = 'PROGRESS',
  SELECT = 'SELECT',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
}

export interface FieldDefinition {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  type: FieldType;
  defaultValue?: any;
  options?: any[]; // Solo para SELECT, CHECKBOX, RADIO
}

export interface GameSystemSchema {
  fields: FieldDefinition[];
}