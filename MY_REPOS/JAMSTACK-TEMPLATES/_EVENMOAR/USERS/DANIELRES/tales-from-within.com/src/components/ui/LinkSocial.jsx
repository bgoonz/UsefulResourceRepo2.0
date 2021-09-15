import { InlineIcon } from "./InlineIcon";

export function LinkSocial({ Icon, href, children, size = 20 }) {
  return (
    <a
      target="_blank"
      href={href}
      className="text-white opacity-80 hover:opacity-100 transition transition-opacity duration-200"
    >
      <InlineIcon size={size}>
        <Icon />
      </InlineIcon>{" "}
      {children}
    </a>
  );
}
