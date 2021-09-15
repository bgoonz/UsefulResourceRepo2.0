import validateConfig from "@danielres/validate-config";

const config = {
  graphql: {
    URL: [process.env.NEXT_PUBLIC_GRAPHQL_URL, "string"],
  },

  routes: {
    PUBLIC: [["/signup"], "array"],
  },
};

function getChecks() {
  return {
    array: [Array.isArray, (v: unknown[]) => v, "should be an array"],
  };
}

export default validateConfig(getChecks())(config);
