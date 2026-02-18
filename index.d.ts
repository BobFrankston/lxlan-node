import { LxClient } from '@bobfrankston/lxlan';
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
export declare function createClient(options?: LxClientOptions): LxClient;
export { LxClient, LxDevice, LxMessage, MessageType, LIFX_PORT, HEADER_SIZE, WifiSecurity } from '@bobfrankston/lxlan';
export { encodeMessage, decodeMessage, encodeSetWifiConfiguration, encodeGetWifiConfiguration, decodeStateWifiConfiguration, encodeSetLabel, encodeSetColor, encodeSetPower, encodeSetGroup, encodeSetLocation, encodeSetWaveformOptional, encodeGetService, decodeState, decodeStatePower, decodeStateLabel, decodeStateVersion, decodeStateGroup, decodeStateService, decodeStateHostInfo, decodeStateHostFirmware, decodeStateWifiInfo, decodeStateInfo, FrameFlags, ProtocolBits, nextSequence, getSource, } from '@bobfrankston/lxlan';
export { NodeUdpTransport, getBroadcastAddresses } from './lntransport.js';
//# sourceMappingURL=index.d.ts.map