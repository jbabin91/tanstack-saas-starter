import { createFileRoute } from '@tanstack/react-router';

import logo from '@/assets/logo.svg';

export const Route = createFileRoute('/_public/')({
  component: Home,
});

function Home() {
  return (
    <div className="text-center">
      <header className="flex flex-col items-center justify-center">
        <img
          alt="logo"
          className="pointer-events-none h-[40vmin] animate-[spin_20s_linear_infinite]"
          src={logo}
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  );
}
