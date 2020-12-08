import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import cors from 'cors';
import messageHandler from './webSocket/messageHandler';
import api from './api';
import middlewares from './api/middleware';
import Live from '@/services/live';
import Account from '@/services/account';

export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  private io: SocketIOServer;
  private readonly DEFAULT_PORT = 5000;

  private activeSockets: string[] = [];

  private accountService: Account;
  private liveService: Live;

  constructor() {
    this.initialize();

    this.handleRoutes();
    this.handleSocketConnection();
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = socketIO(this.httpServer);

    this.accountService = new Account();
    this.liveService = new Live();
  }

  private handleRoutes(): void {
    this.app.use(cors());
    this.app.use('/', middlewares);
    this.app.use('/api', api);
  }

  private handleSocketConnection(): void {
    this.io.on('connection', (socket) => {
      messageHandler(this, socket);
    });
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
  }
}
