import Link from "next/link";
import React, { useState } from "react";
import { FormContext, useForm } from "react-hook-form";
import { MeDocument, useSigninMutation } from "../../generated/react-apollo";
import Button from "../ui/Button";
import AsyncError from "../ui/forms/AsyncError";
import FormRow from "../ui/forms/FormRow";

export default function FormSignin(): JSX.Element {
  const form = useForm();
  const [asyncError, setAsyncError] = useState();

  const [signin] = useSigninMutation({
    update: (store, { data }) => {
      store.writeQuery({ query: MeDocument, data: { me: data?.signin } });
    },
  });

  const dismissAsyncError = () => setAsyncError(undefined);

  const onSubmit = async (input: Record<"email" | "password", string>) => {
    signin({ variables: { input } }).catch(setAsyncError);
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

        <FormRow label="Password" name="password" required password />

        <div className="flex justify-between">
          <Button primary submit>
            Sign in
          </Button>

          <Link href="/signup" passHref>
            <Button as="a" className="text-link-muted">
              Signup
            </Button>
          </Link>
        </div>
      </form>
    </FormContext>
  );
}
