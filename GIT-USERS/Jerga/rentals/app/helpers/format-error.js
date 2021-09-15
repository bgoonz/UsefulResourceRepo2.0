import { helper } from "@ember/component/helper";

export function formatError(errorsArr) {
  const errorMap = [];
  const errors = errorsArr[0];

  if (errors) {
    Object.keys(errors).forEach((error) => {
      errorMap.push(`${error} ${errors[error]}`);
    });
  }

  return errorMap;
}

export default helper(formatError);
