#!/usr/bin/env node

import { writeFile, mkdir } from 'node:fs/promises';
import { libPackageJsonContent, rootPackageJsonContent } from './package-json.helper.mjs';
import { angularJsonContent } from './angular-json.helper.mjs';
import { tsConfigContent, tsConfigLibContent, tsConfigLibProdContent } from './ts-config.helper.mjs';
import { ngPackageJsonContent } from './ng-package-json.helper.mjs';
import { join } from 'node:path';

/** @param {import('../contract.generator.mjs').ContractGenerator} g */
export async function scaffoldAngularProject(g) {
	const libPath = g.getLibPath();
	await mkdir(join(libPath, 'src'), { recursive: true });
	await mkdir(g.pathToOutput, { recursive: true });

	await Promise.all([
		writeFile(join(g.pathToOutput, 'package.json'), rootPackageJsonContent(g.packageName, g.majorAngularVersion)),
		writeFile(join(g.pathToOutput, 'angular.json'), angularJsonContent(g.packageName)),
		writeFile(join(g.pathToOutput, 'tsconfig.json'), tsConfigContent()),
	]);

	await Promise.all([
		writeFile(join(libPath, 'package.json'), libPackageJsonContent(g.packageName, g.contractVersion, g.majorAngularVersion)),
		writeFile(join(libPath, 'tsconfig.lib.json'), tsConfigLibContent()),
		writeFile(join(libPath, 'tsconfig.lib.prod.json'), tsConfigLibProdContent()),
		writeFile(join(libPath, 'ng-package.json'), ngPackageJsonContent())
	]);
}
