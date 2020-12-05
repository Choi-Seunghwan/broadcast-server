import { Server } from './server';

export const server = new Server();

server.listen((port) => {
  console.log(`Server is listening on http://localhost:${port}`);
});
