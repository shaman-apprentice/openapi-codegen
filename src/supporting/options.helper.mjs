/** @typedef {import('node:util').ParseArgsOptionDescriptor & {helpMsg?: string; required?: boolean}} OptionDescriptor */

/**
 * @typedef {Object} ParseArgsOptionsConfig
 * @property {Record<string, OptionDescriptor>} options
 * @property {true} strict
 */

/** @typedef {Record<string, OptionDescriptor>} Options */

/**
 * @param {string} name 
 * @param {string} example 
 * @param {Options} options 
 */
export function printHelp(name, example, options) {
	const lines = [];
	lines.push(`Usage: ${name} [options]`);
	lines.push(`Example: ${example}`);
	lines.push('Options:');

	// Build parts and compute padding so columns align nicely
	const rows = Object.entries(options).map(([name, def]) => {
		const short = def.short ? `-${def.short}` : '  ';
		const long = `--${name}`;
		const paramInfo = def.short ? `${short}, ${long}` : `    ${long}`;
		const defaultText = 'default' in def ? JSON.stringify(def.default) : "-";
		const requiredText = 'required' in def ? def.required : false;
		return {
			paramInfo,
			typeInfo: `type: ${def.type}, required: ${requiredText}, default: ${defaultText}`,
			helpMsg: def.helpMsg,
		};
	});

	const maxParamText = rows.reduce((max, row) => Math.max(max, row.paramInfo.length), 0);
	const maxTypeInfo = rows.reduce((max, row) => Math.max(max, row.paramInfo.length), 0);

	for (const row of rows) {
		const paddedParamInfo = row.paramInfo.padEnd(maxParamText);
		const paddedTypeInfo = row.typeInfo.padEnd(maxTypeInfo);
		lines.push(`  ${paddedParamInfo}  (${paddedTypeInfo}): ${row.helpMsg}`);
	}

	console.log(lines.join('\n'));
}

/**
 * Type guard that validates all required options are present.
 * After this returns true, TypeScript knows all required options are defined.
 * 
 * @template {Record<string, OptionDescriptor>} TOptions
 * @template {Record<string, any>} TGiven
 * @param {TOptions} options - The option descriptors defining required fields
 * @param {TGiven} given - The parsed options to validate
 * @returns {given is TGiven & {[K in keyof TOptions as TOptions[K] extends {required: true} ? K : never]-?: Exclude<TGiven[K], undefined>}}
 */
export function areOptionsValid(options, given) {
	const missingRequiredOptions = Object.entries(options)
		.filter(([key, value]) => 'required' in value && value.required && given[key] === undefined)
		.map(([key]) => `"${key}"`);
	
	if (missingRequiredOptions.length > 0) {
		console.error(`Missing options: ${missingRequiredOptions.join(', ')}`);
		process.exit(1);
	}

	return true;
}