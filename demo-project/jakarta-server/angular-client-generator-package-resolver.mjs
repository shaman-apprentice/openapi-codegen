/** @param {string} yamlPath */
export default function resolvePackageName(yamlPath) {
  return `@zoo/${yamlPath.split('/')[1]}`;
}
