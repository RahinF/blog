import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TEXT_MAX_LENGTH, TITLE_MAX_LENGTH } from "../constants/form";
import {
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../features/posts/postsApiSlice";
import {
  useDeleteFileMutation,
  useUploadFileMutation,
} from "../features/upload/uploadApiSlice";
import IWriteForm from "../types/IWrite";

interface IWrite {
  edit?: boolean;
}

const Write = ({ edit }: IWrite) => {
  const [titleCurrentLength, setTitleCurrentLength] = useState<number>(0);
  const [textCurrentLength, setTextCurrentLength] = useState<number>(0);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [uploadFile] = useUploadFileMutation();
  const [deleteFile] = useDeleteFileMutation();

  const { id } = useParams();
  const { data: post, isSuccess } = useGetPostQuery(id, { skip: !edit });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IWriteForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (!edit) return;

    if (isSuccess) {
      const { title, text, image, category } = post;

      if (image) {
        setFilePreview(`http://localhost:4000/uploads/${image}`);
      }

      reset({ title, text, category });
    }
  }, [edit, isSuccess, post, reset]);

  const handleUploadFile = async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return await uploadFile(formdata).unwrap();
  };

  const handleDeleteOldFile = async () => {
    if (!edit || !post?.image) return;
    await deleteFile(post.image);
  };

  const onSubmit: SubmitHandler<IWriteForm> = async (data) => {
    const { file, ...rest } = data;

    let image: string | undefined;
    let postId: string;

    const fileSelected = !!file.length;

    if (fileSelected) {
      await handleDeleteOldFile();
      image = await handleUploadFile(file[0]);
    }

    if (edit) {
      if (!post) return;
      postId = await updatePost({ ...rest, image, postId: post._id }).unwrap();
    } else {
      postId = await createPost({ ...rest, image }).unwrap();
    }
    navigate(`/post/${postId}`);
  };

  const createFilePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const file = files[0];

    if (!file)
     
        setFilePreview(
          post?.image
            ? `http://localhost:4000/uploads/${post?.image}`
            : undefined
        );
        

    const fileURL = URL.createObjectURL(file);
    setFilePreview(fileURL);
  };

  return (
    <main className="m-auto min-h-screen max-w-screen-lg px-4 xl:px-0">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
        <h1 className="mb-10 text-4xl font-bold">Create a new post</h1>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
          <div className="flex basis-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="label flex items-center justify-between"
              >
                <span>
                  Title{" "}
                  <span aria-hidden className="text-error">
                    *
                  </span>
                </span>
                <span
                  aria-hidden
                  className={clsx({
                    "text-sm": true,
                    "text-error": errors.title,
                  })}
                >
                  {`${titleCurrentLength} / ${TITLE_MAX_LENGTH}`}
                </span>
              </label>
              <input
                id="title"
                type="text"
                className={clsx({
                  "border-error focus:border-error focus:ring-error":
                    errors.title,
                })}
                aria-required
                aria-invalid={errors.title ? "true" : "false"}
                {...register("title", {
                  required: "Title is required.",
                  maxLength: {
                    value: TITLE_MAX_LENGTH,
                    message: `Title cannot be more than ${TITLE_MAX_LENGTH} characters.`,
                  },
                  onChange: (event) =>
                    setTitleCurrentLength(event.target.value.length),
                })}
              />
              {errors.title && (
                <span
                  role="alert"
                  className="mt-2 flex items-center gap-2 text-sm text-error"
                >
                  <Warning size={16} weight="fill" /> {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="text"
                className="label flex items-center justify-between"
              >
                <span>
                  Text{" "}
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
                  {`${textCurrentLength} / ${TEXT_MAX_LENGTH}`}
                </span>
              </label>
              <textarea
                id="text"
                rows={10}
                className={clsx({
                  "border-error focus:border-error focus:ring-error":
                    errors.text,
                })}
                aria-required
                aria-invalid={errors.text ? "true" : "false"}
                {...register("text", {
                  required: "Text is required.",
                  maxLength: {
                    value: TEXT_MAX_LENGTH,
                    message: `Text cannot be more than ${TEXT_MAX_LENGTH} characters.`,
                  },
                  onChange: (event) =>
                    setTextCurrentLength(event.target.value.length),
                })}
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
          </div>

          <div className="flex basis-1/2 flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="file" className="label">
                Image
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                className="file:mr-2 file:h-12 file:cursor-pointer file:border-none file:bg-primary file:py-2 file:px-4 file:text-white"
                {...register("file", {
                  onChange: createFilePreview,
                })}
                aria-label="select an image file"
              />
            </div>

            {filePreview && (
              <div className="mt-2">
                <img
                  className="w-full"
                  src={filePreview}
                  alt="preview of user's selected file"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="category" className="label">
                Category{" "}
                <span aria-hidden className="text-error">
                  *
                </span>
              </label>
              <select
                id="category"
                className={clsx({
                  "border-error focus:border-error focus:ring-error":
                    errors.category,
                })}
                aria-required
                aria-invalid={errors.category ? "true" : "false"}
                {...register("category", { required: "Category is required." })}
              >
                <option value="option 1">option 1</option>
                <option value="option 2">option 2</option>
              </select>

              {errors.category && (
                <span
                  role="alert"
                  className="mt-2 flex items-center gap-2 text-sm text-error"
                >
                  <Warning size={16} weight="fill" /> {errors.category.message}
                </span>
              )}
            </div>
            <button className="btn mt-2 w-full">
              {edit ? "update" : "post"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Write;
