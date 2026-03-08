/** @satisfies {import('../supporting/options.helper.mjs').ParseArgsOptionsConfig} */
export const OptionsDefinition = {
  options: {
    help: { type: "boolean", short: "h", default: false, helpMsg: "Show this help message" },
    input: { type: "string",  short: "i", required: true, helpMsg: "Path to openapi yaml spec file" },
    name: { type: "string",  short: "n", helpMsg: "Name of generated npm package" },
    output: { type: "string", short: "o", required: true, helpMsg: "Path to output folder of generated angular client"},
    majorAngularVersion: { type: "string", short: "a", default: "21", helpMsg: "Major Angular version like '21'"},
    packageNameResolver: { type: "string", short: "p", helpMsg: "Path to .mjs file exporting a default function `(yamlPath: string) => Promise<string>` that resolves a referenced yaml path to a package name. If not provided, 'name' options must be provided."},
  },
  strict: true,
};
