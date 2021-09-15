import { useMutation } from "@apollo/react-hooks";
import flatten from "lodash/flatten";
import get from "lodash/get";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CREATE_TAG, GET_TAGS } from "../../../gql/tags";
import { upperFirst } from "../../../utils/strings";

export default function CreateTag({ ButtonDone, onSuccess }) {
  const initialValues = { description: "", name: "" };
  const [values, setValues] = useState(initialValues);
  const resetValues = () => setValues(initialValues);

  const [createTag, response] = useMutation(CREATE_TAG, {
    update: (cache, { data: { createTag } }) => {
      const { tags } = cache.readQuery({ query: GET_TAGS });
      cache.writeQuery({
        query: GET_TAGS,
        data: { tags: [createTag, ...tags] }
      });
    }
  });

  const submit = e => {
    e.preventDefault();
    createTag({ variables: values }).then(() => {
      if (onSuccess) onSuccess(values);
      resetValues();
    });
  };

  const errors = get(response, "error.graphQLErrors", []);
  const validationErrors = flatten(
    errors.map(e => get(e, "extensions.exception.errors", []))
  );

  return (
    <div>
      {!!errors.length && (
        <ul className="alert mb-4 p-4 list-inside">
          {validationErrors.length
            ? validationErrors.map(e => <li className="list-disc">{e}</li>)
            : errors.map(e => <li>{e.message}</li>)}
        </ul>
      )}

      <form onSubmit={submit}>
        <input
          className="formInput mb-4"
          placeholder="Name"
          value={values.name}
          onChange={e =>
            setValues({ ...values, name: upperFirst(e.target.value) })
          }
        />

        <TextareaAutosize
          className="formInput mb-2"
          placeholder="Description"
          value={values.description}
          onChange={e =>
            setValues({ ...values, description: upperFirst(e.target.value) })
          }
        />

        <div className="justify-between flex">
          <button className="formButton" type="submit">
            Add tag
          </button>

          {ButtonDone && <ButtonDone />}
        </div>
      </form>
    </div>
  );
}
