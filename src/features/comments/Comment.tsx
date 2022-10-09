import clsx from "clsx";
import { useState } from "react";
import IComment from "../../types/IComment";
import NewComment from "./NewComment";

interface Props {
  comment: IComment;
  isChild?: boolean;
}

const Comment = ({ comment, isChild }: Props) => {
  const [showNestedComments, setShowNestedComments] = useState<boolean>(false);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);

  const nestedComments = comment.children?.map((comment) => {
    return <Comment key={comment.id} comment={comment} isChild />;
  });

  const hasChildren: boolean = comment.children!.length > 0;

  return (
    <div
      className={clsx({
        "mt-4 border p-4": true,
        "ml-6": isChild,
      })}
    >
      <div className="font-bold">{comment.author}</div>
      <p>{comment.text}</p>

      <div className="flex gap-2">
        <button onClick={() => setShowInputBox(true)}>reply</button>

        {hasChildren && (
          <button
            onClick={() => setShowNestedComments(!showNestedComments)}
            className="font-bold text-info"
          >
            {showNestedComments ? "hide" : "show"} {comment.children?.length}{" "}
            reply
          </button>
        )}
      </div>
      {showInputBox && <NewComment />}
      {showNestedComments && nestedComments}
    </div>
  );
};

export default Comment;
