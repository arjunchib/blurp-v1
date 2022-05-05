import { InteractionType } from "./InteractionType.ts";
import { InteractionData } from "./InteractionData.ts";

interface BaseInteraction<T, K extends InteractionType> {
  /**
   * id of the interaction
   */
  id: string;

  /**
   * id of the application this interaction is for
   */
  application_id: string;

  /**
   * the type of interaction
   */
  type: InteractionType;

  /**
   * the command data payload
   */
  data?: InteractionData<T, K>;

  /**
   * the guild it was sent from
   */
  guild_id?: string;

  /**
   * the channel it was sent from
   */
  channel_id?: string;

  /**
   * object	guild member data for the invoking user, including permissions
   *
   * Note: `member` is sent when the interaction is invoked in a guild, and `user` is sent when invoked in a DM
   */
  member?: object;

  /**
   * user object for the invoking user, if invoked in a DM
   *
   * Note: `member` is sent when the interaction is invoked in a guild, and `user` is sent when invoked in a DM
   */
  user?: object;

  /**
   * a continuation token for responding to the interaction
   */
  token: string;

  /**
   * read-only property, always 1
   */
  version: number;

  /**
   * for components, the message they were attached to
   */
  message?: object;

  /**
   * the selected language of the invoking user
   */
  locale?: string;

  /**
   * the guild's preferred locale, if invoked in a guild
   */
  guild_locale?: string;
}

type NonPingTypes = "data" | "locale";

export type Interaction<
  T,
  K extends InteractionType
> = K extends InteractionType.PING
  ? Omit<BaseInteraction<T, K>, NonPingTypes>
  : BaseInteraction<T, K>;
