import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import cors from 'cors';
import api from './api';
import middlewares from './api/middleware';
import Client from './client';
import Live from '@/services/Live';
import _Account, { Account } from '@/services/account';
import _DbConnector, { DbConnector } from '@/libs/DbConnector';
import { SocketReplyMessage } from '@/utils/types';

export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  public io: SocketIOServer;
  private readonly DEFAULT_PORT = 5000;
  private clientMap: Map<string, Client>;
  private accountService: Account;
  private liveService: Live;
  private dbConnector: DbConnector;

  constructor() {
    this.initialize();
    this.handleAPI();
    this.handleWebSocket();
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = socketIO(this.httpServer);
    this.dbConnector = _DbConnector;
    this.clientMap = new Map();
    this.accountService = _Account;
    this.liveService = new Live();
  }

  private handleAPI(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/', middlewares);
    this.app.use('/api', api);
  }

  private handleWebSocket(): void {
    this.io.on('connection', (socket) => {
      const { id, handshake } = socket;

      const client = new Client(id, handshake.address, this, socket);
      this.clientMap.set(id, client);
    });
  }

  public replyMessage(socket, replyMessage: SocketReplyMessage): void {
    socket.emit('replyMessage', replyMessage);
  }

  public connectLiveService(): Live {
    return this.liveService;
  }

  public connectAccountService(): Account {
    return this.accountService;
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
  }
}
