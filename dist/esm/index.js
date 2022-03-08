/* eslint-disable @typescript-eslint/naming-convention */
import { registerPlugin } from '@capacitor/core';
const Mapboxsdk = registerPlugin('Mapboxsdk', {
    web: () => import('./web').then(m => new m.MapboxsdkWeb()),
});
export * from './definitions';
export { Mapboxsdk };
//# sourceMappingURL=index.js.map