/** @import { OpenAPIV3_1 } from 'openapi-types' */

/** @typedef {NonNullable<OpenAPIV3_1.SchemaObject['type']>} SchemaType */

/**
 * @typedef {Object} TypeParser
 * @property {(schema: OpenAPIV3_1.SchemaObject, registry: TypeParserRegistry) => string} toTSType
 * @property {(name: string, schema: OpenAPIV3_1.SchemaObject, registry: TypeParserRegistry) => string} toTSDeclaration
 */

export class TypeParserRegistry {
  /** @type {Map<SchemaType, TypeParser>} */
  #parsers = new Map();

  /**
   * @param {SchemaType} type
   * @param {TypeParser} parser
   */
  register(type, parser) {
    this.#parsers.set(type, parser);
  }

  /** @param {SchemaType} type */
  get(type) {
    const parser = this.#parsers.get(type);
    if (!parser)
			throw new Error(`No parser registered for OpenAPI type: "${type}"`);
    return parser;
  }

  /**
   * @param {OpenAPIV3_1.SchemaObject} schema
   * @returns {string}
   */
  toTSType(schema) {
    if (!schema.type)
			throw new Error('Schema has no "type" property');
    return this.get(schema.type).toTSType(schema, this);
  }

  /**
   * @param {string} name
   * @param {OpenAPIV3_1.SchemaObject} schema
   * @returns {string}
   */
  toTSDeclaration(name, schema) {
    if (!schema.type)
			throw new Error('Schema has no "type" property');
    return this.get(schema.type).toTSDeclaration(name, schema, this);
  }
}
