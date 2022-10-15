import IPost from "../types/IPost";

interface Props {
  post: IPost;
}

const Card = ({ post }: Props) => {
  return (
    <article className="py-10">
      <span className="text-sm capitalize text-primary">{post.category}</span>
      <h1 className="font-bold line-clamp-2">{post.title}</h1>
    </article>
  );
};

export default Card;
