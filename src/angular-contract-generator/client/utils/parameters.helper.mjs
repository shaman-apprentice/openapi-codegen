/** @import { OpenAPIV3_1 } from 'openapi-types' */

import { isReferenceObject } from '../../../supporting/openapi-type.helper.mjs';

/** @typedef {{ name: string; type: 'string' | 'number' }} PathParam */
/** @typedef {{ type: 'string' | 'number' | 'boolean', required?: boolean }} QueryParam */
/** @typedef {{ path: PathParam[], query: Record<string, QueryParam> }} Params */

/**
 * @param {string} path
 * @param {OpenAPIV3_1.OperationObject} operation
 * @return {Params}
 */
export function getParams(path, operation) {
	const pathParams = [...path.matchAll(/\{(\w+)\}/g)]
		.map(match => {
			const paramName = match[1];
			const paramObj = /** @type OpenAPIV3_1.ParameterObject */ (operation.parameters?.find(p =>
				!isReferenceObject(p)
				&& p.in === 'path'
				&& p.name === paramName
			));
			// TODO
			// if (!paramObj || !paramObj.schema || !("type" in paramObj.schema))
			// 	throw new Error(`Invalid path config "${paramName}". Note, that $ref are not supported yet`);
			
			return /** @type PathParam */ ({
				name: paramName,
				// todo more number types
				type: paramObj?.schema?.type === 'integer' ? 'number' : 'string',
			});
		});

	const queryParams = (operation.parameters ?? [])
		.reduce((acc, p) => {
			if (!isReferenceObject(p) && p.in === 'query')
				acc[p.name] = { type: "number", required: p.required };
			return acc;
		}, /** @type Record<string, QueryParam> */ ({}));

	return {
		path: pathParams,
		query: queryParams,
	};
}
