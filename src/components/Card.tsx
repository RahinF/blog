import IPost from "../types/IPost";

interface Props {
  post: IPost;
  fullSize?: boolean;
}

const Card = ({ post, fullSize }: Props) => {
  if (fullSize)
    return (
      <article className="group">
        <img
          className="max-h-60 w-full object-cover transition group-hover:scale-105 group-hover:shadow-lg"
          src={post.image}
          alt={post.title}
        />

        <div className="mt-4 flex flex-col gap-2">
          <header>
            <Card.Category category={post.category} />
            <Card.Heading title={post.title} />
          </header>

          <p className="text-sm line-clamp-3">{post.text}</p>
        </div>
      </article>
    );

  return (
    <article className="py-10 first:pt-0 last:pb-0">
      <Card.Category category={post.category} />
      <Card.Heading title={post.title} />
    </article>
  );
};

Card.Heading = ({ title }: { title: string }) => {
  return <h1 className="font-bold">{title}</h1>;
};

Card.Category = ({ category }: { category: string }) => {
  return (
    <span className="text-sm font-medium capitalize text-primary">
      {category}
    </span>
  );
};

export default Card;
