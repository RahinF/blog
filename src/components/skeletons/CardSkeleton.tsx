interface ICardSkeleton {
  fullSize?: boolean;
  count: number;
}

const CardSkeleton = ({ fullSize, count }: ICardSkeleton) => {
  return (
    <>
      {[...Array(count)].map((_, index) =>
        fullSize ? (
          <CardSkeleton.Full key={index} />
        ) : (
          <CardSkeleton.Default key={index} />
        )
      )}
    </>
  );
};

CardSkeleton.Default = () => {
  return (
    <div className="grid animate-pulse gap-2 py-6 first:pt-0 last:pb-0">
      <div className="h-4 w-1/4 bg-slate-200" />
      <div className="h-4 w-full bg-slate-200" />
      <div className="h-4 w-full bg-slate-200" />
    </div>
  );
};

CardSkeleton.Full = () => {
  return (
    <div className="grid animate-pulse gap-2">
      <div className="aspect-video bg-slate-200" />

      <div className="grid gap-2">
        <div className="h-4 w-1/4 bg-slate-200" />
        <div className="h-4 w-full bg-slate-200" />
        <div className="h-4 w-full bg-slate-200" />
      </div>
    </div>
  );
};

export default CardSkeleton;
