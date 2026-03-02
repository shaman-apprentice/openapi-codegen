/** @import { TypeParser } from './type-parser-registry.mjs' */

/** @type {TypeParser} */
export const ObjectParser = {
	toTSType(schema, registry) {
		const props = schema.properties;
		if (!props || Object.keys(props).length === 0) {
			return 'Record<string, unknown>';
		}

		const required = new Set(schema.required || []);
		const lines = Object.entries(props).map(([propName, propSchema]) => {
			const type = registry.toTSType(propSchema);
			const optional = required.has(propName) ? '' : '?';

			if (type.includes('\n')) {
				const typeLines = type.split('\n');
				const parts = [];
				parts.push(`  ${propName}${optional}: ${typeLines[0]}`);
				for (let i = 1; i < typeLines.length - 1; i++) {
					parts.push(`  ${typeLines[i]}`);
				}
				parts.push(`  ${typeLines[typeLines.length - 1]};`);
				return parts.join('\n');
			}

			return `  ${propName}${optional}: ${type};`;
		});

		return `{\n${lines.join('\n')}\n}`;
	},

	toTSDeclaration(name, schema, registry) {
		const tsType = this.toTSType(schema, registry);

		if (tsType === 'Record<string, unknown>')
			return `export type ${name} = Record<string, unknown>;`;

		return `export interface ${name} ${tsType}`;
	},
};
