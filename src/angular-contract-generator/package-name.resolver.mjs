import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

/** @typedef {(yamlPath: string) => Promise<string>} PackageNameResolverFn */

export class PackageNameResolver {
	#resolverFn;
	/** @type {Map<string, string>} yamlPath to resolved package name */
	#externals = new Map();

	/** @param {PackageNameResolverFn} resolverFn */
	constructor(resolverFn) {
		this.#resolverFn = resolverFn
	}

	/** @param {string} [pathToResolver] */
	static async create(pathToResolver) {
		const fn = await PackageNameResolver.#loadResolver(pathToResolver);
		return new PackageNameResolver(fn);
	}

	/** @param {string} yamlPath */
	async resolve(yamlPath) {
		const cached = this.#externals.get(yamlPath);
		if (cached !== undefined)
			return cached;

		const packageName = await this.#resolverFn(yamlPath);
		this.#externals.set(yamlPath, packageName);
		return packageName;
	}

	/**
	 * @param {string} [resolverPath]
	 * @returns {Promise<PackageNameResolverFn>}
	 */
	static async #loadResolver(resolverPath) {
		if (!resolverPath) 
			return (_yamlPath) => {
				throw new Error(`Provide a resolver via --packageNameResolver to resolve references to external openapi files.`);
			};

		const absolutePath = resolve(resolverPath);
		const module = await import(pathToFileURL(absolutePath).href);

		if (typeof module.default !== 'function')
			throw new Error(`The resolver file "${resolverPath}" must export a default function.`);

		return module.default;
	}
}
