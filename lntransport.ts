import { UdpSocket, getBroadcastAddresses } from '@bobfrankston/rmfudp';
import { UdpTransport, RemoteInfo } from '@bobfrankston/udp-transport';

/**
 * Node.js UDP transport for LIFX LAN
 * Implements UdpTransport interface from @bobfrankston/udp-transport
 */
export class NodeUdpTransport implements UdpTransport {
    private socket: UdpSocket;
    private broadcastAddresses: string[];
    private messageHandler?: (data: Uint8Array, rinfo: RemoteInfo) => void;
    private errorHandler?: (err: Error) => void;
    private closeHandler?: () => void;

    constructor(port: number = 56700, reuseAddr: boolean = true) {
        this.broadcastAddresses = getBroadcastAddresses();
        this.socket = new UdpSocket({
            port,
            reuseAddr
        });

        this.socket.on('message', (msg: Buffer | Uint8Array, rinfo: { address: string; port: number }) => {
            if (this.messageHandler) {
                this.messageHandler(msg, {
                    address: rinfo.address,
                    port: rinfo.port
                });
            }
        });

        this.socket.on('error', (err: Error) => {
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

    send(ip: string, port: number, data: Uint8Array): void {
        try {
            const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
            this.socket.send(ip, port, buf);
        } catch (err) {
            // Emit socket errors (e.g., "Socket not bound") so clients can handle them
            if (this.errorHandler && err instanceof Error) {
                this.errorHandler(err);
            }
        }
    }

    broadcast(data: Uint8Array, port: number): void {
        try {
            const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
            for (const addr of this.broadcastAddresses) {
                this.socket.send(addr, port, buf);
            }
        } catch (err) {
            // Emit socket errors (e.g., "Socket not bound") so clients can handle them
            if (this.errorHandler && err instanceof Error) {
                this.errorHandler(err);
            }
        }
    }

    onMessage(handler: (data: Uint8Array, rinfo: RemoteInfo) => void): void {
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
