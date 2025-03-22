# React 19

React is a JavaScript library for building user interfaces. This project uses React 19, which introduces several new features and improvements over previous versions.

## Key Features in React 19

- Improved performance with automatic memoization
- New concurrent rendering features
- Enhanced support for server components
- Simplified APIs for common patterns

## Project Usage

In this project, React 19 is used as the core UI library. Key integration points include:

- Integration with TanStack Router for routing
- Integration with TanStack Query for data fetching
- Use of modern React patterns like hooks and functional components

## Common Patterns

```tsx
// Functional component with hooks
function MyComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  const { isPending, error } = useTransition();

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, []);

  return <div>{/* JSX content */}</div>;
}
```

## Resources

- [Official React Documentation](https://react.dev/)
- [React 19 Release Notes](https://react.dev/blog)
- [TanStack React Integration](https://tanstack.com/)
