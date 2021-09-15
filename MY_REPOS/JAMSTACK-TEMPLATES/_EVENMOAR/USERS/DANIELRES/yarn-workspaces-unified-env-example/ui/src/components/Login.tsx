import * as React from "react";
import { useAuth } from "../services";

const buttonBase = `py-2 px-4 rounded`;
const css = {
  outer: `container mx-auto m-8 p-8 bg-white shadow-lg`,
  row: `my-8`,
  buttons: {
    primary: `${buttonBase} text-white bg-blue-500 hover:bg-blue-700`
  }
};

export default () => {
  const { loginWithRedirect } = useAuth();

  const onSubmit = () => {
    loginWithRedirect();
  };

  return (
    <div className={css.outer}>
      <form onSubmit={onSubmit}>
        <div className={`${css.row} text-center`}>
          <button
            className={css.buttons.primary}
            data-test-id="button-login"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
