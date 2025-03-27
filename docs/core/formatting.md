# Code Formatting

This guide covers our code formatting tools and configuration.

## Prettier

We use Prettier for consistent code formatting across the project.

### Configuration

Our `.prettierrc.json`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": true,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "always"
}
```

### VSCode Integration

1. Install the Prettier extension
2. Enable "Format on Save"
3. Set Prettier as default formatter

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## EditorConfig

We use EditorConfig to maintain consistent coding styles across different editors and IDEs.

### Configuration

Our `.editorconfig`:

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.{js,jsx,ts,tsx,css,md,html,json}]
indent_style = tab
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

## File Organization

### File Names

- Use kebab-case for file names: `my-component.tsx`
- Test files: `my-component.test.tsx`
- Style files: `my-component.styles.ts`
- Type files: `my-component.types.ts`

### File Extensions

- `.ts` - TypeScript files
- `.tsx` - TypeScript React components
- `.test.ts` - Unit tests
- `.test.tsx` - Component tests
- `.e2e.ts` - End-to-end tests
- `.styles.ts` - Styled components
- `.types.ts` - Type definitions

## Related Documentation

- [Code Style](./code-style.md) - General coding standards
- [TypeScript](./typescript.md) - TypeScript-specific guidelines
- [Project Structure](./project-structure.md) - Project organization
