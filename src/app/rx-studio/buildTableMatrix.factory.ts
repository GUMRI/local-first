export interface TableMatrix {
  collections: TableCollection[];
}

export interface TableCollection {
  name: string;
  fields: TableField[];
}

export interface TableField {
  name: string;
  type: string;
  format?: string;
  default?: any;
  isPrimary: boolean;
  isRequired: boolean;
  isAttachmentId?: boolean;
  population?: TableCollection;
  nestedFields: TableField[];
}

const ATTACHMENT_KEYWORDS = ['avatar', 'image', 'file', 'doc', 'video'];

function isAttachmentField(fieldName: string): boolean {
  return ATTACHMENT_KEYWORDS.some(keyword => fieldName.toLowerCase().includes(keyword));
}

function convertSchemaToCollection(schema: any, collectionName: string, db: any): TableCollection {
  const primaryKeys = schema.primaryKey
    ? Array.isArray(schema.primaryKey.fields)
      ? schema.primaryKey.fields
      : [schema.primaryKey]
    : [];

  const fields: TableField[] = Object.entries(schema.properties).map(([key, value]: [string, any]) => {
    const isPrimary = primaryKeys.includes(key);
    const isRequired = schema.required?.includes(key) ?? false;
    const isAttachmentId = isAttachmentField(key);

    let population: TableCollection | undefined;
    let nestedFields: TableField[] = [];

    // ref population
    if (value.ref && db.collections[value.ref]) {
      const refSchema = db.collections[value.ref].schema.jsonSchema;
      population = convertSchemaToCollection(refSchema, value.ref, db);
    }

    // nested object
    if (value.type === 'object' && value.properties) {
      nestedFields = Object.entries(value.properties).map(([nestedKey, nestedValue]: [string, any]) => ({
        name: nestedKey,
        type: nestedValue.type || 'string',
        format: nestedValue.format,
        default: nestedValue.default,
        isPrimary: false,
        isRequired: value.required?.includes(nestedKey) ?? false,
        isAttachmentId: isAttachmentField(nestedKey),
        population: undefined,
        nestedFields: []
      }));
    }

    // array of objects
    if (value.type === 'array' && value.items?.type === 'object' && value.items.properties) {
      nestedFields = Object.entries(value.items.properties).map(([nestedKey, nestedValue]: [string, any]) => ({
        name: nestedKey,
        type: nestedValue.type || 'string',
        format: nestedValue.format,
        default: nestedValue.default,
        isPrimary: false,
        isRequired: value.items.required?.includes(nestedKey) ?? false,
        isAttachmentId: isAttachmentField(nestedKey),
        population: undefined,
        nestedFields: []
      }));
    }

    return {
      name: key,
      type: value.type || 'string',
      format: value.format,
      default: value.default,
      isPrimary,
      isRequired,
      isAttachmentId: isAttachmentId || undefined,
      population,
      nestedFields
    };
  });

  return {
    name: collectionName,
    fields
  };
}

export function buildTableMatrix(db: any): TableMatrix {
  const collections = Object.entries(db.collections).map(([name, col]: [string, any]) =>
    convertSchemaToCollection(col.schema.jsonSchema, name, db)
  );

  return { collections };
}
