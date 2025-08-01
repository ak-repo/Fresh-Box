import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../ContextAPI/ContextCreater&Hook";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toastSuccess, toastFail } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toastSuccess("Password reset link sent to your email!");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      toastFail("Failed to send reset link. Please try again.", error.message);
    }
  };

  return (
    <div className="flex min-h-full h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* Centered Logo - same as login page */}
      <div className="flex justify-center">
        <Link to="/" className="inline-flex items-center">
          <h1 className="text-2xl font-bold text-black flex items-baseline">
            <span>FRESH</span>
            <span className="ml-1.5 px-1.5 py-0.5 bg-emerald-700 text-white rounded text-lg">
              BOX
            </span>
          </h1>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we'll send you a link to reset your password.
        </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-black)]"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-[var(--color-text)] hover:text-[var(--color-text-light)]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
