import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import moment from "moment";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      uri: "http://localhost:4000/graphql",
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
      link: httpLink,
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
