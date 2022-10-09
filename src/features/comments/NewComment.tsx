import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ICommentForm {
  text: string;
}

const NewComment = () => {
  const [textCurrentLength, setTextCurrentLength] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ICommentForm>({ mode: "onChange" });

  const COMMENT_MAX_LENGTH = 250;

  const onSubmit: SubmitHandler<ICommentForm> = async (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    resetField("text");
    setTextCurrentLength(0);
    setIsExpanded(false);
  };

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
            "h-full": isExpanded,
            "border-error focus:border-error focus:ring-error": errors.text,
          })}
          aria-invalid={errors.text ? "true" : "false"}
          {...register("text", {
            maxLength: {
              value: COMMENT_MAX_LENGTH,
              message: "Comment cannot be more than 250 characters.",
            },
          })}
          onFocus={() => setIsExpanded(true)}
          onChange={(event) => setTextCurrentLength(event.target.value.length)}
        />
        {errors.text && (
          <p
            role="alert"
            className="mt-2 flex items-center gap-2 text-sm text-error"
          >
            <Warning size={16} weight="fill" /> {errors.text.message}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <span
          className={clsx({
            "text-error": errors.text,
          })}
        >
          {`${textCurrentLength} / ${COMMENT_MAX_LENGTH}`}
        </span>
        <div className="flex gap-2">
          <button type="button" className="btn" onClick={handleCancel}>
            cancel
          </button>

          <button className="btn">send</button>
        </div>
      </div>
    </form>
  );
};

export default NewComment;
