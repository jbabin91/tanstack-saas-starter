# Conventional Commits

## Overview

Conventional Commits is a specification for adding human and machine-readable meaning to commit messages. This convention dovetails with [SemVer](https://semver.org/), by describing features, fixes, and breaking changes in commit messages.

## Commit Message Structure

```sh
<type>[(optional scope)]: <description>

[optional body]

[optional footer(s)]
```

## Types

- `feat`: ✨ A new feature
- `fix`: 🐛 A bug fix
- `docs`: 📝 Documentation only changes
- `style`: 💄 Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: ♻️ A code change that neither fixes a bug nor adds a feature
- `perf`: ⚡️ A code change that improves performance
- `test`: ✅ Adding missing tests or correcting existing tests
- `build`: 📦 Changes that affect the build system or external dependencies
- `ci`: 👷 Changes to CI configuration files and scripts
- `chore`: 🔨 Other changes that don't modify src or test files
- `revert`: ⏪️ Reverts a previous commit

## Scopes

Common scopes for this project:

- `ui`: Component and styling changes
- `api`: Backend endpoint changes
- `docs`: Documentation updates
- `test`: Testing-related changes
- `forms`: Form components and logic
- `router`: Routing-related changes
- `query`: Data fetching and caching
- `deps`: Dependency updates
- `config`: Configuration changes
- `auth`: Authentication-related changes
- `types`: TypeScript type changes

Each scope represents a specific area of the codebase. Choose the most appropriate scope for your changes. Multiple scopes can be combined using commas when changes affect multiple areas: `feat(ui,forms): add new form component with validation`

### Scope Descriptions

| Scope    | Description                    |
| -------- | ------------------------------ |
| `ui`     | Component and styling changes  |
| `api`    | Backend endpoint changes       |
| `docs`   | Documentation updates          |
| `test`   | Testing-related changes        |
| `forms`  | Form components and logic      |
| `router` | Routing-related changes        |
| `query`  | Data fetching and caching      |
| `deps`   | Dependency updates             |
| `config` | Configuration changes          |
| `auth`   | Authentication-related changes |
| `types`  | TypeScript type changes        |

## Quick Commands (Aliases)

The following alias is available for quick commits:

- `b`: Quick dependency updates (`chore(deps):🔨`)

## Examples

### Feature with Emoji

```sh
feat(auth): ✨ add login with Google OAuth
```

### Bug Fix with Emoji

```sh
fix(api): 🐛 handle null response from user endpoint
```

### Documentation with Emoji

```sh
docs(readme): 📝 update installation instructions
```

### Breaking Change

```sh
feat(api)!: ✨ remove deprecated user endpoints

BREAKING CHANGE: The /api/v1/users endpoint has been removed. Use /api/v2/users instead.
```

### Multiple Scopes

```sh
feat(ui,forms): ✨ add new form component with validation
```

### Using Aliases

```sh
# Using 'b' for dependency updates
b "update react to v19"
```

## Rules

1. Commits MUST be prefixed with a type from the list above
2. Types MUST be in lowercase
3. Messages MUST be in present tense ("add feature" not "added feature")
4. Description MUST immediately follow the colon and space after type/scope
5. A scope MAY be provided after a type
6. A scope MUST consist of noun describing a section of the codebase surrounded by parenthesis
7. A description MUST immediately follow the colon and space after the type/scope prefix
8. A longer commit body MAY be provided after the short description
9. Breaking changes MUST be indicated by a `!` after the type/scope and/or a `BREAKING CHANGE:` footer
10. Maximum subject length is 100 characters
11. Breaking changes are only allowed in `feat` and `fix` commits

## Configuration

This project uses `commitlint` with `cz-git` for commit message linting and interactive commit creation. The configuration includes:

- Emoji support enabled by default
- Type-safe configuration using TypeScript
- Predefined scopes with descriptions for better clarity
- Skip prompts for footer and scope to streamline commit process
- Maximum subject length of 100 characters
- Breaking changes allowed only for `feat` and `fix` types
- Smart aliases for common dependency updates and fixes
- No custom issue prefix support for consistent commit messages
- Optional body and breaking change sections for detailed changes when needed

## Benefits

- Automatically generating CHANGELOGs
- Automatically determining semantic version bumps
- Communicating the nature of changes to teammates and stakeholders
- Making it easier for people to contribute to your projects
- Consistent commit history with emoji support
- Quick commits using aliases for common changes

## Tools

- [commitlint](https://commitlint.js.org/) - Lint commit messages
- [cz-git](https://cz-git.qbb.sh/) - Customizable commitizen adapter
- [commitizen](https://commitizen.github.io/cz-cli/) - Command line utility to format commit messages
- [standard-version](https://github.com/conventional-changelog/standard-version) - Automate versioning and CHANGELOG generation

## References

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
- [cz-git Documentation](https://cz-git.qbb.sh/)
