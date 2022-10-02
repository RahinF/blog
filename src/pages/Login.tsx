import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import ILoginForm from "../types/ILoginForm";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Login = () => {
  const [error, setError] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    console.log(data);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-primary p-4">
      <div className="w-full max-w-md bg-white py-4">
        <h1 className="my-4 text-center text-3xl font-bold">Login</h1>

        {error && (
          <span className="mb-6 block text-center text-error">
            Something went wrong...
          </span>
        )}

        <form
          className="m-auto flex max-w-sm flex-col items-center gap-8 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-10">
            <div className="relative flex flex-col gap-2">
              <input
                id="email"
                type="email"
                className="input-floating peer"
                placeholder="Email"
                {...register("email", { required: "This field is required." })}
              />
              <label htmlFor="email" className="label-floating">
                Email
              </label>
              {errors.email && (
                <p className="text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            <div className="relative flex flex-col gap-2">
              <input
                id="password"
                type="password"
                className="input-floating peer"
                placeholder="Password"
                {...register("password", {
                  required: "This field is required.",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message:
                      "Password must contain 8 characters including at least 1 letter and 1 number.",
                  },
                })}
              />
              <label htmlFor="password" className="label-floating">
                Password
              </label>
              {errors.password && (
                <p className="text-sm text-error">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            <button className="btn">login</button>
            <span className="self-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;