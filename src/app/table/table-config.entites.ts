export interface ConfigColum {
  name: string;
  key: string;
}


export interface TableConfig {
  defaultSize: number;
  columsConfig: ConfigColum[];
}
