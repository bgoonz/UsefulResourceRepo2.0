import React, { useState, useRef, useEffect } from "react";

// HOC is function that takes a Component and returns new component
// Newly returned component renders original component and provides to it additional
// functionality

// const withAlert = (Component) => {
//   return () => {

//   }
// }
const initAlert = () => ({ success: null, error: null });

const withAlert = (Component) => (props) => {
  const [alert, setAlert] = useState(initAlert());
  const setTimeoutId = useRef(null);
  const resourceId = props?.resource?._id;

  const resetAlert = () => setAlert(initAlert());
  const resetTimeout = () =>
    setTimeoutId?.current && clearTimeout(setTimeoutId.current);

  useEffect(() => {
    resetAlert();
    resetTimeout();
    return () => resetTimeout();
  }, [resourceId]);

  const displayAlert = (type, message) => {
    const _alert = initAlert();
    _alert[type] = message;
    setAlert(_alert);
    setTimeoutId.current = setTimeout(() => {
      resetAlert();
    }, 3000);
  };

  return <Component alert={alert} displayAlert={displayAlert} {...props} />;
};

export default withAlert;
