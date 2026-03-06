/**
 * @param {string} packageName 
 * @param {number} majorAngularVersion 
 */
export function rootPackageJsonContent(packageName, majorAngularVersion) {
	return `{
	"name": "${packageName}",
	"version": "0.0.0",
	"private": true,
	"scripts": {
		"build": "ng build ${packageName}"
	},
	"dependencies": {
		"@angular/common": "^${majorAngularVersion}.0.0",
    "@angular/compiler": "^${majorAngularVersion}.0.0",
    "@angular/core": "^${majorAngularVersion}.0.0"
	},
	"devDependencies": {
		"@angular/build": "^${majorAngularVersion}.0.0",
    "@angular/cli": "^${majorAngularVersion}.0.0",
    "@angular/compiler-cli": "^${majorAngularVersion}.0.0",
		"ng-packagr": "^${majorAngularVersion}.0.0"
	}
}`;
}

/**
 * @param {string} packageName 
 * @param {string} packageVersion 
 * @param {number} majorAngularVersion 
 */
export function libPackageJsonContent(packageName, packageVersion, majorAngularVersion) {
	return `{
	"name": "${packageName}",
	"version": "${packageVersion}",
	"sideEffects": false,
	"peerDependencies": {
		"@angular/common": "^${majorAngularVersion}.0.0",
    "@angular/core": "^${majorAngularVersion}.0.0",
		"rxjs": "^7.8.2"
	},
	"dependencies": {
		"tslib": "^2.8.1"
	}
}`;
}
