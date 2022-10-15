interface Props {
  children: React.ReactNode;
}

const Split = ({ children }: Props) => {
  return (
    <main className="m-auto flex min-h-screen max-w-screen-lg flex-col lg:flex-row">
      {children}
    </main>
  );
};

Split.Left = ({ children }: Props) => {
  return (
    <article className="basis-full pr-10 pt-20 lg:border-r">{children}</article>
  );
};

Split.Right = ({ children }: Props) => {
  return (
    <aside className="flex basis-1/2 flex-col gap-8 pl-10 py-20">
      {children}
    </aside>
  );
};

export default Split;
