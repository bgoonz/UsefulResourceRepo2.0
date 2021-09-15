import { ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import UnknownError from "./errors/UnknownError";

const reportUnknownError = (error: GraphQLError) => {
  // TODO: use actual error logging/reporting service like Sentry
  console.error("\n");
  console.error("== UNKOWN ERROR ".padEnd(70, "="));
  console.error(new Date().toUTCString());
  console.error("\n");
  console.error(JSON.stringify(error, null, 2));
  console.error("== /UNKOWN ERROR ".padEnd(70, "="));
  console.error("\n");
};

export default (error: GraphQLError): ApolloError | Error => {
  if (error instanceof GraphQLError)
    if (error.extensions?.exception.isSafeError) return error;

  reportUnknownError(error);
  return new UnknownError();
};
