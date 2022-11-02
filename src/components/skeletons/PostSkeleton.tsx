const PostSkeleton = () => {
  return (
    <div className="grid animate-pulse gap-10">
      <div className="grid gap-2">
        <div className="h-4 w-1/4 bg-slate-200" />
        <div className="h-4 w-full bg-slate-200" />
        <div className="h-4 w-full bg-slate-200" />
        <div className="h-4 w-1/4 bg-slate-200" />
      </div>
      <div className="aspect-video bg-slate-200" />

      <div className="grid gap-6">
        <PostSkeleton.Paragraph />
        <PostSkeleton.Paragraph />
      </div>
    </div>
  );
};

PostSkeleton.Paragraph = () => {
  return (
    <div className="grid gap-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="h-4 w-full bg-slate-200" />
      ))}
      <div className="h-4 w-1/4 bg-slate-200" />
    </div>
  );
};

export default PostSkeleton;
