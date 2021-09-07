import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { useAuthToken } from './auth';

const httpLink = new HttpLink({ uri: 'http://test.api.rollinow.com' });

const authMiddleware = (authToken) =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    adminauth: `Bearer ${authToken}`
                }
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const [authToken] = useAuthToken();
    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink),
        cache
    });
};
