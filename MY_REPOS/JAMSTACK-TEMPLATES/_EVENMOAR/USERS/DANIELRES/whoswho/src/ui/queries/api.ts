import * as config from "../config";

const getApiUrl = () => `${window.location.origin}${config.api.path}`;

export const get = (path: string) => async () => {
  const res = await fetch(`${getApiUrl()}${path}`);
  if (res.ok) return res.json();
  handleFailedResponse(res);
};

export const post = (path: string) => async (values: {
  [k: string]: string;
}) => {
  const res = await fetch(`${getApiUrl()}${path}`, {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (res.ok) return res.json();

  if (res.status === 409) throw new Error("Resource already exists");
  handleFailedResponse(res);
};

const handleFailedResponse = async (res: Response) => {
  let error: string = "Unknown error";

  try {
    error = (await res.json()).error;
  } catch (_) {
    error = `${res.status}: ${res.statusText}`;
  } finally {
    console.error(error);
    throw new Error(error);
  }
};
