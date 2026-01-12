import { UdpSocket } from '@bobfrankston/rmfudp';
/**
 * Node.js UDP transport for LIFX LAN
 */
export class NodeUdpTransport {
    socket;
    messageHandler;
    errorHandler;
    closeHandler;
    constructor(port = 56700, reuseAddr = true) {
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
        this.socket.send(ip, port, data);
    }
    broadcast(data, port, addresses) {
        for (const addr of addresses) {
            this.socket.send(addr, port, data);
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
//# sourceMappingURL=transport.js.map