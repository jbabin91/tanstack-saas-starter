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

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

## Examples

### Feature

```sh
feat(auth): add login with Google OAuth
```

### Bug Fix

```sh
fix(api): handle null response from user endpoint
```

### Documentation

```sh
docs(readme): update installation instructions
```

### Breaking Change

```sh
feat(api)!: remove deprecated user endpoints

BREAKING CHANGE: The /api/v1/users endpoint has been removed. Use /api/v2/users instead.
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

## Benefits

- Automatically generating CHANGELOGs
- Automatically determining semantic version bumps
- Communicating the nature of changes to teammates and stakeholders
- Making it easier for people to contribute to your projects

## Tools

- [commitlint](https://commitlint.js.org/) - Lint commit messages
- [commitizen](https://commitizen.github.io/cz-cli/) - Command line utility to format commit messages
- [standard-version](https://github.com/conventional-changelog/standard-version) - Automate versioning and CHANGELOG generation

## References

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
