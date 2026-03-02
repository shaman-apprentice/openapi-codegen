/** @import { TypeParser } from './type-parser-registry.mjs' */

/** @type {TypeParser} */
export const BooleanParser = {
  toTSType(_schema, _registry) {
    return 'boolean';
  },
  toTSDeclaration(name, _schema, _registry) {
    return `export type ${name} = boolean;`;
  },
};
