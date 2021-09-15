import { Stack } from "./Stack";

export function Prose({ children }) {
  return (
    <>
      <div className="outer text-white text-opacity-90 text-left text-sm leading-6">
        <Stack spacing="md">{children}</Stack>
      </div>

      <style jsx>
        {`
          .outer {
            font-family: "Courier Prime";
            text-shadow: 0 0 16px #ffffffaa;
          }
        `}
      </style>
    </>
  );
}
