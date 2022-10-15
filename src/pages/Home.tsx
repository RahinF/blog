import Card from "../components/Card";
import posts from "../placeholder/post";

const Home = () => {
  const Post = (
    <section>
      <div className="overflow-hidden object-cover">
        <img
          src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>

      <div>
        <header className="mt-4">
          <span className="text-sm">Technology</span>
          <h2 className="font-bold">
            10 Great Outdoor Deals on Tents, Jackets, and Snow Gear
          </h2>
        </header>

        <p className="text-sm line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          facilis reprehenderit qui esse, distinctio adipisci, laudantium ab
          repudiandae modi iure quaerat doloribus, hic in assumenda labore
          reiciendis? Ex, praesentium in.
        </p>
      </div>
    </section>
  );

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
            <span>{posts[0].date}</span>
            <h1 className="text-3xl font-bold">{posts[0].title}</h1>
          </header>
        </article>

        <div className="flex basis-1/2 flex-col divide-y">
          {posts.slice(1, 4).map(post => (
            <Card post={post} key={post.id} />
          ))}
        </div>
      </div>

      <article className="my-20">
        <h1 className="mb-4 text-xl font-bold">Latest Posts</h1>

        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
          {[...Array(10)].map((_, index) => Post)}
        </div>
      </article>
    </main>
  );
};

export default Home;
