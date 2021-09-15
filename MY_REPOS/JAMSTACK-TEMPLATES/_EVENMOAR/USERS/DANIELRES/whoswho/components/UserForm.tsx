import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { User } from "../src/ui/queries";
import { Button } from "./ui/Button";
import { InputText } from "./ui/forms/InputText";
import { patterns } from "./ui/forms/patterns";
import { Stack } from "./ui/Stack";

export const UserForm = () => {
  const { handleSubmit, register, errors, reset } = useForm();
  const { addToast } = useToasts();

  const onSuccess = (user: TUser) => {
    addToast(`New member added: ${user.name}`, {
      appearance: "success",
      autoDismiss: true,
    });
    reset();
  };

  const onError = (error: { message: React.ReactNode }) => {
    addToast(error.message, {
      appearance: "warning",
      autoDismiss: true,
    });
  };

  const onSubmit = (values: TUserInput) => {
    console.log({ values });

    User.create(values).then(onSuccess).catch(onError);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <InputText
          autoFocus
          label="Email"
          name="email"
          errors={errors}
          ref={register({
            pattern: patterns.email,
            required: "Required",
          })}
        />

        <InputText
          label="Username"
          name="name"
          errors={errors}
          ref={register({
            validate: (value) => value !== "admin" || "Nice try!",
            required: "Required",
          })}
        />

        <div className="flex justify-between">
          <Button type="submit">Submit</Button>
          <Button onClick={() => reset()} type="button">
            Reset
          </Button>
        </div>
      </Stack>
    </form>
  );
};
