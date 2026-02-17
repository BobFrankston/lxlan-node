import { LxClient } from '@bobfrankston/lxlan';
import { NodeUdpTransport } from './lntransport.js';
import { EventEmitter } from 'node:events';
/**
 * Node.js EventEmitter wrapper to match LxEventEmitter interface
 */
class NodeEventEmitter extends EventEmitter {
    off(event, listener) {
        return this.removeListener(event, listener);
    }
}
/**
 * Create a Node.js LIFX LAN client
 * @param options - Client options
 * @returns LxClient configured with UDP transport and Node.js EventEmitter
 */
export function createClient(options = {}) {
    const transport = new NodeUdpTransport();
    const eventEmitter = new NodeEventEmitter();
    // Suppress logging by default — only log if debug=true or custom logger provided
    const logger = options.logger ?? (options.debug ? (msg) => console.log(msg) : () => { });
    const coreOptions = {
        transport,
        eventEmitter,
        discoveryInterval: options.discoveryInterval,
        logger
    };
    return new LxClient(coreOptions);
}
// Re-export core types
export { LxClient, LxDevice, MessageType, LIFX_PORT } from '@bobfrankston/lxlan';
export { NodeUdpTransport, getBroadcastAddresses } from './lntransport.js';
//# sourceMappingURL=index.js.map