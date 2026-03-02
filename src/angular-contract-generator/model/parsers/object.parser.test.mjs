import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { ObjectParser } from './object.parser.mjs';
import { TypeParserRegistry } from './type-parser-registry.mjs';
import { StringParser } from './string.parser.mjs';
import { IntegerParser } from './integer.parser.mjs';
import { BooleanParser } from './boolean.parser.mjs';

/** @typedef {import('openapi-types').OpenAPIV3_1.SchemaObject} SchemaObject */

/** @returns {TypeParserRegistry} */
function createRegistry() {
  const registry = new TypeParserRegistry();
  registry.register('string', StringParser);
  registry.register('integer', IntegerParser);
  registry.register('boolean', BooleanParser);
  registry.register('object', ObjectParser);
  return registry;
}

describe('objectParser', () => {
  describe('toTSType', () => {
    test('returns Record<string, unknown> for object with no properties', () => {
      const registry = createRegistry();

      assert.equal(
        ObjectParser.toTSType({ type: 'object' }, registry),
        'Record<string, unknown>',
      );
    });

    test('returns Record<string, unknown> for object with empty properties', () => {
      const registry = createRegistry();

      assert.equal(
        ObjectParser.toTSType({ type: 'object', properties: {} }, registry),
        'Record<string, unknown>',
      );
    });

    test('returns inline object type with optional properties', () => {
      const registry = createRegistry();
      /** @type {SchemaObject} */
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'integer' },
        },
      };

      assert.equal(
        ObjectParser.toTSType(schema, registry),
        '{\n  name?: string;\n  age?: number;\n}',
      );
    });

    test('marks required properties without question mark', () => {
      const registry = createRegistry();
      /** @type {SchemaObject} */
      const schema = {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          age: { type: 'integer' },
        },
      };

      assert.equal(
        ObjectParser.toTSType(schema, registry),
        '{\n  name: string;\n  age?: number;\n}',
      );
    });
  });

  describe('toTSDeclaration', () => {
    test('generates Record type alias for object with no properties', () => {
      const registry = createRegistry();

      assert.equal(
        ObjectParser.toTSDeclaration('Empty', { type: 'object' }, registry),
        'export type Empty = Record<string, unknown>;',
      );
    });

    test('generates interface with all optional properties', () => {
      const registry = createRegistry();
      /** @type {SchemaObject} */
      const schema = {
        type: 'object',
        properties: {
          active: { type: 'boolean' },
        },
      };

      assert.equal(
        ObjectParser.toTSDeclaration('Flags', schema, registry),
        'export interface Flags {\n  active?: boolean;\n}',
      );
    });

    test('generates interface with required and optional properties', () => {
      const registry = createRegistry();
      /** @type {SchemaObject} */
      const schema = {
        type: 'object',
        required: ['name', 'enclosure'],
        properties: {
          name: { type: 'string' },
          enclosure: { type: 'string' },
          camouflageLevel: { type: 'integer' },
        },
      };

      const expected = [
        'export interface Animal {',
        '  name: string;',
        '  enclosure: string;',
        '  camouflageLevel?: number;',
        '}',
      ].join('\n');

      assert.equal(ObjectParser.toTSDeclaration('Animal', schema, registry), expected);
    });

    test('generates interface with enum string property', () => {
      const registry = createRegistry();
      /** @type {SchemaObject} */
      const schema = {
        type: 'object',
        required: ['name', 'mainColor'],
        properties: {
          name: { type: 'string', enum: ['rainbowfish'] },
          mainColor: { type: 'string' },
        },
      };

      const expected = [
        'export interface Rainbowfish {',
        "  name: 'rainbowfish';",
        '  mainColor: string;',
        '}',
      ].join('\n');

      assert.equal(ObjectParser.toTSDeclaration('Rainbowfish', schema, registry), expected);
    });

    test('handles nested object properties', () => {
      const registry = createRegistry();
      /** @type {SchemaObject} */
      const schema = {
        type: 'object',
        required: ['address'],
        properties: {
          address: {
            type: 'object',
            required: ['street'],
            properties: {
              street: { type: 'string' },
              zip: { type: 'integer' },
            },
          },
        },
      };

      const expected = [
        'export interface Person {',
        '  address: {',
        '    street: string;',
        '    zip?: number;',
        '  };',
        '}',
      ].join('\n');

      assert.equal(ObjectParser.toTSDeclaration('Person', schema, registry), expected);
    });
  });
});
