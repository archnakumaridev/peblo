"use client";

import Link from "next/link";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { LoaderCircle } from "lucide-react";

export default function LoginForm() {
   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("All fields required");
    if (!email.includes("@")) return setError("Invalid email");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    try {
      setLoading(true);
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-3 text-zinc-500">
          Login to continue your workspace.
        </p>
      </div>

      {/* Form */}
      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
                {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

        <Button className="w-full py-3 rounded-xl text-base" type="submit" >
          {loading ? <LoaderCircle/> : "Login"}
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-black dark:text-white"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}