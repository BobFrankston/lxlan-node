/**
 * lxlan-node — Node.js wrapper for LIFX LAN protocol.
 * Thin wrapper: delegates transport to @bobfrankston/node-transport.
 */
import { LxClient } from '@bobfrankston/lxlan';
import { NodeUdpTransport } from '@bobfrankston/node-transport';
/**
 * Create a Node.js LIFX LAN client
 * @param options - Client options
 * @returns LxClient configured with NodeUdpTransport
 */
export function createClient(options = {}) {
    // Suppress logging by default — only log if debug=true or custom logger provided
    const logger = options.logger ?? (options.debug ? (msg) => console.log(msg) : () => { });
    return new LxClient({
        Transport: NodeUdpTransport,
        discoveryInterval: options.discoveryInterval,
        logger,
    });
}
// Re-export core types and constants
export { LxClient, LxDevice, MessageType, LIFX_PORT, HEADER_SIZE, WifiSecurity } from '@bobfrankston/lxlan';
// Re-export protocol encode/decode functions
export { encodeMessage, decodeMessage, encodeSetWifiConfiguration, encodeGetWifiConfiguration, decodeStateWifiConfiguration, encodeSetLabel, encodeSetColor, encodeSetPower, encodeSetGroup, encodeSetLocation, encodeSetWaveformOptional, encodeGetService, decodeState, decodeStatePower, decodeStateLabel, decodeStateVersion, decodeStateGroup, decodeStateService, decodeStateHostInfo, decodeStateHostFirmware, decodeStateWifiInfo, decodeStateInfo, FrameFlags, ProtocolBits, nextSequence, getSource, } from '@bobfrankston/lxlan';
// Re-export transport classes for backwards compatibility
export { NodeUdpTransport, NodeEventEmitter, getBroadcastAddresses } from '@bobfrankston/node-transport';
//# sourceMappingURL=index.js.map