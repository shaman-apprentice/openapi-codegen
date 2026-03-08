#!/usr/bin/env node

import { parseArgs } from "node:util";
import { OptionsDefinition } from "../src/angular-contract-generator/options.mjs";
import { areOptionsValid, printHelp } from "../src/supporting/options.helper.mjs";
import { ContractGenerator } from "../src/angular-contract-generator/contract.generator.mjs";
import { PackageNameResolver } from "../src/angular-contract-generator/package-name.resolver.mjs";

const { values: options } = parseArgs(OptionsDefinition);

if (options.help) {
  printHelp(
		"generate-angular-contract",
	  'npx generate-angular-contract -i spec.yaml -n "@zoo/angular-contract" -o ./target/angular-contract',
		OptionsDefinition.options
	);
  process.exit(0);
}

if (areOptionsValid(OptionsDefinition.options, options)) {
	const packageNameResolver = await PackageNameResolver.create(options.packageNameResolver);
	let name = options.name ?? "Unset";
	if (options.packageNameResolver)
		name = await packageNameResolver.resolve(options.input);
		
	const generator = new ContractGenerator(
		options.input,
		options.output,
		name,
		parseInt(options.majorAngularVersion)
	);

	await generator.generate();
}
  