import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { useAuthToken } from "./auth";

const httpLink = new HttpLink({ uri: "http://api.rollinow.com" });

const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    console.log(authToken)
    if (authToken) {
      console.log("in", authToken)
      operation.setContext({
        headers: {
          adminauth: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {

  const [authToken] = useAuthToken();
  console.log(authToken);
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};
