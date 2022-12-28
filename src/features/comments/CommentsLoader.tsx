import CommentSkeleton from "../../components/skeletons/CommentSkeleton";
import IComment from "../../types/IComment";
import Comment from "./Comment";

interface ICommentsLoader {
  comments: IComment[] | undefined;
  isLoading: boolean;
  placeholderCount: number;
  isParent?: boolean;
  postAuthor: string;
}
const CommentsLoader = ({
  comments,
  isLoading,
  placeholderCount,
  isParent,
  postAuthor,
}: ICommentsLoader) => {
  if (isLoading) return <CommentSkeleton count={placeholderCount} />;

  return (
    <>
      {comments?.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          isParent={isParent}
          postAuthor={postAuthor}
        />
      ))}
    </>
  );
};

export default CommentsLoader;
