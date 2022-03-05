import { WebPlugin } from '@capacitor/core';

import type { MapboxsdkPlugin } from './definitions';

export class MapboxsdkWeb extends WebPlugin implements MapboxsdkPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
