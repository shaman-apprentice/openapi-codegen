// @ts-nocheck
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import {
	apiClientContent,
	_resolveSchemaType,
	_resolveResponseType,
	_resolveRequestBodyType,
	_refToTypeName,
	_extractPathParams,
} from './api-client.generator.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const loadFixture = name => yaml.load(readFileSync(join(__dirname, 'fixtures', name), 'utf8'));

describe('apiClientContent', () => {
	test('generates client for single GET endpoint', () => {
		const result = apiClientContent(loadFixture('get-chameleon.yaml'));

		assert.ok(result.includes("import { Injectable, inject } from '@angular/core';"));
		assert.ok(result.includes("import { HttpClient } from '@angular/common/http';"));
		assert.ok(result.includes("import { Observable } from 'rxjs';"));
		assert.ok(result.includes("import { Chameleon } from './model';"));
		assert.ok(result.includes('getChameleon(): Observable<Chameleon>'));
		assert.ok(result.includes("this.#http.get<Chameleon>('/chameleon')"));
	});

	test('generates client for POST endpoint with request body', () => {
		const result = apiClientContent(loadFixture('post-chameleon.yaml'));

		assert.ok(result.includes('postChameleon(body: Chameleon): Observable<Chameleon>'));
		assert.ok(result.includes("this.#http.post<Chameleon>('/chameleon', body)"));
	});

	test('generates client with path parameters', () => {
		const result = apiClientContent(loadFixture('get-animal-by-id.yaml'));

		assert.ok(result.includes('getAnimalsById(id: string): Observable<Animal>'));
		assert.ok(result.includes('this.#http.get<Animal>(`/animals/${id}`)'));
	});

	test('generates client with array response', () => {
		const result = apiClientContent(loadFixture('get-animals.yaml'));

		assert.ok(result.includes("import { Animal } from './model';"));
		assert.ok(result.includes('getAnimals(): Observable<Animal[]>'));
		assert.ok(result.includes("this.#http.get<Animal[]>('/animals')"));
	});

	test('generates DELETE method without body', () => {
		const result = apiClientContent(loadFixture('delete-chameleon-by-id.yaml'));

		assert.ok(result.includes('deleteChameleonById(id: string): Observable<void>'));
		assert.ok(result.includes('this.#http.delete<void>(`/chameleon/${id}`)'));
	});

	test('generates PUT method with body', () => {
		const result = apiClientContent(loadFixture('put-chameleon-by-id.yaml'));

		assert.ok(result.includes('putChameleonById(id: string, body: Chameleon): Observable<Chameleon>'));
		assert.ok(result.includes('this.#http.put<Chameleon>(`/chameleon/${id}`, body)'));
	});

	test('generates POST method without body passes null', () => {
		const result = apiClientContent(loadFixture('post-trigger.yaml'));

		assert.ok(result.includes("this.#http.post<void>('/trigger', null)"));
	});
});

describe('_resolveSchemaType', () => {
	test('resolves $ref', () => {
		assert.equal(_resolveSchemaType({ $ref: '#/components/schemas/Chameleon' }), 'Chameleon');
	});

	test('resolves array of $ref', () => {
		assert.equal(
			_resolveSchemaType({ type: 'array', items: { $ref: '#/components/schemas/Animal' } }),
			'Animal[]',
		);
	});

	test('resolves primitive types', () => {
		assert.equal(_resolveSchemaType({ type: 'string' }), 'string');
		assert.equal(_resolveSchemaType({ type: 'integer' }), 'number');
		assert.equal(_resolveSchemaType({ type: 'boolean' }), 'boolean');
	});

	test('resolves unknown for unrecognized type', () => {
		assert.equal(_resolveSchemaType({ type: 'object' }), 'unknown');
	});

	test('resolves array without items as unknown[]', () => {
		assert.equal(_resolveSchemaType({ type: 'array' }), 'unknown[]');
	});
});

describe('_resolveResponseType', () => {
	test('returns void when no responses', () => {
		assert.equal(_resolveResponseType(/** @type {any} */ ({})), 'void');
	});

	test('returns void when no 200/201 response', () => {
		assert.equal(_resolveResponseType({ responses: { '204': { description: 'No content' } } }), 'void');
	});

	test('returns void when response has no content', () => {
		assert.equal(_resolveResponseType({ responses: { '200': { description: 'OK' } } }), 'void');
	});

	test('resolves type from 201 response', () => {
		const op = {
			responses: {
				'201': {
					description: 'Created',
					content: { 'application/json': { schema: { $ref: '#/components/schemas/Animal' } } },
				},
			},
		};
		assert.equal(_resolveResponseType(op), 'Animal');
	});
});

describe('_resolveRequestBodyType', () => {
	test('returns undefined when no request body', () => {
		assert.equal(_resolveRequestBodyType({}), undefined);
	});

	test('resolves type from request body', () => {
		const op = {
			requestBody: {
				content: { 'application/json': { schema: { $ref: '#/components/schemas/Animal' } } },
			},
		};
		assert.equal(_resolveRequestBodyType(op), 'Animal');
	});
});

describe('_extractPathParams', () => {
	test('no params', () => {
		assert.deepEqual(_extractPathParams('/chameleon'), {});
	});

	test('single param', () => {
		assert.deepEqual(_extractPathParams('/animals/{id}'), { id: { type: 'string' } });
	});

	test('multiple params', () => {
		assert.deepEqual(_extractPathParams('/animals/{animalId}/food/{foodId}'), {
			animalId: { type: 'string' },
			foodId: { type: 'string' },
		});
	});
});

describe('_refToTypeName', () => {
	test('extracts name from local ref', () => {
		assert.equal(_refToTypeName('#/components/schemas/Chameleon'), 'Chameleon');
	});

	test('extracts name from external ref', () => {
		// TODO import from other package
		assert.equal(_refToTypeName('../shared-lib/shared.yaml#/components/schemas/Animal'), 'Animal');
	});
});
