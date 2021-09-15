import { ApolloError } from "apollo-boost";
import React from "react";
import Alert from "../Alert";

interface IProps {
  asyncError?: ApolloError;
  dismiss?: () => void;
}

export default function AsyncError({
  asyncError,
  dismiss,
}: IProps): JSX.Element | null {
  if (!asyncError) return null;

  return (
    <Alert className="mb-4" dismiss={dismiss} type="danger">
      {asyncError.graphQLErrors[0].message}
    </Alert>
  );
}
