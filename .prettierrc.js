/** @type {import("prettier").Config} */
export default {
  // Experimental options
  experimentalOperatorPosition: 'start', // Controls where operators are positioned in expressions ('start' or 'end')
  experimentalTernaries: true, // New ternary formatting
  // Experimental HTML/JSX formatting
  objectWrap: 'preserve', // Controls object literal wrapping ('always', 'never', or 'preserve')
  // Override settings for specific file types
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 120, // Wider line length for markdown files
      },
    },
  ],
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  printWidth: 80, // Default line length for most files
  singleAttributePerLine: false,
  singleQuote: true,
};
