## Config overview

> Learn about getting, settings and persisting template data, application settings, config values and options.

## Overview

Depending on the use case, you may need one or more of the following:

| **API** | **Object** | **Description** | 
| --- | --- | --- |
| [Settings] | `app.cache` | General application settings |
| [Options] | `app.options` | Options or defaults that may be modified by the end-user. |
| [Data] | `app.cache.data` | Data to be passed as context to templates. |
| [Config] | `app.config.data` | Allow users to persist config values or options to disk |

[Options]: ./options.md
[Config]: ./config.md
[Settings]: ./settings.md
[Data]: ./data.md


## Config recommendations

- **Settings API**: Use `.get()` and `.set()` sparingly, for general application settings that will probably never be overridden by the user.
- **Options API**: Use `.option()` for options that you expect the user to update.
- **Data API**: Use `.data()` to load or set data to be passed as context to templates.
- **Config API**: Use `.config.set()` to allow the user to persist config values values to disk,  and `.config.get()` to retrieve those values whenever needed.
