import { helpers } from "vuelidate/lib/validators";

// 'jpg', 'png', 'jpeg', 'svg'

export const supportedFileType = (value) => {
  // if value is not required and value is empty then returns true because field if valid
  if (!helpers.req(value)) {
    return true;
  }

  const allowedFormats = ["jpg", "png", "jpeg", "svg"];
  const extension = value.split(".").pop();
  return allowedFormats.includes(extension);
};
