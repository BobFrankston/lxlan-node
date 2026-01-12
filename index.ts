import { LxClient, LxClientOptions as CoreOptions } from '@bobfrankston/lxlan';
import { NodeUdpTransport, getBroadcastAddresses } from './transport.js';

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
export function createClient(options: LxClientOptions = {}): LxClient {
    const port = options.port ?? 56700;
    const broadcastAddresses = options.broadcastAddresses ?? getBroadcastAddresses();
    
    const transport = new NodeUdpTransport(port, true);
    
    const coreOptions: CoreOptions = {
        transport,
        broadcastAddresses,
        port,
        discoveryInterval: options.discoveryInterval
    };
    
    return new LxClient(coreOptions);
}

// Re-export core types
export { LxClient, LxDevice, LxMessage, MessageType, LIFX_PORT } from '@bobfrankston/lxlan';
export { NodeUdpTransport, getBroadcastAddresses } from './transport.js';
