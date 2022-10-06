import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import ILoginForm from "../types/ILoginForm";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    console.log(data);
  };

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <div className="flex w-full max-w-md flex-col items-center border py-10 px-4">
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        {error && (
          <span className="text-error" role="alert">
            Something went wrong...
          </span>
        )}

        <form
          className="m-auto my-6 flex w-full max-w-sm flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="label">
              <span>
                Email{" "}
                <span aria-hidden className="text-error">
                  *
                </span>
              </span>
            </label>
            <input
              id="email"
              type="email"
              className={clsx({
                "border-error": errors.email,
              })}
              aria-required
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", { required: "This field is required." })}
            />

            {errors.email && (
              <span
                role="alert"
                className="mt-2 flex items-center gap-2 text-sm text-error"
              >
                <Warning size={16} weight="fill" /> {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="label flex justify-between">
              <span>
                Password{" "}
                <span aria-hidden className="text-error">
                  *
                </span>
              </span>

              <button
                type="button"
                className="text-gray-600"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                aria-label={
                  isPasswordVisible
                    ? "Hide password."
                    : "Show password as plain text. Warning: this will display your password on the screen."
                }
              >
                {isPasswordVisible ? "Hide password" : " Show password"}
              </button>
            </label>

            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              className={clsx({
                "border-error": errors.password,
              })}
              aria-required
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "This field is required.",
              })}
            />

            {errors.password && (
              <p
                role="alert"
                className="mt-2 flex items-center gap-2 text-sm text-error"
              >
                <Warning size={16} weight="fill" /> {errors.password.message}
              </p>
            )}
          </div>

          <div aria-hidden>
            Fields marked with <span className="text-error">*</span> are
            required.
          </div>

          <button className="btn btn-primary mt-8">login</button>
        </form>

        <div>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-info">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
