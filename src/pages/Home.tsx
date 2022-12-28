import { Link } from "react-router-dom";
import Image from "../components/Image";
import { useGetAllPostsQuery } from "../features/posts/postsApiSlice";
import { timeAgoOrDate } from "../utils/date";
import CardSkeleton from "../components/skeletons/CardSkeleton";
import PostsLoader from "../features/posts/PostsLoader";

const Home = () => {
  const { data: posts, isSuccess, isLoading } = useGetAllPostsQuery();

  

  return (
    <main className="m-auto min-h-screen max-w-screen-lg px-4 xl:px-0">
      <div className="mt-20 flex flex-col gap-10 md:flex-row">
        {isSuccess ? (
          posts[0] &&
          <article className="flex basis-full flex-col gap-4">
            <Link to={`/post/${posts[0]._id}`}>
              <Image src={posts[0].image} alt={posts[0].title} />
              <header>
                <div className="mt-2 mb-2 font-medium text-primary">
                {posts[0].author.username} • {timeAgoOrDate(posts[0].createdAt)}
                </div>
                <h1 className="text-3xl font-bold">{posts[0].title}</h1>
              </header>
            </Link>
          </article>
        ) : (
          <div className="basis-full">
            <CardSkeleton fullSize count={1} />
          </div>
        )}

        <div className="flex basis-1/2 flex-col divide-y">
          <PostsLoader
            posts={posts?.slice(1, 4)}
            placeholderCount={3}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="my-20">
        <h1 className="mb-4 text-xl font-bold">Latest Posts</h1>

        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
          <PostsLoader
            posts={posts}
            placeholderCount={6}
            isLoading={isLoading}
            fullSize
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
