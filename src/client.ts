import messageHandler from './webSocket/messageHandler';

export default class Client {
  private socketId: string;
  private accountId?: string;
  private ip: string;
  private server: any;
  private socket: any;
  private accessingCountry?: string;

  constructor(socketId: string, ip: string, server: any, socket: any) {
    this.socketId = socketId;
    this.ip = ip;
    this.server = server;
    this.socket = socket;

    this.handleSocketMessage();
  }

  private handleSocketMessage(): void {
    this.socket.on('message', (method: string[], args) => {
      messageHandler(this, this.server, this.socket, method, args);
    });
  }
}
