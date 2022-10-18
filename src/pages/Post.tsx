import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import Card from "../components/Card";
import Comments from "../features/comments/Comments";
import Split from "../layout/Split";
import posts from "../placeholder/post";

const Post = () => {
  return (
    <Split>
      <Split.Left classes="flex flex-col gap-10">
        <header>
          <div className="flex justify-between">
            <div className="mb-4 text-gray-600">
              <span className="after-bullet">21 January 2022</span>
              <span>Thoughts</span>
            </div>

            <div className="flex gap-4">
              <button
                aria-label="edit post"
                className="flex items-center gap-2"
              >
                <PencilSimpleLine size={24} />
                <span className="text-sm font-medium">Edit</span>
              </button>

              <button
                aria-label="delete post"
                className="flex items-center gap-2"
              >
                <TrashSimple size={24} />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non earum
            similique tenetur illo veritatis harum!
          </h1>
        </header>

        <div className="overflow-hidden object-cover">
          <img
            className="max-h-96 w-full object-cover"
            src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <p className="max-w-prose">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          blanditiis quo molestias sapiente ad in exercitationem tempore,
          expedita, temporibus, dignissimos laudantium quae. Deleniti, aliquid
          dicta eius officiis ea expedita minima et accusamus eligendi quo sunt,
          molestias vero deserunt sed consequatur ducimus consectetur beatae.
          Maiores quis aperiam, iusto officia placeat cum?
        </p>

        <div className="border-t pt-4">
          <Comments />
        </div>
      </Split.Left>

      <Split.Right classes="flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Related posts</h1>
        <div className="divide-y">
          {posts.slice(0, 5).map((post) => (
            <Card post={post} key={post.id} />
          ))}
        </div>
      </Split.Right>
    </Split>
  );
};

export default Post;
