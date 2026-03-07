/** @import { OpenAPIV3_1 } from 'openapi-types' */

/**
 * Checks whether a value is an OpenAPI ReferenceObject.
 *
 * @param {Object} obj
 * @returns {obj is OpenAPIV3_1.ReferenceObject}
 */
export function isReferenceObject(obj) {
	return "$ref" in obj;
}
