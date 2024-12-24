"use client";

import { Button, Input, Link } from "@nextui-org/react";
import React, { useActionState } from "react";
import { loginAction } from "./action";
import { Logo } from "@/components/logo";

export default function Login() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="space-y-6">
      <Logo />
      <section>
        <h3>Login</h3>
        <p>Sign in to your account</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input
          variant="bordered"
          name="email"
          placeholder="email@domain.com"
          isRequired
        />
        <Input
          variant="bordered"
          name="password"
          type="password"
          placeholder="Password"
          isRequired
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={pending}
          color="primary"
        >
          Sign in
        </Button>
        {state?.status === "error" && (
          <p className="text-rose-500 text-center text-sm bg-rose-50 p-2 rounded-lg">
            {state.message}
          </p>
        )}
      </form>

      <section>
        <p>
          Don&lsquo;t have an account? <Link href="/register">Register</Link>
        </p>
      </section>
    </div>
  );
}
