export function tsConfigContent() {
	return `{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" }
  ]
}`;
}

export function tsConfigLibContent() {
	return `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"outDir": "../../out-tsc/lib",
		"declaration": true,
		"declarationMap": true,
		"inlineSources": true,
		"types": []
	}
}`;
}

export function tsConfigLibProdContent() {
	return `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"declarationMap": false
	},
	"angularCompilerOptions": {
		"compilationMode": "partial"
	}
}`;
}
