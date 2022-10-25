import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Comments from "../features/comments/Comments";
import {
  useGetPostQuery,
  useGetPostsByCategoryQuery,
} from "../features/posts/postsApiSlice";
import Split from "../layout/Split";
import { timeAgoOrDate } from "../utils/date";

const Post = () => {
  const { id } = useParams();
  const { data: post, isSuccess } = useGetPostQuery(id);
  const { data: posts, isSuccess: postsSuccess } = useGetPostsByCategoryQuery(
    post?.category,
    {
      skip: !post,
    }
  );

  //  console.log(posts)

  if (!isSuccess) return <p>loading...</p>;
  if (!postsSuccess) return <p>loading...</p>;

  return (
    <Split>
      <Split.Left classes="flex flex-col gap-10">
        <header>
          <div className="flex justify-between">
            <div className="mb-4 text-gray-600">
              <span className="after-bullet">
                {timeAgoOrDate(post.createdAt)}
              </span>
              <span>{post.category}</span>
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

          <h1 className="text-3xl font-bold">{post.title}</h1>
        </header>

        <div className="overflow-hidden object-cover">
          <img
            className="max-h-96 w-full object-cover"
            src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <p className="max-w-prose">{post.text}</p>

        <div className="border-t pt-4">
          <Comments />
        </div>
      </Split.Left>

      <Split.Right classes="flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Related posts</h1>
        <div className="divide-y">
          {posts.slice(0, 5).map((post) => (
            <Card post={post} key={post._id} />
          ))}
        </div>
      </Split.Right>
    </Split>
  );
};

export default Post;
