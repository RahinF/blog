import clsx from "clsx";
import { Warning } from "phosphor-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import IRegisterForm from "../types/IRegisterForm";

const PASSWORD_REGEX: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USERNAME_MAX_LENGTH: number = 30;

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const [usernameCurrentLength, setUsernameCurrentLength] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    console.log(data);
  };

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <div className="flex w-full max-w-md flex-col items-center border py-10 px-4">
        <h1 className="mb-6 text-3xl font-bold">Register</h1>

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
                "border-error focus:border-error focus:ring-error":
                  errors.username,
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
            <label htmlFor="email" className="label">
              Email{" "}
              <span aria-hidden className="text-error">
                *
              </span>
            </label>
            <input
              id="email"
              type="email"
              className={clsx({
                "border-error focus:border-error focus:ring-error":
                  errors.email,
              })}
              aria-required
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", { required: "Email address is required." })}
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
                "border-error focus:border-error focus:ring-error":
                  errors.password,
              })}
              aria-required
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required.",
                pattern: {
                  value: PASSWORD_REGEX,
                  message:
                    "Password must contain 8 characters including at least 1 letter and 1 number.",
                },
              })}
            />

            {errors.password && (
              <span
                role="alert"
                className="mt-2 flex items-center gap-2 text-sm text-error"
              >
                <Warning size={16} weight="fill" /> {errors.password.message}
              </span>
            )}
          </div>

          <div aria-hidden>
            Fields marked with <span className="text-error">*</span> are
            required.
          </div>

          <button className="btn btn-primary mt-8">register</button>
        </form>
        <div>
          Have an account?{" "}
          <Link to="/login" className="font-semibold text-info">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
