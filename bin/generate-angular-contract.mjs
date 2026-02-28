import { parseArgs } from "node:util";
import { OptionsDefinition } from "../src/angular-contract-generator/options.mjs";
import { areOptionsValid, printHelp } from "../src/supporting/options.helper.mjs";

const { values: options } = parseArgs(OptionsDefinition);

if (options.help) {
  printHelp(
		"generate-angular-contract",
	  "TODO", // npx generate-angular-contract -i -n -o
		OptionsDefinition.options
	);
  process.exit(0);
}

if (areOptionsValid(OptionsDefinition.options, options)) {
	
}
  