import pluralize from "pluralize";
import { useGetAllCommentsQuery } from "./commentsApiSlice";
import CommentsLoader from "./CommentsLoader";
import NewComment from "./NewComment";

interface IComments {
  postId: string;
  postAuthor: string;
}
const Comments = ({ postId, postAuthor }: IComments) => {
  const { data: comments, isLoading } = useGetAllCommentsQuery(postId);

  const commentCount: number = comments?.length || 0;

  return (
    <div className="flex flex-col gap-4">
      <NewComment mode="create" />

      {!!commentCount && (
        <h1 className="text-xl font-medium">
          {pluralize("Comment", commentCount, true)}
        </h1>
      )}

      <div className="divide-y">
        <CommentsLoader
        postAuthor={postAuthor}
          comments={comments}
          isLoading={isLoading}
          placeholderCount={5}
          isParent
        />
      </div>
    </div>
  );
};

export default Comments;
