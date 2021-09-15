import Link from "next/link";
import React, { useState } from "react";
import { FormContext, useForm } from "react-hook-form";
import { useSignupMutation } from "../../generated/react-apollo";
import Button from "../ui/Button";
import AsyncError from "../ui/forms/AsyncError";
import FormRow from "../ui/forms/FormRow";

interface IProps {
  onSuccess: () => void;
}

export default function ForSignup({ onSuccess }: IProps): JSX.Element {
  const form = useForm();

  const [signup] = useSignupMutation();
  const [asyncError, setAsyncError] = useState();
  const dismissAsyncError = () => setAsyncError(undefined);

  const onSubmit = async ({
    password2,
    ...input
  }: Record<"email" | "password" | "password2" | "name", string>) => {
    if (password2 !== input.password) {
      form.setError("password", "noMatch", "Passwords don't match");
      form.setError("password2", "noMatch", "Passwords don't match");
    }
    try {
      await signup({ variables: { input } });
      onSuccess();
    } catch (error) {
      setAsyncError(error);
    }
  };

  return (
    <FormContext {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AsyncError asyncError={asyncError} dismiss={dismissAsyncError} />

        <FormRow
          label="Email"
          name="email"
          placeholder="jane@example.com"
          required
          email
        />

        <FormRow label="Name" name="name" placeholder="Jane" required />

        <FormRow label="Password" name="password" required password />

        <FormRow label="Password (repeat)" name="password2" required password />

        <div className="flex justify-between">
          <Button primary submit>
            Signup
          </Button>

          <Link href="/" passHref>
            <Button as="a" className="text-link-muted">
              Sign in
            </Button>
          </Link>
        </div>
      </form>
    </FormContext>
  );
}
