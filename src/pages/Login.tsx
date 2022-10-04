import clsx from "clsx";
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
    <div className="grid min-h-screen place-items-center bg-blue-300 p-4">
      <div className="flex w-full max-w-md flex-col items-center rounded bg-white py-10 px-4">
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        {error && (
          <span className="text-red-600" role="alert">
            Something went wrong...
          </span>
        )}

        <form
          className="m-auto my-6 flex w-full max-w-sm flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="flex flex-col">
            <label htmlFor="email" className="label">
              <span>
                Email{" "}
                <span aria-hidden className="text-red-600">
                  *
                </span>
              </span>
            </label>
            <input
              id="email"
              type="email"
              className={clsx({
                "input input-bordered": true,
                "input-error": errors.email,
              })}
              aria-required
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", { required: "This field is required." })}
            />

            {errors.email && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </section>

          <section className="flex flex-col">
            <label htmlFor="password" className="label">
              <span>
                Password{" "}
                <span aria-hidden className="text-red-600">
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
                "input input-bordered": true,
                "input-error": errors.password,
              })}
              aria-required
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "This field is required.",
              })}
            />

            {errors.password && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </section>

          <div aria-hidden>
            Fields marked with <span className="text-red-600">*</span> are
            required.
          </div>

          <button className="btn btn-primary mt-8">login</button>
        </form>

        <div>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
