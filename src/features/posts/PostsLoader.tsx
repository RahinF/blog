import Card from "../../components/Card";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import IPost from "../../types/IPost";

interface IPostsLoader {
  posts: IPost[] | undefined;
  isLoading: boolean;
  placeholderCount: number;
  fullSize?: boolean;
}

const PostsLoader = ({
  posts,
  isLoading,
  placeholderCount,
  fullSize,
}: IPostsLoader) => {
  if (isLoading)
    return <CardSkeleton fullSize={fullSize} count={placeholderCount} />;

  return (
    <>
      {posts?.map((post) => (
        <Card key={post._id} post={post} fullSize={fullSize} />
      ))}
    </>
  );
};

export default PostsLoader;
