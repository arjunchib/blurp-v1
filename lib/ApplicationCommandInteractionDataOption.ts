export interface ApplicationCommandInteractionDataOption<T> {
  /**
   * the name of the parameter
   */
  name: string;

  /**
   * value of application command option type
   */
  type: number;

  /**
   * the value of the option resulting from user input
   */
  value?: string | number;

  /**
   * present if this option is a group or subcommand
   */
  options?: this[];

  /**
   * true if this option is the currently focused option for autocomplete
   */
  focused?: boolean;
}
