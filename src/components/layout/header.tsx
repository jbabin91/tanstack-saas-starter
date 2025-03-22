import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="flex justify-between gap-2 bg-white p-2 text-black">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/start/server-funcs">Start - Server Functions</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/start/api-request">Start - API Request</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/forms/simple">Simple Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/forms/address">Address Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/data/query">TanStack Query</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/data/table">TanStack Table</Link>
        </div>
      </nav>
    </header>
  );
}
