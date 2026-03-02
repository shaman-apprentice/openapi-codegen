import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { StringParser } from './string.parser.mjs';

const nullRegistry = /** @type {any} */ (null);

describe('stringParser', () => {
	test('plain string', () => {
		assert.equal(
			StringParser.toTSDeclaration('Name', { type: 'string' }, nullRegistry),
			'export type Name = string;',
		);
	});

	test('string enum', () => {
		/** @type {import('openapi-types').OpenAPIV3_1.SchemaObject} */
		const schema = { type: 'string', enum: ['a', 'b', 'c'] };

		assert.equal(
			StringParser.toTSDeclaration('Letter', schema, nullRegistry),
			"export type Letter = 'a' | 'b' | 'c';",
		);
	});
});
