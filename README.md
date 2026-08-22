# @bobfrankston/lxlan-node

Node.js transport adapter for LIFX LAN protocol. Thin wrapper connecting `@bobfrankston/lxlan` with `@bobfrankston/node-transport`.

## Purpose

This package bridges two components:
- **[@bobfrankston/lxlan](../lxlan)** - Core LIFX protocol library (transport-agnostic)
- **[@bobfrankston/node-transport](../../../../utils/udp/node-transport)** - Shared Node.js UDP transport

It knows:
- ✅ LIFX default port (56700) and initialization patterns
- ✅ How to wire node-transport into lxlan

It does **NOT** know:
- ❌ LIFX protocol details (delegated to lxlan)
- ❌ UDP implementation details (delegated to node-transport/rmfudp)

## Architecture

```
Your Node.js App
      ↓
  lxlan-node (this package) - thin wrapper
      ↓                 ↓
   lxlan          node-transport
 (protocol)      (shared transport)
      ↓                 ↓
   LIFX              rmfudp
  devices          (UDP socket)
```

## Installation

```bash
npm install @bobfrankston/lxlan-node
```

## Usage

```typescript
import { createClient } from '@bobfrankston/lxlan-node';

// Create client with automatic discovery
const client = createClient({
    discoveryInterval: 30000  // Discover every 30 seconds
});

// Start listening
await client.start();

// Listen for devices
client.on('device', (device) => {
    console.log('Found device:', device.label, device.mac);
    device.getDeviceInfo();  // Query full device info
});

// Control devices
client.on('deviceInfo', (device) => {
    device.setPower(true);
    device.setColor({ h: 180, s: 100, b: 50 });
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `discoveryInterval` | `number` | `0` | Auto-discovery interval in ms (0 = manual only) |
| `debug` | `boolean` | `false` | Enable `[LxClient]` debug logging to console |
| `logger` | `(msg, colors?) => void` | no-op | Custom logger function (overrides `debug`) |

By default the client is **silent** — no console output. To see protocol-level debug messages:

```typescript
// Use built-in console logging
const client = createClient({ debug: true });

// Or provide a custom logger
const client = createClient({ logger: (msg) => myLogger.debug(msg) });
```

## Build

To work around TypeScript compilation issues with dependency type definitions:

```bash
# Use the compiled JavaScript (already built)
npm install
```

The package includes pre-compiled JavaScript and type definitions.

