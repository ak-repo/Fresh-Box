import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser, useToast } from "../../ContextAPI/ContextCreater&Hook";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toastSuccess, toastFail } = useToast();
  const { user, login } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  // form filling
  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  // form submitting handle
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (login(loginData)) {
      toastSuccess("🎉 Welcome back! You’ve logged in successfully.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toastFail("❌ Oops! Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <Link to="/">
          {" "}
          <img
            src="assets/FRESH-BOX-logo.png"
            className="w-19 m-auto my-0 rounded-full"
          />
        </Link>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var( --color-black)]">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-1 p-5 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={loginData.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--color-dark)]:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forget"
                    className="font-semibold hover:text-[var(--color-dark)]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={loginData.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-[var(--color-dark)] sm:text-sm/6"
                />
                <div
                  className=""
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[var(--color-black)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[var(--color-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-black)]"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Not have a account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[var(--color-text)] hover:text-[var(--color-text-light)]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
