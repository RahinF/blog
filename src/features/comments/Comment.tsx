import clsx from "clsx";
import {
  CaretDown,
  Chat,
  DotsThreeVertical,
  PencilSimpleLine,
  TrashSimple,
} from "phosphor-react";
import { useEffect, useState } from "react";
import IComment, {
  INestedComments,
  Mode,
  NewCommentProps,
} from "../../types/IComment";
import NewComment from "./NewComment";
import pluralize from "pluralize";
import { timeAgoOrDate } from "../../utils/date";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUserId } from "../auth/authSlice";
import { useDeleteCommentMutation } from "./commentsApiSlice";

interface Props {
  isParent?: boolean;
  comment: IComment;
  replyTo?: string;
}

const NestedComments = ({ comment, author }: INestedComments) => {
  if (!comment.children) return null;
  return (
    <div className="divide-y">
      {comment.children?.map((comment) => (
        <Comment key={comment._id} comment={comment} replyTo={author} />
      ))}
    </div>
  );
};

const Comment = ({ comment, isParent, replyTo }: Props) => {
  const [showNestedComments, setShowNestedComments] = useState<boolean>(false);

  const [mode, setMode] = useState<Mode>("none");

  const [newCommentProps, setNewCommentProps] = useState<NewCommentProps>();

  const [author, setAuthor] = useState<string>("");

  const isLoggedIn = useAppSelector(selectCurrentUserId);

  const [deleteComment] = useDeleteCommentMutation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const replies: number = comment.children?.length || 0;

  useEffect(() => {
    if (comment.author) {
      if (typeof comment.author === "object") {
        setAuthor(comment.author.username);
      } else {
        setAuthor(comment.author);
      }
    }
  }, [comment]);

  useEffect(() => {
    if (mode === "reply") {
      setNewCommentProps({
        mode: "reply",
        fromReply: true,
        showInputBox: setMode,
        parentId: comment._id,
      });
    } else if (mode === "edit") {
      setNewCommentProps({
        mode: "edit",
        fromReply: true,
        showInputBox: setMode,
        commentToEdit: { commentId: comment._id, text: comment.text },
      });
    }
  }, [mode, comment._id, comment.text]);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={clsx("group mt-4 flex py-4", {
          "pl-10": !isParent,
        })}
      >
        <div className="flex-1">
          <span className="font-bold">{author}</span>
          <div className="text-xs">{timeAgoOrDate(comment.createdAt)}</div>
          {replyTo && (
            <p className="my-2 max-w-fit rounded-md bg-gray-800 py-1 px-2 text-sm text-white">
              Replying to {replyTo}
            </p>
          )}
          <p className="mt-2 whitespace-pre-line break-words">{comment.text}</p>

          <div className="my-2 flex items-center gap-4">
            {!!replies && (
              <button
                onClick={() => setShowNestedComments(!showNestedComments)}
                className="flex items-center gap-2 font-bold uppercase text-primary"
                aria-label={`show ${pluralize("reply", replies, true)}`}
                aria-expanded={showNestedComments}
              >
                <CaretDown
                  weight="fill"
                  className={clsx("transition", {
                    "rotate-180": showNestedComments,
                  })}
                />
                <span>{pluralize("reply", replies, true)}</span>
              </button>
            )}

            <button
              onClick={() => setMode(mode === "reply" ? "none" : "reply")}
              className="flex items-center gap-2 py-1 text-sm font-bold uppercase transition hover:scale-105 hover:text-primary"
            >
              <Chat size={24} />
              reply
            </button>
          </div>
        </div>

        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={clsx({
                "opacity-0 transition focus:opacity-100 group-hover:opacity-100":
                  true,
                "opacity-100": isMenuOpen,
              })}
              aria-label="options menu"
              aria-expanded={isMenuOpen}
            >
              <DotsThreeVertical size={24} weight="bold" />
            </button>

            {isMenuOpen && (
              <div
                className="absolute bottom-0 right-0 border p-4"
              >
                <button
                  className="flex items-center gap-2 py-1 text-sm font-bold uppercase transition hover:scale-105 hover:text-primary"
                  onClick={() => setMode(mode === "edit" ? "none" : "edit")}
                >
                  <PencilSimpleLine size={24} />
                  edit
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="flex items-center gap-2 py-1 text-sm font-bold uppercase transition hover:scale-105 hover:text-primary"
                >
                  <TrashSimple size={24} />
                  delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {mode !== "none" && <NewComment {...newCommentProps} />}

      {showNestedComments && (
        <NestedComments comment={comment} author={author} />
      )}
    </>
  );
};

export default Comment;
