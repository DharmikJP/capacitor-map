export interface MapboxsdkPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
    /** Creates map view and displays it */
    create(options: {
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
      /** Destroy the mapView, use in ionViewDidLeave and similar */
  close(): Promise<any>;
}
