# lxlan-node

Node.js transport wrapper for LIFX LAN protocol (lxlan).

This package provides UDP transport for the browser-compatible `@bobfrankston/lxlan` core library.

## Installation

```bash
npm install @bobfrankston/lxlan-node
```

## Usage

```typescript
import { createClient } from '@bobfrankston/lxlan-node';

// Create client with automatic discovery
const client = createClient({
    discoveryInterval: 30000,  // Discover every 30 seconds
    port: 0  // Ephemeral port for multi-instance support
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

## Build

To work around TypeScript compilation issues with dependency type definitions:

```bash
# Use the compiled JavaScript (already built)
npm install
```

The package includes pre-compiled JavaScript and type definitions.

## Architecture

- **lxlan** - Core protocol library (browser-compatible)
- **lxlan-node** - Node.js UDP transport (this package)
- Future: **lxlan-web** - Browser HTTP/WebSocket transport
