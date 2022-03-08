import { WebPlugin } from '@capacitor/core';
import type { MapboxsdkPlugin } from './definitions';
export declare class MapboxsdkWeb extends WebPlugin implements MapboxsdkPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    create(_options: {
        accessToken: string;
        width: number;
        height: number;
        x: number;
        y: number;
        latitude?: number;
        longitude?: number;
        zoom?: number;
        liteMode?: boolean;
    }): Promise<any>;
    close(): Promise<any>;
}
