import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-32 items-center border-b bg-white/90">
      <div className="m-auto flex w-full max-w-screen-lg items-baseline justify-between">
        <a href="#skip-navigation" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <h1 className="text-3xl font-bold uppercase tracking-wider">blog</h1>
        <nav className="">
          <ul className="flex gap-4 font-medium capitalize">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/write">write</Link>
            </li>
            <li>
              <Link to="/post/1">post</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="skip-navigation" tabIndex={-1} />
    </header>
  );
};

export default Header;
