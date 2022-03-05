export interface MapboxsdkPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
