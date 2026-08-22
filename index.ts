/**
 * lxlan-node — Node.js wrapper for LIFX LAN protocol.
 * Thin wrapper: delegates transport to @bobfrankston/node-transport.
 */

import { LxClient, LxClientOptions as CoreOptions } from '@bobfrankston/lxlan';
import { NodeUdpTransport, NodeEventEmitter, getBroadcastAddresses } from '@bobfrankston/node-transport';

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
 * @returns LxClient configured with NodeUdpTransport
 */
export function createClient(options: LxClientOptions = {}): LxClient {
    // Suppress logging by default — only log if debug=true or custom logger provided
    const logger = options.logger ?? (options.debug ? (msg: string) => console.log(msg) : () => {});

    return new LxClient({
        Transport: NodeUdpTransport,
        discoveryInterval: options.discoveryInterval,
        logger,
    });
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

// Re-export transport classes for backwards compatibility
export { NodeUdpTransport, NodeEventEmitter, getBroadcastAddresses } from '@bobfrankston/node-transport';
