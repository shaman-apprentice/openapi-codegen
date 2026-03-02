import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { BooleanParser } from './boolean.parser.mjs';

const nullRegistry = /** @type {any} */ (null);

describe('booleanParser', () => {
	test('generates export type alias for boolean', () => {
		assert.equal(
			BooleanParser.toTSDeclaration('IsActive', { type: 'boolean' }, nullRegistry),
			'export type IsActive = boolean;',
		);
	});
});
