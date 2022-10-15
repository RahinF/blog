import { useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const skipToContentRef = useRef<HTMLDivElement>(null);

  const skipToContent = () => {
    if (skipToContentRef.current) {
      skipToContentRef.current.focus();
    }
  };

  return (
    <header className="sticky top-0 border-b bg-white/90">
      <div className="flex w-full justify-center bg-black">
        <button
          className="sr-only text-white focus:not-sr-only"
          onClick={() => skipToContent()}
        >
          Skip to content
        </button>
      </div>

      <div className="flex h-32 items-center">
        <div className="m-auto flex w-full max-w-screen-lg items-baseline justify-between">
          <h1 className="text-3xl font-bold uppercase tracking-wider">blog</h1>
          <nav>
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
        <div ref={skipToContentRef} tabIndex={-1} />
      </div>
    </header>
  );
};

export default Header;
