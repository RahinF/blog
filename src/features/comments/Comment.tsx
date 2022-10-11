import clsx from "clsx";
import { CaretDown, CaretUp, Heart } from "phosphor-react";
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

  const replyCount: number = comment.children!.length;
  const hasChildren: boolean = replyCount > 0;

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

      <p className="whitespace-pre-line break-all">{comment.text}</p>

      <div className="flex flex-col gap-2 my-2">
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <button
              className="transition hover:scale-110"
              aria-label={`like comment alongside ${pluralize(
                "other user",
                4,
                true
              )}`}
            >
              <Heart size={24} />
            </button>
            <span className="text-sm">2.6k</span>
          </div>
          <button
            onClick={() => setShowInputBox(true)}
            className="px-2 py-1"
          >
            reply
          </button>
        </div>

        {hasChildren && (
          <button
            onClick={() => setShowNestedComments(!showNestedComments)}
            className="flex items-center gap-1 font-bold text-info"
            aria-label={`show ${pluralize("reply", replyCount, true)}`}
            aria-expanded={showNestedComments}
          >
            {showNestedComments ? (
              <CaretUp weight="fill" />
            ) : (
              <CaretDown weight="fill" />
            )}{" "}
            {pluralize("reply", replyCount, true)}
          </button>
        )}
      </div>

      {showInputBox && <NewComment fromReply showInputBox={setShowInputBox} />}
      {showNestedComments && <div className="divide-y">{nestedComments}</div>}
    </div>
  );
};

export default Comment;
