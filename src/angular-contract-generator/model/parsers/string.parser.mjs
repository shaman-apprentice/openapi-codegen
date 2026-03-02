/** @import { TypeParser } from './type-parser-registry.mjs' */

/** @type {TypeParser} */
export const StringParser = {
  toTSType(schema, _registry) {
    if (schema.enum) {
      return schema.enum.map(v => `'${v}'`).join(' | ');
    }
    return 'string';
  },
  toTSDeclaration(name, schema, registry) {
    return `export type ${name} = ${this.toTSType(schema, registry)};`;
  },
};
