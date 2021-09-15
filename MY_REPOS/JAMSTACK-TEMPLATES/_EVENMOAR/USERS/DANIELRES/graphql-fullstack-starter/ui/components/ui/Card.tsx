import React from "react";

interface IProps {
  children: JSX.Element;
}

export default function Card({ children }: IProps): JSX.Element {
  return <div className="bg-white rounded-lg shadow p-8">{children}</div>;
}
