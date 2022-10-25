import Card from "../components/Card";
import posts from "../placeholder/post";

const Home = () => {
  return (
    <main className="m-auto min-h-screen max-w-screen-lg px-4 xl:px-0">
      <div className="mt-20 flex flex-col gap-10 md:flex-row">
        <article className="flex basis-full flex-col gap-4">
          <img
            className="max-h-96 object-cover"
            src={posts[0].image}
            alt={posts[0].title}
          />
          <header>
            <div className="mt-2 mb-2 font-medium text-primary">
              {posts[0].date}
            </div>
            <h1 className="text-3xl font-bold">{posts[0].title}</h1>
          </header>
        </article>

        <div className="flex basis-1/2 flex-col divide-y">
          {posts.slice(1, 4).map((post) => (
            <Card post={post} key={post.id} />
          ))}
        </div>
      </div>

      <div className="my-20">
        <h1 className="mb-4 text-xl font-bold">Latest Posts</h1>

        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
          {posts.map((post) => (
            <Card post={post} key={post.id} fullSize />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
