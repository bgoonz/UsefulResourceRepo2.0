import React, { ReactNode, useEffect, useState } from "react";
import { parseHost } from "../pages/api/utils/parseHost";

type ProtectedProps = {
  children: ReactNode;
  profile?: { name: string; email: string; picture: string };
};

export const Protected = ({ children, profile }: ProtectedProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // "useEffect" is only executed browser-side.
    // We need this because "location" exists only browser-side.
    setIsBrowser(true);
  }, []);

  if (profile) return <>{children}</>;

  if (isBrowser) {
    const { domain, port } = parseHost(location.host);

    const href = `//${domain}${
      port ? `:${port}` : ""
    }/connect/google?redirect=${location}`;

    return (
      <div>
        <a href={href} target="_self">
          Continue with Google
        </a>
      </div>
    );
  }

  return <>"Loading..."</>;
};
