import { Server } from './server';

export const server = new Server();

console.log('@@@', process.env.NODE_ENV);

server.listen((port) => {
  console.log(`Server is listening on http://localhost:${port}`);
});
