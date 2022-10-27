import pluralize from "pluralize";
import Comment from "./Comment";
import { useGetAllCommentsQuery } from "./commentsApiSlice";
import NewComment from "./NewComment";

interface IComments {
  postId: string;
}
const Comments = ({ postId }: IComments) => {
  const { data: comments, isSuccess } = useGetAllCommentsQuery(postId);

  const COMMENT_COUNT: number = comments?.length || 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-medium">
        {pluralize("Comment", COMMENT_COUNT, true)}
      </h1>
      <NewComment />
      <div className="divide-y">
        {isSuccess &&
          comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
      </div>
    </div>
  );
};

export default Comments;
