export interface ConfigColum {
  name: string;
  key: string;
}


export interface TableConfig {
  defaultSize: number;
  showSize: boolean;
  lengthDescription?: number;
  columsConfig: ConfigColum[];
}
