import { LxTransport, RemoteInfo } from '@bobfrankston/lxlan';
/**
 * Node.js UDP transport for LIFX LAN
 */
export declare class NodeUdpTransport implements LxTransport {
    private socket;
    private messageHandler?;
    private errorHandler?;
    private closeHandler?;
    constructor(port?: number, reuseAddr?: boolean);
    bind(): Promise<void>;
    close(): void;
    send(ip: string, port: number, data: Buffer): void;
    broadcast(data: Buffer, port: number, addresses: string[]): void;
    onMessage(handler: (data: Buffer, rinfo: RemoteInfo) => void): void;
    onError(handler: (err: Error) => void): void;
    onClose(handler: () => void): void;
}
/**
 * Get broadcast addresses for all network interfaces
 */
export { getBroadcastAddresses } from '@bobfrankston/rmfudp';
//# sourceMappingURL=transport.d.ts.map