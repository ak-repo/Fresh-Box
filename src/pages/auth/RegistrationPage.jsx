import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useUser, useToast } from "../../ContextAPI/ContextCreater&Hook";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { toastSuccess, toastFail } = useToast();
  const {
    registrationForm,
    setFormData,
    formValidation,
    register,
    userChecker,
    error,
  } = useUser();

  //form filling
  const handleChange = (event) => {
    setFormData({
      ...registrationForm,
      [event.target.name]: event.target.value,
    });
  };

  // form submission handling
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValidation(registrationForm)) {
      toastFail("⚠️ Couldn’t create account. Please try again later.");
      return;
    }

    //checking the email already existing
    if (!userChecker("email", registrationForm.email)) {
      toastFail("User Email already Existing");
      return;
    }
    //registration process
    if (
      register({
        ...registrationForm,
      })
    ) {
      toastSuccess("👋 Account created! Let’s get you started. ");
      navigate("/login");
    } else {
      toastFail("⚠️ Couldn’t create account. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <Link to="/">
          {" "}
          <img
            src="/assets/FRESH-BOX-logo.png"
            className="w-19 m-auto my-0 rounded-full"
          />
        </Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var( --color-black)]">
            Register new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-1 p-5 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  value={registrationForm.name}
                  onChange={handleChange}
                  id="fullname"
                  placeholder="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--color-dark)]:text-sm/6"
                />
              </div>
              {error?.name && (
                <p className="text-red-500 text-sm">{error.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={registrationForm.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--color-dark)]:text-sm/6"
                />
              </div>
              {error?.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={registrationForm.password}
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
              {error?.password && (
                <p className="block text-sm/6 font-medium text-gray-900">
                  {error.password}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[var(--color-black)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[var(--color-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dark)]"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Already have a account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--color-black)] hover:text-[var(--color-dark)]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
