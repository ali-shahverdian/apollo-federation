const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

async function startGateway() {
  const app = express();

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'rma', url: 'http://localhost:4000/graphql' },
        // { name: 'content-api', url: 'http://localhost:8082/graphql' },
        // { name: 'file-api', url: 'http://localhost:8083/graphql' },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4001, () => console.log('Gateway running at http://localhost:4001/graphql'));
}

startGateway();