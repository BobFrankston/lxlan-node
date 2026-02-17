import { UdpTransport, RemoteInfo } from '@bobfrankston/udp-transport';
/**
 * Node.js UDP transport for LIFX LAN
 * Implements UdpTransport interface from @bobfrankston/udp-transport
 */
export declare class NodeUdpTransport implements UdpTransport {
    private socket;
    private broadcastAddresses;
    private messageHandler?;
    private errorHandler?;
    private closeHandler?;
    constructor(port?: number, reuseAddr?: boolean);
    bind(): Promise<void>;
    close(): void;
    send(ip: string, port: number, data: Uint8Array): void;
    broadcast(data: Uint8Array, port: number): void;
    onMessage(handler: (data: Uint8Array, rinfo: RemoteInfo) => void): void;
    onError(handler: (err: Error) => void): void;
    onClose(handler: () => void): void;
}
/**
 * Get broadcast addresses for all network interfaces
 */
export { getBroadcastAddresses } from '@bobfrankston/rmfudp';
//# sourceMappingURL=lntransport.d.ts.map