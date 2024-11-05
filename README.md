# APO-OS

APO'S

## Tests disabled for Webkit (Safari)

Having issues adding cookies on the browser. Couldn't solve the issue so the tests for it were disabled.

<!-- ## Change made to /lib.dom.d.ts

Not recommended, as it lacks support in some browsers.

### Bluetooth and Battery Interface

Added to line 15607

```ts
//! TEST, not supported in some browsers
interface BatteryManager {
  charging: boolean;
  chargingTime: number | "Infinity";
  dischargingTime: number | "Infinity";
  level: number;
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange: () => void;
  onlevelchange: () => void;
}

interface RequestDeviceOptions {
  filters?: BluetoothLEScanFilter[];
  optionalServices?: BluetoothServiceUUID[];
  acceptAllDevices?: boolean;
}

interface BluetoothLEScanFilter {
  name?: string;
  namePrefix?: string;
  services?: BluetoothServiceUUID[];
}

type BluetoothServiceUUID = string | number;

interface BluetoothDevice extends EventTarget {
  id: string;
  name?: string;
  gatt?: any;
  watchingAdvertisements?: boolean;
  onadvertisementreceived?: EventListener;
  ongattserverdisconnected?: EventListener;
  onserviceadded?: EventListener;
  onserviceremoved?: EventListener;
  onservicechanged?: EventListener;
  watchAdvertisements(): Promise<void>;
  unwatchAdvertisements(): void;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
  dispatchEvent(event: Event): boolean;
}

interface Bluetooth {
  getAvailability(): Promise<boolean>;
  requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
}
//! ^^^^^ TEST, not supported in some browsers ^^^^^
```

### Navigator Interface

Added to line 15702

```ts
interface Navigator extends NavigatorAutomationInformation, NavigatorBadge, NavigatorConcurrentHardware, NavigatorContentUtils, NavigatorCookies, NavigatorID, NavigatorLanguage, NavigatorLocks, NavigatorOnLine, NavigatorPlugins, NavigatorStorage {
...
    //! TEST, not supported in some browsers
    /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery) */
    getBattery(): Promise<BatteryManager>;

    bluetooth: Bluetooth;
    //! ^^^^^ TEST, not supported in some browsers ^^^^^
...
}
``` -->
