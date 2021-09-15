import { useEffect } from "react";

export default (ref, cb) => {
  const handleOutsideClick = event => {
    if (ref.current && !ref.current.contains(event.target)) cb();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });
};
