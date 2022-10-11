import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import Card from "../components/Card";
import Comments from "../features/comments/Comments";
import Split from "../layout/Split";

const Post = () => {
  return (
    <Split>
      <Split.Left>
        <div className="flex justify-between">
          <div className="mb-4 text-gray-600">
            <span className="after-bullet">21 January 2022</span>
            <span>Thoughts</span>
          </div>

          <div className="flex gap-4">
            <button>
              <PencilSimpleLine size={24} />
            </button>

            <button>
              <TrashSimple size={24} />
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non earum
          similique tenetur illo veritatis harum!
        </h1>
        <div className="mt-10 overflow-hidden object-cover">
          <img
            src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <p className="mt-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          blanditiis quo molestias sapiente ad in exercitationem tempore,
          expedita, temporibus, dignissimos laudantium quae. Deleniti, aliquid
          dicta eius officiis ea expedita minima et accusamus eligendi quo sunt,
          molestias vero deserunt sed consequatur ducimus consectetur beatae.
          Maiores quis aperiam, iusto officia placeat cum?
        </p>

        <Comments />
      </Split.Left>

      <Split.Right>
        <h1 className="text-2xl font-bold">Related posts</h1>
        <div className="flex flex-col gap-10">
          {[...Array(5)].map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </Split.Right>
    </Split>
  );
};

export default Post;
