import clsx from "clsx";
import { CaretDown, CaretUp } from "phosphor-react";
import { useState } from "react";
import IComment from "../../types/IComment";
import NewComment from "./NewComment";
import pluralize from "pluralize";

interface Props {
  comment: IComment;
  isChild?: boolean;
}

const Comment = ({ comment, isChild }: Props) => {
  const [showNestedComments, setShowNestedComments] = useState<boolean>(false);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);

  const replies: number = comment.children!.length;

  const nestedComments = comment.children?.map((comment) => {
    return <Comment key={comment.id} comment={comment} isChild />;
  });

  return (
    <div
      className={clsx({
        "mt-4 p-4": true,
        "ml-6": isChild,
      })}
    >
      <span className="after-bullet text-lg font-bold">{comment.author}</span>
      <span className="text-sm">3 days ago</span>

      <p className="whitespace-pre-line break-words">{comment.text}</p>

      <div className="my-2 flex gap-2">
        <button
          onClick={() => setShowInputBox(true)}
          className="px-2 py-1 text-sm font-bold uppercase"
        >
          reply
        </button>

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
      </div>

      {showInputBox && <NewComment fromReply showInputBox={setShowInputBox} />}
      {showNestedComments && <div className="divide-y">{nestedComments}</div>}
    </div>
  );
};

export default Comment;
