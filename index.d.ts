import { LxClient } from '@bobfrankston/lxlan';
/**
 * Node.js-specific options for LIFX LAN client
 */
export interface LxClientOptions {
    /** UDP port to bind (default 56700, use 0 for ephemeral to support multiple instances) */
    port?: number;
    /** Broadcast addresses for discovery (auto-detected from network interfaces if not specified) */
    broadcastAddresses?: string[];
    /** Auto-discovery interval in ms (0 = manual only, default 0) */
    discoveryInterval?: number;
}
/**
 * Create a Node.js LIFX LAN client
 * @param options - Client options
 * @returns LxClient configured with UDP transport
 */
export declare function createClient(options?: LxClientOptions): LxClient;
export { LxClient, LxDevice, LxMessage, MessageType, LIFX_PORT } from '@bobfrankston/lxlan';
export { NodeUdpTransport, getBroadcastAddresses } from './transport.js';
//# sourceMappingURL=index.d.ts.map