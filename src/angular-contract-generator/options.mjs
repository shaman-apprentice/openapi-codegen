/** @satisfies {import('../supporting/options.helper.mjs').ParseArgsOptionsConfig} */
export const OptionsDefinition = {
  options: {
    help: { type: "boolean", short: "h", default: false, helpMsg: "Show this help message" },
    input: { type: "string",  short: "i", required: true, helpMsg: "Path to openapi yaml spec file" },
    name: { type: "string",  short: "n", required: true, helpMsg: "Name of generated npm package" },
    output: { type: "string", short: "o", required: true, helpMsg: "Path to output folder of generated angular client"},
  },
  strict: true,
};
