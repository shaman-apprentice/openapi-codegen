import { TypeParserRegistry } from './parsers/type-parser-registry.mjs';
import { StringParser } from './parsers/string.parser.mjs';
import { IntegerParser } from './parsers/integer.parser.mjs';
import { BooleanParser } from './parsers/boolean.parser.mjs';
import { ObjectParser } from './parsers/object.parser.mjs';

/**
 * Generates the content of a model.ts file from OpenAPI component schemas.
 * @param {Record<string, import('openapi-types').OpenAPIV3_1.SchemaObject>} schemas
 */
export function modelContent(schemas) {
	const registry = _createRegistry();

  const declarations = Object.entries(schemas).map(([name, schema]) =>
    registry.toTSDeclaration(name, schema),
  );

  return declarations.join('\n\n') + '\n';
}

export function _createRegistry() {
  const registry = new TypeParserRegistry();
  registry.register('string', StringParser);
  registry.register('integer', IntegerParser);
  registry.register('boolean', BooleanParser);
  registry.register('object', ObjectParser);
  return registry;
}
