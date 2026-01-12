import { LxClient } from '@bobfrankston/lxlan';
import { NodeUdpTransport, getBroadcastAddresses } from './transport.js';
/**
 * Create a Node.js LIFX LAN client
 * @param options - Client options
 * @returns LxClient configured with UDP transport
 */
export function createClient(options = {}) {
    const port = options.port ?? 56700;
    const broadcastAddresses = options.broadcastAddresses ?? getBroadcastAddresses();
    const transport = new NodeUdpTransport(port, true);
    const coreOptions = {
        transport,
        broadcastAddresses,
        port,
        discoveryInterval: options.discoveryInterval
    };
    return new LxClient(coreOptions);
}
// Re-export core types
export { LxClient, LxDevice, MessageType, LIFX_PORT } from '@bobfrankston/lxlan';
export { NodeUdpTransport, getBroadcastAddresses } from './transport.js';
//# sourceMappingURL=index.js.map