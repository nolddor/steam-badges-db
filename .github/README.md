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

#### CLI
```
curl -L https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json
```

#### Node.js
```
const axios = require('axios');

axios.get('https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json')
    .then(function (response) {
        const badgesdb = response.data;
        // Your code goes here
    });
```

#### Java
```
import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json";
	HttpResponse<JsonNode> response = Unirest.get(url).asJson();
	JsonNode badgesdb = response.getBody();
	// Your code goes here
    }
}
```

#### C#
```
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Collections.Generic;
					
public class Program
{
	public class SteamBadge
	{
	        public int size { get; set; }
		public string name { get; set; }
	}
	
	public static async Task Main()
	{
		Uri endpoint = new Uri("https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json");
		HttpClient client = new();		
		string jsonAsString = await client.GetStringAsync(endpoint);
		Dictionary<string, SteamBadge> badgesdb = JsonSerializer.Deserialize<Dictionary<string, SteamBadge>>(jsonAsString);
		// Your code goes here
	}
}
```

#### Python
```
import requests

response = requests.get("https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json")
badgesdb = response.json()
// Your code goes here
```

#### Ruby
```
require 'httparty'

url = 'https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json'
response = HTTParty.get(url, format: :json)
badgesdb = response.parsed_response
// Your code goes here
```

---
Made with :heart: by [Jack Nolddor](https://steamcommunity.com/id/nolddor)
