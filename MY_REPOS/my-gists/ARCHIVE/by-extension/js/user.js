import useSWR from "swr";
import { fetcher } from "@/actions";
import { useEffect, useState } from "react";

function doesHttpOnlyCookieExist(cookiename) {
  var d = new Date();
  d.setTime(d.getTime() + 1000);
  var expires = "expires=" + d.toUTCString();

  document.cookie = cookiename + "=new_value;path=/;" + expires;
  if (document.cookie.indexOf(cookiename + "=") == -1) {
    return true;
  } else {
    return false;
  }
}

export const useGetUser = () => {
  const [isMounted, setIsMounted] = useState(false);
  const hasAuthCookie = isMounted
    ? doesHttpOnlyCookieExist("a0:session")
    : false;

  useEffect(() => setIsMounted(true));

  const { data, error, isValidating, ...rest } = useSWR(
    hasAuthCookie ? "/api/v1/me" : null,
    fetcher
  );

  return {
    data,
    error,
    loading: isMounted && isValidating,
    ...rest,
  };
};
