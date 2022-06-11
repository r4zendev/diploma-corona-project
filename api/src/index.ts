// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, statsResolvers } from 'api/graphql';

const mount = async (app: Application) => {
  app.use(express.json({ limit: '2mb' }));

  const server = new ApolloServer({
    typeDefs,
    resolvers: statsResolvers,
  });

  await server.start();

  server.applyMiddleware({ app, path: '/api' });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

void mount(express());
