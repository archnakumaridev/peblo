"use client";

import Link from "next/link";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

import { LoaderCircle } from "lucide-react";

export default function SignupForm() {
    const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) return setError("All fields required");
    if (!email.includes("@")) return setError("Invalid email");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    try {
      setLoading(true);
      await api("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      router.push("/login");
    } catch (err: any) {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Create account
        </h1>

        <p className="mt-3 text-zinc-500">
          Start your AI productivity journey.
        </p>
      </div>

      {/* Form */}
      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <Input
            placeholder="John Doe"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
        <Button className="w-full py-3 rounded-xl text-base" type="submit">
         { loading ? <LoaderCircle/> : "Create Account"}
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-black dark:text-white"
        >
          Login
        </Link>
      </p>
    </div>
  );
}