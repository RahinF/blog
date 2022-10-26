import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import Comments from "../comments/Comments";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsByCategoryQuery,
} from "./postsApiSlice";
import Split from "../../layout/Split";
import { timeAgoOrDate } from "../../utils/date";

const Post = () => {
  const { id } = useParams();
  const { data: post, isSuccess } = useGetPostQuery(id);
  const { data: posts, isSuccess: postsSuccess } = useGetPostsByCategoryQuery(
    post?.category,
    {
      skip: !post,
    }
  );

  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  if (!isSuccess) return <p>loading...</p>;
  if (!postsSuccess) return <p>loading...</p>;

  const handleDelete = async () => {
    console.log("delte");
    await deletePost(post._id);
    navigate("/");
  };

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
              <Link to={`/edit/${post._id}`}>
                <button
                  aria-label="edit post"
                  className="flex items-center gap-2"
                >
                  <PencilSimpleLine size={24} />
                  <span className="text-sm font-medium">Edit</span>
                </button>
              </Link>

              <button
                aria-label="delete post"
                className="flex items-center gap-2"
                onClick={handleDelete}
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
            src={`http://localhost:4000/uploads/${post.image}`}
            alt={post.title}
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
