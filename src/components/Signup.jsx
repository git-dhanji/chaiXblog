import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
import { Button, Input, Spinner } from "./index.js";
import AuthShell from "./AuthShell";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthShell>
      <h1 className="font-display text-3xl font-bold text-fg">
        Create your account
      </h1>
      <p className="mt-2 text-fg-muted">
        Join Inkwell and start sharing your stories.
      </p>

      {error && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          {...register("name", { required: true })}
        />
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
          placeholder="Create a strong password"
          {...register("password", {
            required: true,
            minLength: { value: 8, message: "At least 8 characters" },
          })}
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? <Spinner /> : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-fg-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}

export default Signup;
