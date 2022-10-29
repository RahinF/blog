import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { COMMENT_MAX_LENGTH, USERNAME_MAX_LENGTH } from "../../constants/form";
import { NewCommentProps } from "../../types/IComment";
import { selectCurrentUserId } from "../auth/authSlice";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "./commentsApiSlice";

interface ICommentForm {
  username?: string;
  text: string;
}

const NewComment = ({
  mode = "none",
  parentId,
  fromReply,
  commentToEdit,
  showInputBox,
}: NewCommentProps) => {
  const [textCurrentLength, setTextCurrentLength] = useState<number>(0);
  const [usernameCurrentLength, setUsernameCurrentLength] = useState<number>(0);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const currentUser = useAppSelector(selectCurrentUserId);

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const { id: postId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICommentForm>({ mode: "onSubmit" });

  const { ref, ...rest } = register("text", {
    maxLength: {
      value: COMMENT_MAX_LENGTH,
      message: `Comment cannot be more than ${COMMENT_MAX_LENGTH} characters.`,
    },
    required: "A comment cannot be empty.",
    onChange: (event) => setTextCurrentLength(event.target.value.length),
  });

  const clearForm = () => {
    reset();
    setUsernameCurrentLength(0);
    setTextCurrentLength(0);
    if (showInputBox) {
      showInputBox("none");
    }
  };

  const handleCreateComment = async ({ username, text }: ICommentForm) => {
    if (!postId || !username) return;

    const inputs = {
      postId,
      parentId,
      author: username,
      text,
    };

    try {
      await createComment(inputs).unwrap();
      clearForm();
    } catch (error) {
      //  comment post failed handle error i.e toast
    }
  };

  const handleEditComment = async (text: string) => {
    if (!commentToEdit?.commentId) return;

    const inputs = {
      commentId: commentToEdit.commentId,
      text,
    };

    try {
      await updateComment(inputs).unwrap();
      clearForm();
    } catch (error) {
      // handle edit comment error
    }
  };

  const onSubmit: SubmitHandler<ICommentForm> = async (data) => {
    const { username, text } = data;

    if (mode === "edit") {
      // edit comment
      await handleEditComment(text);
    } else if (mode === "reply" || mode === "create") {
      await handleCreateComment({ username, text });
    }
  };

  useEffect(() => {
    if (fromReply) {
      textRef.current?.focus();
    }
  }, [fromReply]);

  useEffect(() => {
    if (currentUser) {
      setUsernameCurrentLength(currentUser.length);
      reset({ username: currentUser });
    }
  }, [currentUser, reset]);

  useEffect(() => {
    if(!currentUser) return;
    if (mode === "edit") {
      if (!commentToEdit) return;
      setTextCurrentLength(commentToEdit.text.length);
      reset({ username: currentUser, text: commentToEdit.text });
    } else if (mode === "reply") {
      setTextCurrentLength(0);
      reset({ username: currentUser, text: "" });
    }
  }, [mode, currentUser, commentToEdit, reset]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={clsx("flex flex-col",{
          "hidden": currentUser,
        })}
      >
        <label
          htmlFor="username"
          className="label flex items-center justify-between"
        >
          <span>
            Username{" "}
            <span aria-hidden className="text-error">
              *
            </span>
          </span>
          <span
            aria-hidden
            className={clsx({
              "text-sm": true,
              "text-error": errors.username,
            })}
          >
            {`${usernameCurrentLength} / ${USERNAME_MAX_LENGTH}`}
          </span>
        </label>
        <input
          id="username"
          type="text"
          className={clsx({
            "border-error focus:border-error focus:ring-error": errors.username,
          })}
          aria-required
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username", {
            required: "Username is required.",
            maxLength: {
              value: USERNAME_MAX_LENGTH,
              message: `Username cannot be more than ${USERNAME_MAX_LENGTH} characters.`,
            },
            onChange: (event) =>
              setUsernameCurrentLength(event.target.value.length),
          })}
        />
        {errors.username && (
          <span
            role="alert"
            className="mt-2 flex items-center gap-2 text-sm text-error"
          >
            <Warning size={16} weight="fill" /> {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="text"
          className="label flex items-center justify-between"
        >
          <span>
            Comment{" "}
            <span aria-hidden className="text-error">
              *
            </span>
          </span>
          <span
            aria-hidden
            className={clsx({
              "text-sm": true,
              "text-error": errors.text,
            })}
          >
            {`${textCurrentLength} / ${COMMENT_MAX_LENGTH}`}
          </span>
        </label>
        <textarea
          id="text"
          rows={4}
          className={clsx({
            "resize-none": true,
            "border-error focus:border-error focus:ring-error": errors.text,
          })}
          aria-invalid={errors.text ? "true" : "false"}
          {...rest}
          ref={(event) => {
            ref(event);
            textRef.current = event;
          }}
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

      <div className="flex justify-end gap-2">
        <button type="button" className="btn" onClick={clearForm}>
          cancel
        </button>

        <button className="btn">{mode !== "edit" ? "send" : "update"}</button>
      </div>
    </form>
  );
};

export default NewComment;
