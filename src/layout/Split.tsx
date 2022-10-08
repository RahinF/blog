interface Props {
  children: React.ReactNode;
}

const Split = ({ children }: Props) => {
  return (
    <main className="m-auto flex min-h-screen max-w-screen-2xl flex-col lg:flex-row">
      {children}
    </main>
  );
};

Split.Left = ({ children }: Props) => {
  return (
    <article className="basis-full pr-20 pt-20 lg:border-r">{children}</article>
  );
};

Split.Right = ({ children }: Props) => {
  return (
    <aside className="flex basis-1/2 flex-col gap-8 px-20 pt-20">
      {children}
    </aside>
  );
};

export default Split;
