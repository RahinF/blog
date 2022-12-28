import { Link } from "react-router-dom";
import IPost from "../types/IPost";
import Image from "./Image";

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
  return fullSize ? <Card.Full post={post} /> : <Card.Default post={post} />;
};

Card.Default = ({ post }: { post: IPost }) => {
  return (
    <Card.Container
      id={post._id}
      className="flex gap-2 py-6 first:pt-0 last:pb-0"
    >
      <Card.Category category={post.category} />
      <Card.Heading title={post.title} />
      <Card.Author author={post.author.username} />
    </Card.Container>
  );
};

Card.Full = ({ post }: { post: IPost }) => {
  return (
    <Card.Container id={post._id} className="group">
      <Image src={post.image} alt={post.title} />

      <header className="mt-4 flex flex-col gap-1">
        <Card.Category category={post.category} />
        <Card.Heading title={post.title} />
        <Card.Author author={post.author.username} />
      </header>
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
  return <h1 className="text-lg font-bold line-clamp-2">{title}</h1>;
};

Card.Category = ({ category }: { category: string }) => {
  return (
    <span className=" font-medium uppercase text-primary">{category}</span>
  );
};

Card.Author = ({ author }: { author: string }) => {
  return <div className="text-sm font-medium text-neutral-600">{author}</div>;
};

export default Card;
