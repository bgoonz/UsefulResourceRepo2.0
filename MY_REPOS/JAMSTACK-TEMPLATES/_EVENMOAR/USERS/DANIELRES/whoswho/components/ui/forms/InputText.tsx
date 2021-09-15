import React from "react";
import classnames from "classnames";
import { FieldErrors, UseFormMethods } from "react-hook-form";

type TInputTextProps = {
  errors: FieldErrors;
  label: string;
  name: string;
  [key: string]: any;
};

export const InputText = React.forwardRef<HTMLInputElement, TInputTextProps>(
  ({ errors, label, name, ...rest }, ref) => {
    const id = `${name}`;

    return (
      <div>
        <div
          className={classnames(
            "relative border rounded shadow appearance-none label-floating",
            { "border-red-500": Boolean(errors[name]) }
          )}
        >
          <input
            className="w-full py-2 px-3 text-gray-700 leading-normal rounded"
            id={id}
            name={name}
            placeholder={label}
            type="text"
            ref={ref}
            {...rest}
          />

          {label && (
            <label
              className="absolute block text-gray-500 top-0 left-0 w-full px-3 py-2 leading-normal"
              htmlFor={id}
            >
              {label}
            </label>
          )}
        </div>
        <div className="text-red-500 text-sm">
          {errors[name] && errors[name].message}
        </div>
      </div>
    );
  }
);
