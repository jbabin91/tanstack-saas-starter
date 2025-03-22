/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  printWidth: 80, // Default line length for most files

  // Experimental options
  experimentalTernaries: true, // New ternary formatting
  singleAttributePerLine: false, // Experimental HTML/JSX formatting
  objectWrap: 'preserve', // Controls object literal wrapping ('always', 'never', or 'preserve')
  experimentalOperatorPosition: 'start', // Controls where operators are positioned in expressions ('start' or 'end')

  // Override settings for specific file types
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 120, // Wider line length for markdown files
      },
    },
  ],
};
