/* eslint-disable @typescript-eslint/naming-convention */
import { registerPlugin } from '@capacitor/core';

import type { MapboxsdkPlugin } from './definitions';

const Mapboxsdk = registerPlugin<MapboxsdkPlugin>('Mapboxsdk', {
  web: () => import('./web').then(m => new m.MapboxsdkWeb()),
});

export * from './definitions';
export { Mapboxsdk };
