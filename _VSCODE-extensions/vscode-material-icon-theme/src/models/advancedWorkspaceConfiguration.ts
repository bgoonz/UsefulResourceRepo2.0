export interface AdvancedWorkspaceConfiguration {
  get<T>(section: string, defaultValue?: T): T;
  has(section: string): boolean;
  [key: string]: any;
  inspect<T>(
    section: string
  ):
    | { defaultValue: T; globalValue: T; key: string; workspaceValue: T }
    | undefined;
  update(section: string, value: any, global?: boolean): Thenable<void>;
}
