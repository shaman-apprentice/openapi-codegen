export function ngPackageJsonContent() {
	return `{
	"$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
	"dest": "../../dist/angular-contract",
	"lib": {
		"entryFile": "src/public-api.ts"
	}
}`;
}