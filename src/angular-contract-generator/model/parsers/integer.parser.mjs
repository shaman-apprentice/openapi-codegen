/** @import { TypeParser } from './type-parser-registry.mjs' */

/** @type {TypeParser} */
export const IntegerParser = {
  toTSType(_schema, _registry) {
    return 'number';
  },
  toTSDeclaration(name, _schema, _registry) {
    return `export type ${name} = number;`;
  },
};
