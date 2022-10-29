import { List } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const links = [
  {
    to: "/",
    text: "home",
  },
  {
    to: "/write",
    text: "write",
  },
  {
    to: "/post/1",
    text: "post",
  },
  {
    to: "/login",
    text: "login",
  },
  {
    to: "/register",
    text: "register",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const skipToContentRef = useRef<HTMLDivElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const skipToContent = () => {
    if (!skipToContentRef.current) return;
    skipToContentRef.current.focus();
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "visible";
  }, [isMenuOpen]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isMenuOpen || !lastLinkRef.current || !buttonRef.current) return;

    if (event.code === "Escape") {
      setIsMenuOpen(false);
    }

    if (document.activeElement === buttonRef.current) {
      if (event.shiftKey && event.code === "Tab") {
        event.preventDefault();
        lastLinkRef.current.focus();
      }
    }

    if (document.activeElement === lastLinkRef.current) {
      if (event.code === "Tab" && !event.shiftKey) {
        event.preventDefault();
        buttonRef.current.focus();
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const focusOnMenu = (event: React.MouseEvent) => {
    if (!isMenuOpen || !buttonRef.current) return;
    event.preventDefault();
    buttonRef.current.focus();
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white/75 backdrop-blur-md">
      <div className="flex w-full justify-center bg-black">
        <button
          className="sr-only text-white focus:not-sr-only"
          onClick={skipToContent}
        >
          Skip to content
        </button>
      </div>

      <div className="flex h-32 items-center" onClick={focusOnMenu}>
        <div className="m-auto flex w-full max-w-screen-lg items-baseline justify-between px-4 xl:px-0">
          <Link to="/" aria-label="home">
            <h1 className="text-3xl font-bold uppercase tracking-wider">
              blog
            </h1>
          </Link>

          <nav onKeyDown={handleKeyPress}>
            <button
              className="flex items-center gap-2 p-4"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
              ref={buttonRef}
            >
              <List size={32} aria-hidden />
              <span className="font-bold uppercase">menu</span>
            </button>

            {isMenuOpen && (
              <div className="fixed left-0 top-32 mt-px h-screen w-full bg-white/90">
                <ul className="m-auto mt-20 flex h-full max-w-screen-lg flex-col items-center gap-4 px-4 xl:px-0">
                  {links.map((link, index) => {
                    const isLastLink = index === links.length - 1;

                    return (
                      <li
                        key={link.text}
                        onClick={closeMenu}
                        className="py-4 text-xl font-medium capitalize transition hover:scale-105"
                      >
                        <Link
                          to={link.to}
                          {...(isLastLink && { ref: lastLinkRef })}
                        >
                          {link.text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </nav>
        </div>
        <div ref={skipToContentRef} tabIndex={-1} />
      </div>
    </header>
  );
};

export default Header;
