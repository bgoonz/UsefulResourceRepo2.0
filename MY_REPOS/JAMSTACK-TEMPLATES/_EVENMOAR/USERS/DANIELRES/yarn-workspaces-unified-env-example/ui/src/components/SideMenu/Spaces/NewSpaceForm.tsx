import * as React from "react";
import { useMutation } from "urql";

const ADD_TENANT = /* GraphQL */ `
  mutation addTenant($name: String!) {
    addTenant(name: $name) {
      id
      name
    }
  }
`;

const css = {
  input: `text-sm px-2 py-1 mb-2 w-full text-gray-700 bg-gray-200 rounded-l`,
  buttons: {
    submit: `text-sm px-2 py-1 bg-green-500 text-white font-semibold rounded-r`
  },
  columns: { outer: `flex`, left: ``, right: `` }
};

export default () => {
  const [newSpaceName, setNewSpaceName] = React.useState("");
  const [res, executeMutation] = useMutation(ADD_TENANT);
  const onSubmit = e => {
    e.preventDefault();
    executeMutation({ name: newSpaceName });
  };

  if (res.fetching) return null;

  return (
    <form onSubmit={onSubmit}>
      <div className={css.columns.outer}>
        <div className={css.columns.left}>
          <label>
            <input
              className={css.input}
              onChange={e => setNewSpaceName(e.target.value)}
              placeholder="+ New space"
              type="text"
              value={newSpaceName}
            />
          </label>
        </div>

        {newSpaceName && (
          <div className={css.columns.right}>
            <button className={css.buttons.submit}>+</button>
          </div>
        )}
      </div>
    </form>
  );
};
