import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as yaml from 'js-yaml';
import { scaffoldAngularProject } from './scaffold-angular-project/scaffold-angular-project.mjs';
import { writeFile } from 'node:fs/promises';
import { modelContent } from './model/model.generator.mjs';
import { apiClientContent } from './client/api-client.generator.mjs';
import { PackageNameResolver } from './package-name.resolver.mjs';

export class ContractGenerator {
	pathToInputSpec = '';
	pathToOutput = '';
	packageName = '';
	majorAngularVersion = 21;
	contractVersion = 'x.x.x';
	packageNameResolver;

	/**
	 * @param {string} pathToInputSpec 
	 * @param {string} pathToOutput 
	 * @param {string} packageName
	 * @param {PackageNameResolver} packageNameResolver
	 * @param {number} [majorAngularVersion]
	 */
	constructor(pathToInputSpec, pathToOutput, packageName, packageNameResolver, majorAngularVersion) {
		this.pathToInputSpec = pathToInputSpec;
		this.pathToOutput = pathToOutput;
		this.packageName = packageName;
		this.packageNameResolver = packageNameResolver;
		if (majorAngularVersion !== undefined)
			this.majorAngularVersion = majorAngularVersion;
	}

	async generate() {
		const spec = /** @type {any} */ (yaml.load(readFileSync(this.pathToInputSpec, 'utf8')));
		if (spec.info?.version)
			this.contractVersion = spec.info.version;

		await scaffoldAngularProject(this);

		const publicApiExports = [
			`export { ApiClient } from './angular.client';`,
			`export * from './model';`,
		];

		await Promise.all([
			writeFile(join(this.getLibPath(), 'src', 'angular.client.ts'), apiClientContent(spec.paths || {})),
			writeFile(join(this.getLibPath(), 'src', 'model.ts'), modelContent(spec.components.schemas)),
			writeFile(join(this.getLibPath(), 'src', 'public-api.ts'), publicApiExports.join('\n') + '\n'),
		]);

		// add externals to package.json as peerDependencies
	}

	getLibPath() {
		return join(this.pathToOutput, 'projects', 'angular-contract');
	}
}
