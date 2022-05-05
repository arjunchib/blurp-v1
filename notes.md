# Notes

## Realms & Boundaries

Our code -> JS realm -> Discord realm

The boundary between JS realm and the Discord realm is dictated by the Discord API[https://discord.com/developers/docs/intro]. This is conglomeration of REST APIs, Webhook callbacks, and websocket gateways. This is very robust, adaptive, and performant for interacting with Discord, but is not conducive for the logical structure of a bot application.

This project attempts to be a prototype for bridging the boundary between application code and code needed to interface with discord.

## Goals

- straightforward mapping to Discord APIs to remain adaptive & expressible
- simple to write application logic
- easy to maintain dev, staging, and prod envs
- strong type definitions for user accessibility
- deployable on all V8 environments

## Discord API Structure

### Resources

- Application Commands: commands users can call
- Interactions: users interactions with Discord
- Interaction Response/Callback: bot reactions with Discord
- Message Components: bot UI with Discord

### Tight Coupling

The content of all resources should be tightly coupled. Users will want to use the full set of newly added features. This allows users to be expressive and creative.

### Loose Coupling

Managing application flow should be limited. Users don't want to think about how the commands are added/edited or how interactions are managed.

### Conclusion

All types/classes should feel familiar to users accustomed to Discord APIs, but should be independent. The options for the APIs should look almost identical to the content of Discord APIs.
