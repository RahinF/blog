import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import IRegisterForm from "../types/IRegisterForm";

const PASSWORD_REGEX: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USERNAME_MAX_LENGTH: number = 20;

const Register = () => {
  const [error, setError] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    console.log(data);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-primary p-4">
      <div className="w-full max-w-md bg-white py-4">
        <h1 className="my-4 text-center text-3xl font-bold">Register</h1>

        {error && (
          <span className="mb-6 block text-center text-red-500">
            Something went wrong...
          </span>
        )}

        <form
          className="m-auto mt-6 flex max-w-sm flex-col items-center gap-8 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="px-1 py-2">
                Username{" "}
                <span aria-hidden className="text-red-500">
                  *
                </span>
              </label>
              <input
                id="username"
                type="text"
                className="input input-bordered"
                aria-required
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username", {
                  required: "This field is required.",
                  maxLength: {
                    value: USERNAME_MAX_LENGTH,
                    message: "Username cannot be more than 20 characters.",
                  },
                })}
              />
              {errors.username && (
                <p role="alert" className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="px-1 py-2">
                Email{" "}
                <span aria-hidden className="text-red-500">
                  *
                </span>
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered"
                aria-required
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", { required: "This field is required." })}
              />

              {errors.email && (
                <p role="alert" className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="px-1 py-2">
                Password{" "}
                <span aria-hidden className="text-red-500">
                  *
                </span>
              </label>
              <input
                id="password"
                type="password"
                className="input input-bordered"
                aria-required
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "This field is required.",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message:
                      "Password must contain 8 characters including at least 1 letter and 1 number.",
                  },
                })}
              />

              {errors.password && (
                <p role="alert" className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <span aria-hidden>
            Fields marked with <span className="text-red-500">*</span> are
            required.
          </span>

          <div className="flex w-full flex-col gap-6">
            <button className="btn">register</button>
            <span className="self-center">
              Have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
