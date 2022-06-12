import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { Application } from './application';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache({ addTypename: false }),
});

function Entry() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default hot(Entry);
