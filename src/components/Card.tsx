import { Link } from "react-router-dom";
import IPost from "../types/IPost";

interface ICard {
  post: IPost;
  fullSize?: boolean;
}

interface ICardContainer {
  id: string;
  className: string;
  children: React.ReactNode;
}

const Card = ({ post, fullSize }: ICard) => {
  if (fullSize)
    return (
      <Card.Container id={post._id} className="group">
        <img
          className="max-h-60 w-full object-cover transition group-hover:scale-105 group-hover:shadow-lg"
          src={`http://localhost:4000/uploads/${post.image}`}
          alt={post.title}
        />

        <div className="mt-4 flex flex-col gap-2">
          <header>
            <Card.Category category={post.category} />
            <Card.Heading title={post.title} />
          </header>

          <p className="text-sm line-clamp-3">{post.text}</p>
        </div>
      </Card.Container>
    );

  return (
    <Card.Container id={post._id} className="py-10 first:pt-0 last:pb-0">
      <Card.Category category={post.category} />
      <Card.Heading title={post.title} />
    </Card.Container>
  );
};

Card.Container = ({ id, className, children }: ICardContainer) => {
  return (
    <article className={className}>
      <Link to={`/post/${id}`}>{children}</Link>
    </article>
  );
};

Card.Heading = ({ title }: { title: string }) => {
  return <h1 className="font-bold line-clamp-2">{title}</h1>;
};

Card.Category = ({ category }: { category: string }) => {
  return (
    <span className="text-sm font-medium capitalize text-primary">
      {category}
    </span>
  );
};

export default Card;
