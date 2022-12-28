import clsx from "clsx";
import {
  CaretDown,
  Chat,
  DotsThreeVertical,
  PencilSimpleLine,
  TrashSimple,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
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
import OutSideClick from "../../hooks/useOutsideClick";
import toast from "react-hot-toast";

interface Props {
  isParent?: boolean;
  comment: IComment;
  replyTo?: string;
  postAuthor: string;
}

const NestedComments = ({ comment, author, postAuthor }: INestedComments) => {
  if (!comment.children) return null;
  return (
    <div className="divide-y">
      {comment.children?.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          replyTo={author}
          postAuthor={postAuthor}
        />
      ))}
    </div>
  );
};

const Comment = ({ comment, isParent, replyTo, postAuthor }: Props) => {
  const [showNestedComments, setShowNestedComments] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("none");
  const [newCommentProps, setNewCommentProps] = useState<NewCommentProps>();
  const [author, setAuthor] = useState<string>("");

  const currentUserId = useAppSelector(selectCurrentUserId);

  const commentOwnerId =
    typeof comment.author === "object" && comment.author._id;

  const isPostOwner = postAuthor === currentUserId;
  const isCommentOwner = commentOwnerId === currentUserId;

  const canUseActions = isPostOwner || isCommentOwner;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [deleteComment] = useDeleteCommentMutation();

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

  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const lastButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isDropdownOpen || !firstButtonRef.current || !lastButtonRef.current)
      return;

    if (event.code === "Escape") {
      setIsDropdownOpen(false);
    }

    if (document.activeElement === firstButtonRef.current) {
      if (event.shiftKey && event.code === "Tab") {
        event.preventDefault();
        lastButtonRef.current.focus();
      }
    }

    if (document.activeElement === lastButtonRef.current) {
      if (event.code === "Tab" && !event.shiftKey) {
        event.preventDefault();
        firstButtonRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      firstButtonRef.current?.focus();
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment._id);
      closeDropdown();
      toast.success("Comment deleted.");
    } catch (error) {
      toast.error("Couldn't delete comment.");
    }
  };

  const setModeOnClick = (mode: Mode) => {
    setMode((prev) => (prev === mode ? "none" : mode));

    if (isDropdownOpen) {
      setIsDropdownOpen(false);
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
              onClick={() => setModeOnClick("reply")}
              className="flex items-center gap-2 py-1 text-sm font-bold uppercase transition hover:scale-105 hover:text-primary"
            >
              <Chat size={24} />
              reply
            </button>
          </div>
        </div>

        {canUseActions && (
          <div className="relative self-start" onKeyDown={handleKeyPress}>
            <button
              onClick={toggleDropdown}
              className={clsx({
                "rounded-full border p-3": true,
                "opacity-0 transition focus:opacity-100 group-hover:opacity-100":
                  true,
                "opacity-100": isDropdownOpen,
              })}
              aria-label="options menu"
              aria-expanded={isDropdownOpen}
            >
              <DotsThreeVertical size={24} weight="bold" />
            </button>

            {isDropdownOpen && (
              <OutSideClick
                onClick={closeDropdown}
                className="absolute top-16 right-0 border bg-white p-4"
              >
                <button
                  ref={firstButtonRef}
                  className="flex items-center gap-2 py-1 text-sm font-bold uppercase transition hover:scale-105 hover:text-primary"
                  onClick={() => setModeOnClick("edit")}
                >
                  <PencilSimpleLine size={24} />
                  edit
                </button>
                <button
                  ref={lastButtonRef}
                  onClick={handleDeleteComment}
                  className="flex items-center gap-2 py-1 text-sm font-bold uppercase transition hover:scale-105 hover:text-primary"
                >
                  <TrashSimple size={24} />
                  delete
                </button>
              </OutSideClick>
            )}
          </div>
        )}
      </div>

      {mode !== "none" && <NewComment {...newCommentProps} />}

      {showNestedComments && (
        <NestedComments
          comment={comment}
          author={author}
          postAuthor={postAuthor}
        />
      )}
    </>
  );
};

export default Comment;
