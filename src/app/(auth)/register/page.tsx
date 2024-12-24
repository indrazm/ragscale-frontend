"use client";

import { Alert, Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import React, { useActionState } from "react";
import { registerAction } from "./action";
import { Logo } from "@/components/logo";

export default function Register() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <div className="space-y-6">
      <Logo />
      <section>
        <h3>Register</h3>
        <p>Create an account to continue</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input
          variant="bordered"
          name="username"
          placeholder="username"
          isRequired
        />
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
      </form>
      {state?.status === "error" && (
        <p className="text-rose-500 text-center text-sm bg-rose-50 p-2 rounded-lg">
          {state.message}
        </p>
      )}
      <section>
        <p>
          Have an account? <Link href="/login">Login</Link>
        </p>
      </section>
    </div>
  );
}
