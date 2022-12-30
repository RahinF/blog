import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "../comments/Comments";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsByCategoryQuery,
} from "./postsApiSlice";
import Split from "../../layout/Split";
import { timeAgoOrDate } from "../../utils/date";
import Image from "../../components/Image";
import PostsLoader from "./PostsLoader";
import PostSkeleton from "../../components/skeletons/PostSkeleton";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../auth/authSlice";
import { deleteFile } from "../../lib/firebase/uploadFile";

const Post = () => {
  const { id } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(id);
  const { data: posts, isLoading: postsLoading } = useGetPostsByCategoryQuery(
    post?.category,
    {
      skip: !post,
    }
  );

  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();


  const currentUserId = useSelector(selectCurrentUserId);

  const isLoggedIn: boolean = post?.author._id === currentUserId;

  const handleDelete = async () => {
    if (!post) return;
    await deleteFile(post.image);
    await deletePost(post._id);
    toast.success("Post deleted.");
    navigate("/");
  };

  const Post = (
    <>
      <header>
        <div className="mb-2 flex justify-between">
          <span className="font-medium uppercase text-primary">
            {post?.category}
          </span>

          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <Link to={`/edit/${post?._id}`}>
                <button
                  aria-label="edit post"
                  className="flex items-center gap-2"
                >
                  <PencilSimpleLine size={24} />
                  <span className="text-sm font-bold uppercase">edit</span>
                </button>
              </Link>

              <button
                aria-label="delete post"
                className="flex items-center gap-2"
                onClick={handleDelete}
              >
                <TrashSimple size={24} />
                <span className="text-sm font-bold uppercase">delete</span>
              </button>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold">{post?.title}</h1>
        {post && (
          <div className="mt-2">
            {post.author.username} • {timeAgoOrDate(post.createdAt)}
          </div>
        )}
      </header>
      {post?.image && <Image src={post?.image} alt={post?.title} />}
      <p className="max-w-prose whitespace-pre-line break-words">
        {post?.text}
      </p>
      <div className="border-t pt-4">
        {post?._id && <Comments postId={post._id} postAuthor={post.author._id} />}
      </div>
    </>
  );

  return (
    <Split>
      <Split.Left classes="flex flex-col gap-10">
        {postLoading ? <PostSkeleton /> : Post}
      </Split.Left>

      <Split.Right classes="flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Related posts</h1>
        <div className="divide-y">
          <PostsLoader
            posts={posts?.slice(0, 5)}
            placeholderCount={5}
            isLoading={postsLoading}
          />
        </div>
      </Split.Right>
    </Split>
  );
};

export default Post;
