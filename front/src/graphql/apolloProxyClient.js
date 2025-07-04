import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => ({
    headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Device-ID': 'abc123',
    }
}));

const client = new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: 'http://localhost:3003/graphql' })),
    cache: new InMemoryCache(),
});

export default client;
