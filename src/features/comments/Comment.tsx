import clsx from "clsx";
import { CaretDown, CaretUp } from "phosphor-react";
import { useEffect, useState } from "react";
import IComment from "../../types/IComment";
import NewComment from "./NewComment";
import pluralize from "pluralize";
import { timeAgoOrDate } from "../../utils/date";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUserId } from "../auth/authSlice";
import { useDeleteCommentMutation } from "./commentsApiSlice";

interface Props {
  comment: IComment;
  isChild?: boolean;
}

const Comment = ({ comment, isChild }: Props) => {
  const [showNestedComments, setShowNestedComments] = useState<boolean>(false);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");

  const isLoggedIn = useAppSelector(selectCurrentUserId);

  const [deleteComment] = useDeleteCommentMutation();

  const replies: number = comment.children?.length || 0;

  const nestedComments = comment.children?.map((comment) => {
    return <Comment key={comment._id} comment={comment} isChild />;
  });

  useEffect(() => {
    if (comment.author) {
      if (typeof comment.author === "object") {
        setAuthor(comment.author.username);
      } else {
        setAuthor(comment.author);
      }
    }
  }, [comment]);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={clsx({
        "mt-4 p-4": true,
        "ml-6": isChild,
      })}
    >
      <span className="after-bullet text-lg font-bold">{author}</span>
      <span className="text-sm">{timeAgoOrDate(comment.createdAt)}</span>

      <p className="whitespace-pre-line break-words">{comment.text}</p>

      <div className="my-2 flex gap-2">
        {!!replies && (
          <button
            onClick={() => setShowNestedComments(!showNestedComments)}
            className="flex items-center gap-1 font-bold text-primary"
            aria-label={`show ${pluralize("reply", replies, true)}`}
            aria-expanded={showNestedComments}
          >
            {showNestedComments ? (
              <CaretUp weight="fill" />
            ) : (
              <CaretDown weight="fill" />
            )}{" "}
            {pluralize("reply", replies, true)}
          </button>
        )}

        <button
          onClick={() => setShowInputBox(true)}
          className="px-2 py-1 text-sm font-bold uppercase"
        >
          reply
        </button>
        {isLoggedIn && (
          <button
            onClick={handleDeleteComment}
            className="px-2 py-1 text-sm font-bold uppercase"
          >
            delete
          </button>
        )}
      </div>

      {showInputBox && (
        <NewComment
          fromReply
          showInputBox={setShowInputBox}
          parentId={comment._id}
        />
      )}
      {showNestedComments && <div className="divide-y">{nestedComments}</div>}
    </div>
  );
};

export default Comment;
