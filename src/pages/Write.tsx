import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IWriteForm {
  title: string;
  description: string;
  category: string;
  image: FileList;
}

const Write = () => {
  const [titleCurrentLength, setTitleCurrentLength] = useState<number>(0);
  const [descCurrentLength, setDescCurrentLength] = useState<number>(0);
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWriteForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IWriteForm> = async (data) => {
    console.log(data);
    const file = data.image[0];
    console.log(file);
  };

  const TITLE_MAX_LENGTH: number = 100;
  const DESCRIPTION_MAX_LENGTH: number = 5000;

  // image preview
  useEffect(() => {
    if (!currentImageFile) return setPreview(undefined);
    const objectUrl = URL.createObjectURL(currentImageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [currentImageFile]);

  return (
    <main className="m-auto min-h-screen max-w-screen-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto mt-10 max-w-md">
        <h1 className="text-3xl font-bold">Create a new post</h1>

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
              "border-error focus:border-error focus:ring-error": errors.title,
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
            htmlFor="description"
            className="label flex items-center justify-between"
          >
            <span>
              Description{" "}
              <span aria-hidden className="text-error">
                *
              </span>
            </span>
            <span
              aria-hidden
              className={clsx({
                "text-sm": true,
                "text-error": errors.description,
              })}
            >
              {`${descCurrentLength} / ${DESCRIPTION_MAX_LENGTH}`}
            </span>
          </label>
          <textarea
            id="description"
            rows={10}
            className={clsx({
              "border-error focus:border-error focus:ring-error":
                errors.description,
            })}
            aria-required
            aria-invalid={errors.description ? "true" : "false"}
            {...register("description", {
              required: "Description is required.",
              maxLength: {
                value: DESCRIPTION_MAX_LENGTH,
                message: `Description cannot be more than ${DESCRIPTION_MAX_LENGTH} characters.`,
              },
              onChange: (event) =>
                setDescCurrentLength(event.target.value.length),
            })}
          />
          {errors.description && (
            <span
              role="alert"
              className="mt-2 flex items-center gap-2 text-sm text-error"
            >
              <Warning size={16} weight="fill" /> {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="label">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", {
              onChange: (event) => setCurrentImageFile(event.target.files[0]),
            })}
          />
        </div>

        {preview && (
          <div>
            <img src={preview} alt="preview of user's selected file" />
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
        <button className="btn">post</button>
      </form>
    </main>
  );
};

export default Write;
