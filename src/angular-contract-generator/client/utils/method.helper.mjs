/** @import { Params } from './parameters.helper.mjs' */

export const HTTP_METHODS = /** @type {const} */ (['get', 'put', 'post', 'delete', 'patch']);

/**
 * @typedef {Object} MethodMetadata
 * @property {string} name
 * @property {typeof HTTP_METHODS[number]} httpMethod
 * @property {string} path
 * @property {Params} params
 * @property {string} responseType
 * @property {string | undefined} requestBodyType
 */

/** @param {MethodMetadata} metadata */
export function generateMethod(metadata) {
	const { name, httpMethod, path, params, responseType, requestBodyType } = metadata;
	const queryEntries = Object.entries(params.query);
	const queryType = queryEntries.length > 0
		? `{ ${queryEntries.map(([queryName, queryParam]) => `${queryName}${queryParam.required ? '' : '?'}: ${queryParam.type}`).join('; ')} }`
		: undefined;
	const methodParams = [
		...params.path.map(param => `${param.name}: ${param.type}`),
		...(queryType ? [`query?: ${queryType}`] : []),
		...(requestBodyType ? [`body: ${requestBodyType}`] : []),
	];

	const urlPath = params.path
		.reduce(
			(acc, pathParam) => acc.replace(`{${pathParam.name}}`, `\${${pathParam.name}}`),
			path,
		);
	const urlArg = params.path.length > 0 ? `\`${urlPath}\`` : `'${path}'`;

	const queryOptionsArg = queryEntries.length > 0
		? `{ params: query }`
		: undefined;

	const isBodyMethod = httpMethod === 'post' || httpMethod === 'put' || httpMethod === 'patch';
	const callArgs = [urlArg];
	if (isBodyMethod) {
		callArgs.push(requestBodyType ? 'body' : 'null');
		if (queryOptionsArg)
			callArgs.push(queryOptionsArg);
	} else if (queryOptionsArg) {
		callArgs.push(queryOptionsArg);
	}

	return `${name}(${methodParams.join(', ')}): Observable<${responseType}> {
		return this.#http.${httpMethod}<${responseType}>(${callArgs.join(', ')});
	}`;
}
