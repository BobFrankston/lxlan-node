import { LxClient, LxClientOptions as CoreOptions } from '@bobfrankston/lxlan';
import { NodeUdpTransport, getBroadcastAddresses } from './lntransport.js';
import { EventEmitter } from 'node:events';

/**
 * Node.js EventEmitter wrapper to match LxEventEmitter interface
 */
class NodeEventEmitter extends EventEmitter {
    off(event: string, listener: (...args: any[]) => void): this {
        return this.removeListener(event, listener);
    }
}

/**
 * Node.js-specific options for LIFX LAN client
 */
export interface LxClientOptions {
    /** Auto-discovery interval in ms (0 = manual only, default 0) */
    discoveryInterval?: number;
    /** Enable debug logging (default: false) */
    debug?: boolean;
    /** Custom logger function (overrides debug flag) */
    logger?: (msg: string, colors?: string) => void;
}

/**
 * Create a Node.js LIFX LAN client
 * @param options - Client options
 * @returns LxClient configured with UDP transport and Node.js EventEmitter
 */
export function createClient(options: LxClientOptions = {}): LxClient {
    const transport = new NodeUdpTransport();
    const eventEmitter = new NodeEventEmitter();
    
    // Suppress logging by default — only log if debug=true or custom logger provided
    const logger = options.logger ?? (options.debug ? (msg: string) => console.log(msg) : () => {});

    const coreOptions: CoreOptions = {
        transport,
        eventEmitter,
        discoveryInterval: options.discoveryInterval,
        logger
    };
    
    return new LxClient(coreOptions);
}

// Re-export core types and constants
export { LxClient, LxDevice, LxMessage, MessageType, LIFX_PORT, HEADER_SIZE, WifiSecurity } from '@bobfrankston/lxlan';

// Re-export protocol encode/decode functions
export {
    encodeMessage, decodeMessage,
    encodeSetWifiConfiguration, encodeGetWifiConfiguration, decodeStateWifiConfiguration,
    encodeSetLabel, encodeSetColor, encodeSetPower, encodeSetGroup, encodeSetLocation,
    encodeSetWaveformOptional, encodeGetService,
    decodeState, decodeStatePower, decodeStateLabel, decodeStateVersion,
    decodeStateGroup, decodeStateService, decodeStateHostInfo, decodeStateHostFirmware,
    decodeStateWifiInfo, decodeStateInfo,
    FrameFlags, ProtocolBits, nextSequence, getSource,
} from '@bobfrankston/lxlan';

export { NodeUdpTransport, getBroadcastAddresses } from './lntransport.js';
