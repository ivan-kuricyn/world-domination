import { init } from './app';

const PORT = process.env.PORT || '8001';
const ENDPOINT = '/';

init(PORT, ENDPOINT)
  .then((server) => {
    console.log(`GraphQL server started on port ${PORT}.\n`);
    console.log(`Endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    return server;
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
