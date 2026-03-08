/** @import { OpenAPIV3_1 } from 'openapi-types' */
/** @import { MethodMetadata, } from './utils/method.helper.mjs' */

import { toMethodName } from './ts.helper.mjs';
import { getParams } from './utils/parameters.helper.mjs';
import { HTTP_METHODS, generateMethod } from './utils/method.helper.mjs';

/**
 * Generates the content of an angular.client.ts file from OpenAPI paths.
 * @param {Record<string, OpenAPIV3_1.PathItemObject>} paths
 * @returns {string}
 */
export function apiClientContent(paths) {
	const methodsToGenerate = /** @type {MethodMetadata[]} */ ([]);

	for (const [path, pathItem] of Object.entries(paths)) {
		for (const method of HTTP_METHODS) {
			if (!pathItem[method])
				continue;

			const operation = pathItem[method];
			methodsToGenerate.push(_buildMethodMetadata(path, method, operation));
		}
	}

	return `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * from './model'; 

@Injectable({ providedIn: 'root' })
export class ApiClient {
  #http = inject(HttpClient);

	${methodsToGenerate.map(generateMethod).join('\n\n  ')}
}`;
}

/**
 * Builds method info from a path, HTTP method and OpenAPI operation.
 * @param {string} path
 * @param {typeof HTTP_METHODS[number]} method
 * @param {OpenAPIV3_1.OperationObject} operation
 * @returns {MethodMetadata}
 */
export function _buildMethodMetadata(path, method, operation) {
	return {
		name: toMethodName(method, path),
		httpMethod: method,
		path,
		params: getParams(path, operation),
		responseType: _resolveResponseType(operation),
		requestBodyType: _resolveRequestBodyType(operation),
	};
}

/**
 * Resolves the response TypeScript type from an operation's responses.
 * Checks status codes 200 and 201.
 * @param {OpenAPIV3_1.OperationObject} operation
 * @returns {string}
 */
export function _resolveResponseType(operation) {
	const responses = operation.responses;
	if (!responses) return 'void';

	const response = responses['200'] || responses['201'];
	if (!response) return 'void';

	if ('$ref' in response) return _refToTypeName(response['$ref']);

	const content = response.content;
	if (!content?.['application/json']?.schema) return 'void';

	return _resolveSchemaType(content['application/json'].schema);
}

/**
 * Resolves the request body TypeScript type from an operation.
 * @param {OpenAPIV3_1.OperationObject} operation
 * @returns {string | undefined}
 */
export function _resolveRequestBodyType(operation) {
	const requestBody = operation.requestBody;
	if (!requestBody || '$ref' in requestBody) return undefined;

	const content = requestBody.content;
	if (!content?.['application/json']?.schema) return undefined;

	return _resolveSchemaType(content['application/json'].schema);
}

/**
 * Resolves a schema or reference to a TypeScript type string.
 * @param {OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject} schema
 * @returns {string}
 */
export function _resolveSchemaType(schema) {
	if ('$ref' in schema)
		return _refToTypeName(schema.$ref);

	if (schema.type === 'array')
		return schema.items ? `${_resolveSchemaType(schema.items)}[]` : 'unknown[]';

	/** @type {Record<string, string>} */
	const typeMap = { string: 'string', integer: 'number', number: 'number', boolean: 'boolean' };
	const schemaType = typeof schema.type === 'string' ? schema.type : undefined;
	if (schemaType && typeMap[schemaType])
		return typeMap[schemaType];

	return 'unknown';
}

/**
 * Extracts the type name from a $ref string (local or external).
 * @param {string} ref
 * @returns {string}
 */
export function _refToTypeName(ref) {
	return ref.split('/').pop() ?? 'unknown';
}
