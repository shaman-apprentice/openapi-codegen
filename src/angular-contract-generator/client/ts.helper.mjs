/** @import { OpenAPIV3_1 } from 'openapi-types' */

/**
 * @param {'get' | 'put' | 'post' | 'delete' | 'patch'} httpMethod
 * @param {string} path
 */
export function toMethodName(httpMethod, path) {
	return httpMethod + path
		.split('/')
		.filter(segment => segment)
		.map(pathSegmentToMethodNamePart)
		.join('');
}

/** @param {string} segment */
function pathSegmentToMethodNamePart(segment) {
	if (segment.startsWith('{') && segment.endsWith('}'))
		return 'By' + toPascalCase(segment.slice(1, -1));
	return toPascalCase(segment);
}

/** @param {string} str */
function toPascalCase(str) {
	return str
		.split('-')
		.map(p => p.charAt(0).toUpperCase() + p.slice(1))
		.join('');
}
