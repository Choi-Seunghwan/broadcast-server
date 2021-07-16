import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import cors from 'cors';
import api from './api';
import middlewares from './api/middleware';
import Client from './client';
import _LiveService, { LiveService } from '@/services/LiveService';
import _AccountService, { AccountService } from '@/services/AccountService';
import _DbConnector, { DbConnector } from '@/libs/DbConnector';
import { SocketReplyMessage } from '@/utils/types';
import logger from '@/utils/logger';

export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  public io: SocketIOServer;
  private readonly DEFAULT_PORT = 5000;
  private clientMap: Map<string, Client>;
  private accountService: AccountService;
  private liveService: LiveService;
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
    this.accountService = _AccountService;
    this.liveService = _LiveService;
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

  public connectLiveService(): LiveService {
    return this.liveService;
  }

  public connectAccountService(): AccountService {
    return this.accountService;
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
  }
}
