import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as yaml from 'js-yaml';
import { scaffoldAngularProject } from './scaffold-angular-project/scaffold-angular-project.mjs';

export class ContractGenerator {
	pathToInputSpec = '';
	pathToOutput = '';
	packageName = '';
	majorAngularVersion = 21;
	contractVersion = 'x.x.x';

	/**
	 * @param {string} pathToInputSpec 
	 * @param {string} pathToOutput 
	 * @param {string} packageName 
	 * @param {number} [majorAngularVersion]
	 */
	constructor(pathToInputSpec, pathToOutput, packageName, majorAngularVersion) {
		this.pathToInputSpec = pathToInputSpec;
		this.pathToOutput = pathToOutput;
		this.packageName = packageName;
		if (majorAngularVersion !== undefined)
			this.majorAngularVersion = majorAngularVersion;
	}

	async generate() {
		const spec = /** @type {any} */ (yaml.load(readFileSync(this.pathToInputSpec, 'utf8')));
		if (spec?.info?.version)
			this.contractVersion = spec.info.version;


		await scaffoldAngularProject(this);
	}

	getLibPath() {
		return join(this.pathToOutput, 'projects', 'angular-contract');
	}

	/** @param {string} libDir */
	async #generateLib(libDir) {
		// generate types
		// generate client
		// generate public-api.ts
	}
}
