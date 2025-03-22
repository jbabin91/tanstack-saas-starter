# Markdown Guidelines

This document outlines our project's Markdown formatting guidelines to maintain consistency across all documentation files.

## File Configuration

Markdown files follow these formatting rules:

- Line width: 120 characters (configured in Prettier)
- Indentation: 2 spaces
- Line endings: LF (Unix-style)
- UTF-8 encoding
- Trim trailing whitespace: true
- Final newline: false (configured in .editorconfig)

## Tables

To maintain readability and follow linting rules, tables must:

- Have blank lines before and after them
- Use proper column alignment
- Keep column headers brief and descriptive

Example of correct table formatting:

| Category | Description |
| -------- | ----------- |
| Simple   | Basic info  |

Large tables should be split into sections:

**Section 1: Core Features**

| Feature | Details |
| ------- | ------- |
| One     | Info    |

**Section 2: Advanced Features**

| Feature | Details |
| ------- | ------- |
| Two     | Info    |

Common table formatting issues to avoid:

- Missing blank lines around tables (MD058)
- Inconsistent column alignment
- Missing header separators

## Code Blocks

Use triple backticks with language specification:

```typescript
const example = 'code';
```

For inline code, use single backticks: `example`.

## Links

Use relative paths for internal documentation:

```markdown
[Code Style](./code-style.md)
[Project Structure](../project-structure.md)
```

Use descriptive text for external links:

```markdown
[Official React Documentation](https://react.dev/)
```

## Lists

Unordered lists use hyphens:

- Item 1
- Item 2
  - Nested item
  - Another nested item

Ordered lists use numbers:

1. First step
2. Second step
   1. Sub-step
   2. Another sub-step

## Headers

Use ATX-style headers with a single space after the #:

```markdown
# Top Level Header

## Second Level

### Third Level
```

Maintain a logical header hierarchy, never skip levels (e.g., don't go from ## to ####).

## Text Formatting

- **Bold**: Use double asterisks
- _Italic_: Use single asterisks
- `Code`: Use backticks
- ~~Strikethrough~~: Use double tildes

## Quotes

Use > for blockquotes:

> Important information or notable quotes
> Can span multiple lines

## Images

Include alt text and use relative paths for local images:

```markdown
![Alt text](../../public/logo.svg)
```

## Line Spacing

- Use one blank line before and after headers
- Use one blank line between paragraphs
- Use one blank line before and after lists
- Use one blank line before and after code blocks

## Best Practices

1. Keep content focused and well-organized
2. Use descriptive headers
3. Maintain consistent formatting
4. Break down large documents into logical sections
5. Keep line length reasonable for better readability
6. Use proper indentation for nested content
7. Include a table of contents for longer documents

## Resources

- [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Markdown Guide](https://www.markdownguide.org/)
- [CommonMark Spec](https://commonmark.org/)
