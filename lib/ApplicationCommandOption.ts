export interface ApplicationCommandOption {
  type: number;
  name: string;
  name_localizations?: any;
  description: string;
  description_localizations?: any;
  required?: boolean;
  choices?: any;
  options?: any;
  channel_types?: any;
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}
