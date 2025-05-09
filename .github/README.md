<div align="center">

![Steam Badges DB](https://github.com/nolddor/steam-badges-db/raw/main/resources/banner.png "Steam Badges DB logo")

</div>

---

<div align="center">

![Repobeats analytics](https://repobeats.axiom.co/api/embed/172037d379e6f08cdcefa56905abf10a8ab8b5f2.svg "Repobeats analytics image")

</div>

---
### Description

_Steam Badges DB_ repository offers up-to-date information about all existing Steam apps having [trading cards](https://steamcommunity.com/tradingcards) as a single JSON file. It's intended to be used by Steam level up bots and similar services, as a single source of truth.

File **[badges.json](https://github.com/nolddor/steam-badges-db/raw/main/data/badges.json)** (_[compressed](https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json)_) is updated hourly and it includes appid, name and badge size.
```
{
    "220": {
        "name": "Half-Life 2",
        "size": 8
    },
    "300": {
        "name": "Day of Defeat: Source",
        "size": 6
    },

    ... more content ...
}
```
Alternatively, you might consider using **[badges.slim.json](https://github.com/nolddor/steam-badges-db/raw/main/data/badges.slim.json)** file as your source data on those workloads in which you do not require the `name` attribute to operate.

---
### Usage

_Steam Badges DB_ data is widely available and can be retrieved on a great variety of ways, from your terminal to your custom crafted scripts. See examples about most common use cases below:
<div align="center">

[CLI](https://github.com/nolddor/steam-badges-db/wiki#cli) | [Node.js](https://github.com/nolddor/steam-badges-db/wiki#nodejs) | [Java](https://github.com/nolddor/steam-badges-db/wiki#java) | [C#](https://github.com/nolddor/steam-badges-db/wiki#c) | [Python](https://github.com/nolddor/steam-badges-db/wiki#python) | [Ruby](https://github.com/nolddor/steam-badges-db/wiki#ruby)

</div>

---
Made with :heart: by [Jack Nolddor](https://steamcommunity.com/id/nolddor)
