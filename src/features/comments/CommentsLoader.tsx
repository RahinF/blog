import CommentSkeleton from "../../components/skeletons/CommentSkeleton";
import IComment from "../../types/IComment";
import Comment from "./Comment";

interface ICommentsLoader {
  comments: IComment[] | undefined;
  isLoading: boolean;
  placeholderCount: number;
  isParent?: boolean;
}
const CommentsLoader = ({
  comments,
  isLoading,
  placeholderCount,
  isParent
}: ICommentsLoader) => {
  if (isLoading) return <CommentSkeleton count={placeholderCount} />;

  return (
    <>
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} isParent={isParent} />
      ))}
    </>
  );
};

export default CommentsLoader;
