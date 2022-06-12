// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: __dirname + '/../../.env' });

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from 'api/graphql';

const mount = async (app: Application) => {
  app.use(express.json({ limit: '2mb' }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app, path: '/api' });
  app.listen(process.env.API_PORT);

  console.log(`[app] : http://localhost:${process.env.API_PORT}`);
};

void mount(express());
