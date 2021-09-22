import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import moment from "moment";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      uri: process.env.BASE_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience({ startDate, endDate }, args, { cache }) {
            let now = moment().unix();

            if (endDate) {
              now = endDate / 1000;
            }

            return moment.unix(now).diff(moment.unix(startDate / 1000), "days");
          },
        },
      },
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
