import React from "react";
import { render } from "react-dom";
import { createPersistDecorator } from "final-form-persist";
import { Form, Field } from "react-final-form";

const App = () => {
  const { persistDecorator, clear } = createPersistDecorator({
    name: "myPersistKey",
    debounceTime: 500,
    whitelist: ["name"],
  });
  const initialValues = {
    name: "Hello",
  };

  return (
    <Form
      decorators={[persistDecorator]}
      initialValues={initialValues}
      onSubmit={() => console.log("on submit")}
    >
      {({ form: { reset } }) => (
        <form>
          Name:
          <Field name="name">
            {({ input }) => <input placeholder="Name" {...input} />}
          </Field>
          Password
          <Field name="password">
            {({ input }) => <input placeholder="Password" {...input} />}
          </Field>
          <button
            type="button"
            onClick={() => {
              reset(initialValues);
              clear();
            }}
          >
            Reset
          </button>
        </form>
      )}
    </Form>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
