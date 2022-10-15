import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  classes?: string;
}

const Split = ({ children, classes }: Props) => {
  return (
    <main
      className={clsx({
        "min-h-screen max-w-screen-lg": true,
        "m-auto flex flex-col gap-20 px-4 py-20": true,
        "lg:flex-row xl:px-0": true,
        [classes as string]: classes,
      })}
    >
      {children}
    </main>
  );
};

Split.Left = ({ children, classes }: Props) => {
  return (
    <article
      className={clsx("basis-full", {
        [classes as string]: classes,
      })}
    >
      {children}
    </article>
  );
};

Split.Right = ({ children, classes }: Props) => {
  return (
    <aside
      className={clsx("basis-1/2", {
        [classes as string]: classes,
      })}
    >
      {children}
    </aside>
  );
};

export default Split;
