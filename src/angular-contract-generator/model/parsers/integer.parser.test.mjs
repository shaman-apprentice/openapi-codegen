import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { IntegerParser } from './integer.parser.mjs';

const nullRegistry = /** @type {any} */ (null);

describe('integerParser', () => {
	test('generates export type alias for integer', () => {
		assert.equal(
			IntegerParser.toTSDeclaration('Age', { type: 'integer' }, nullRegistry),
			'export type Age = number;',
		);
	});
});
