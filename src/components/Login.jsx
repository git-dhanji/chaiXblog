import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { Button, Input, Spinner } from "./index";
import AuthShell from "./AuthShell";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthShell>
      <h1 className="font-display text-3xl font-bold text-fg">Welcome back</h1>
      <p className="mt-2 text-fg-muted">
        Sign in to continue reading and writing.
      </p>

      {error && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
        <Input
          label="Email"
          placeholder="you@email.com"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Please enter a valid email address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? <Spinner /> : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-fg-muted">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-accent hover:underline"
        >
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}

export default Login;
