import { UdpSocket, getBroadcastAddresses } from '@bobfrankston/rmfudp';
import { LxTransport, RemoteInfo } from '@bobfrankston/lxlan';

/**
 * Node.js UDP transport for LIFX LAN
 */
export class NodeUdpTransport implements LxTransport {
    private socket: UdpSocket;
    private messageHandler?: (data: Buffer, rinfo: RemoteInfo) => void;
    private errorHandler?: (err: Error) => void;
    private closeHandler?: () => void;

    constructor(port: number = 56700, reuseAddr: boolean = true) {
        this.socket = new UdpSocket({
            port,
            reuseAddr
        });

        this.socket.on('message', (msg, rinfo) => {
            if (this.messageHandler) {
                this.messageHandler(msg, {
                    address: rinfo.address,
                    port: rinfo.port
                });
            }
        });

        this.socket.on('error', (err) => {
            if (this.errorHandler) {
                this.errorHandler(err);
            }
        });

        this.socket.on('close', () => {
            if (this.closeHandler) {
                this.closeHandler();
            }
        });
    }

    async bind(): Promise<void> {
        await this.socket.bind();
    }

    close(): void {
        this.socket.close();
    }

    send(ip: string, port: number, data: Buffer): void {
        this.socket.send(ip, port, data);
    }

    broadcast(data: Buffer, port: number, addresses: string[]): void {
        for (const addr of addresses) {
            this.socket.send(addr, port, data);
        }
    }

    onMessage(handler: (data: Buffer, rinfo: RemoteInfo) => void): void {
        this.messageHandler = handler;
    }

    onError(handler: (err: Error) => void): void {
        this.errorHandler = handler;
    }

    onClose(handler: () => void): void {
        this.closeHandler = handler;
    }
}

/**
 * Get broadcast addresses for all network interfaces
 */
export { getBroadcastAddresses } from '@bobfrankston/rmfudp';
