import { shortId } from "src/api/utils/shortId";

export const reportError = ({
  prefix,
  error,
  status,
}: {
  prefix: string;
  error: any;
  status: number;
}) => {
  const id = shortId();
  console.error(
    `${prefix} Error ${status}:`,
    error.message,
    "|",
    id,
    new Date()
  );
  return { id };
};
