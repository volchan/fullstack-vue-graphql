import Vue from "vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "");
    }

    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) console.log("[networkError]", networkError);

    if (graphQLErrors) {
      graphQLErrors.forEach(err => console.dir(err));
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

export default apolloProvider;
