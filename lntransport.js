import { UdpSocket, getBroadcastAddresses } from '@bobfrankston/rmfudp';
/**
 * Node.js UDP transport for LIFX LAN
 * Implements UdpTransport interface from @bobfrankston/udp-transport
 */
export class NodeUdpTransport {
    socket;
    broadcastAddresses;
    messageHandler;
    errorHandler;
    closeHandler;
    constructor(port = 56700, reuseAddr = true) {
        this.broadcastAddresses = getBroadcastAddresses();
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
    async bind() {
        await this.socket.bind();
    }
    close() {
        this.socket.close();
    }
    send(ip, port, data) {
        try {
            const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
            this.socket.send(ip, port, buf);
        }
        catch (err) {
            // Emit socket errors (e.g., "Socket not bound") so clients can handle them
            if (this.errorHandler && err instanceof Error) {
                this.errorHandler(err);
            }
        }
    }
    broadcast(data, port) {
        try {
            const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
            for (const addr of this.broadcastAddresses) {
                this.socket.send(addr, port, buf);
            }
        }
        catch (err) {
            // Emit socket errors (e.g., "Socket not bound") so clients can handle them
            if (this.errorHandler && err instanceof Error) {
                this.errorHandler(err);
            }
        }
    }
    onMessage(handler) {
        this.messageHandler = handler;
    }
    onError(handler) {
        this.errorHandler = handler;
    }
    onClose(handler) {
        this.closeHandler = handler;
    }
}
/**
 * Get broadcast addresses for all network interfaces
 */
export { getBroadcastAddresses } from '@bobfrankston/rmfudp';
//# sourceMappingURL=lntransport.js.map