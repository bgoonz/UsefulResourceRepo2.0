export type TFormInputPattern = {
  value: RegExp;
  message: string;
};

type TFormInputPatterns = {
  [key: string]: TFormInputPattern;
};

export const patterns = {
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address",
  },
} as TFormInputPatterns;
