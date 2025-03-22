/** @type {import("lint-staged").Config} */
export default {
  // Type check TypeScript files
  '*.(ts|tsx)': () => 'pnpm typecheck',
  // Lint files
  '*.(ts|tsx|js|jsx|cjs|mjs)': () => 'pnpm lint',
  // Format files
  '*.(ts|tsx|js|jsx|cjs|mjs|json|md|mdx)': (files) =>
    `pnpm prettier -uc ${files.join(' ')}`,
};
