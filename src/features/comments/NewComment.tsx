import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ICommentForm {
  text: string;
}

interface Props {
  fromReply?: boolean;
  showInputBox?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewComment = ({ fromReply, showInputBox }: Props) => {
  const [textCurrentLength, setTextCurrentLength] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const COMMENT_MAX_LENGTH = 250;



  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ICommentForm>({ mode: "onChange" });

  const { ref, ...rest } = register("text", {
    maxLength: {
      value: COMMENT_MAX_LENGTH,
      message: "Comment cannot be more than 250 characters.",
    },
    onChange: (event) => setTextCurrentLength(event.target.value.length),
  });

  const onSubmit: SubmitHandler<ICommentForm> = async (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    resetField("text");
    setTextCurrentLength(0);
    setIsExpanded(false);

    if (showInputBox) {
      showInputBox(false);
    }
  };

  

  useEffect(() => {
    if (fromReply) {
      textRef.current?.focus();
    }
  }, [fromReply]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="text" className="sr-only">
          add comment
        </label>
        <textarea
          id="text"
          rows={4}
          className={clsx({
            textarea: true,
            "h-10": !isExpanded,
            "h-full": fromReply || isExpanded,
            "border-error focus:border-error focus:ring-error": errors.text,
          })}
          aria-invalid={errors.text ? "true" : "false"}
          {...rest}
          ref={(event) => {
            ref(event);
            textRef.current = event;
          }}
          onFocus={() => setIsExpanded(true)}
        />
        {errors.text && (
          <span
            role="alert"
            className="mt-2 flex items-center gap-2 text-sm text-error"
          >
            <Warning size={16} weight="fill" /> {errors.text.message}
          </span>
        )}
      </div>

      <div className="flex justify-between">
        <span
          aria-hidden
          className={clsx({
            "text-error": errors.text,
          })}
        >
          {`${textCurrentLength} / ${COMMENT_MAX_LENGTH}`}
        </span>

        {(isExpanded || fromReply) && (
          <div className="flex gap-2">
            <button type="button" className="btn" onClick={handleCancel}>
              cancel
            </button>

            <button
              className="btn"
              disabled={!!errors.text}
            >
              send
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default NewComment;
