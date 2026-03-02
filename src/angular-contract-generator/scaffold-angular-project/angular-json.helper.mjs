/**
 * @param {string} packageName 
 */
export function angularJsonContent(packageName) {
	return `{
	"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
	"version": 1,
	"newProjectRoot": "projects",
	"projects": {
		"${packageName}": {
			"projectType": "library",
			"root": "projects/angular-contract",
			"sourceRoot": "projects/angular-contract/src",
			"architect": {
				"build": {
					"builder": "@angular/build:ng-packagr",
					"options": {
						"project": "projects/angular-contract/ng-package.json"
					},
					"configurations": {
						"production": {
							"tsConfig": "projects/angular-contract/tsconfig.lib.prod.json"
						},
						"development": {
							"tsConfig": "projects/angular-contract/tsconfig.lib.json"
						}
					},
					"defaultConfiguration": "production"
				},
			}
		}
	}
}`
}
