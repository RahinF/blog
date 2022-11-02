const CommentSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <CommentSkeleton.Default key={index} />
      ))}
    </>
  );
};

CommentSkeleton.Default = () => {
  return (
    <div className="mt-4 grid animate-pulse gap-6 py-4">
      <div className="grid gap-2">
        <div className="h-4 w-1/4 bg-slate-200" />
        <div className="h-4 w-1/6 bg-slate-200" />
      </div>

      <div className="grid gap-2">
        <div className="h-4 w-full bg-slate-200" />
        <div className="h-4 w-full bg-slate-200" />
        <div className="h-4 w-1/2 bg-slate-200" />
      </div>

      <div className="flex gap-2">
        <div className="h-4 w-1/4 bg-slate-200" />
        <div className="h-4 w-1/6 bg-slate-200" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
