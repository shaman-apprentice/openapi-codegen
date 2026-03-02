import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { modelContent, _createRegistry } from './model.helper.mjs';

describe('modelContent', () => {
  test('generates model.ts content from simple schemas', () => {
    /** @type {Record<string, import('openapi-types').OpenAPIV3_1.SchemaObject>} */
    const schemas = {
      Name: { type: 'string' },
      Age: { type: 'integer' },
      IsActive: { type: 'boolean' },
    };

    const result = modelContent(schemas);

    const expected = [
      'export type Name = string;',
      '',
      'export type Age = number;',
      '',
      'export type IsActive = boolean;',
      '',
    ].join('\n');

    assert.equal(result, expected);
  });

  test('generates interface for object schema', () => {
    /** @type {Record<string, import('openapi-types').OpenAPIV3_1.SchemaObject>} */
    const schemas = {
      Animal: {
        type: 'object',
        required: ['name', 'enclosure'],
        properties: {
          name: { type: 'string' },
          enclosure: { type: 'string' },
        },
      },
    };

    const result = modelContent(schemas);

    const expected = [
      'export interface Animal {',
      '  name: string;',
      '  enclosure: string;',
      '}',
      '',
    ].join('\n');

    assert.equal(result, expected);
  });

  test('generates mixed declarations', () => {
    /** @type {Record<string, import('openapi-types').OpenAPIV3_1.SchemaObject>} */
    const schemas = {
      AnimalName: { type: 'string', enum: ['rainbowfish', 'chameleon'] },
      Animal: {
        type: 'object',
        required: ['name', 'enclosure'],
        properties: {
          name: { type: 'string' },
          enclosure: { type: 'string' },
          camouflageLevel: { type: 'integer' },
        },
      },
    };

    const result = modelContent(schemas);

    const expected = [
      "export type AnimalName = 'rainbowfish' | 'chameleon';",
      '',
      'export interface Animal {',
      '  name: string;',
      '  enclosure: string;',
      '  camouflageLevel?: number;',
      '}',
      '',
    ].join('\n');

    assert.equal(result, expected);
  });

  test('returns empty line for empty schemas', () => {
    const result = modelContent({});
    assert.equal(result, '\n');
  });
});
