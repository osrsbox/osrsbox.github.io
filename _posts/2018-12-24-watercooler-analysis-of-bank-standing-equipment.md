---
layout: post
title: "OSRSBox | Blog | Watercooler: PlayerScraper - A RuneLite Plugin to Dump Player Equipment"
name: "Watercooler: PlayerScraper - A RuneLite Plugin to Dump Player Equipment"
desc: "Development Discussion of an Unusual RuneLite Plugin that Scrapes Player Equipment"
tags:
- Plugin
- RuneLite
- Tool
- WaterCooler
add_to_popular_list: true
thumbnail: watercooler.png
---

This post discusses the development process of a strange RuneLite plugin I authored to _scrape_ players! Say what?! Simply put, the plugin scans a specific player and lists the equipment that they are currently wearing. It is obvious why you would want to determine the equipment of one player... think the inspect functionality in World of Warcraft. But the strange thing about this plugin is that it is togglable to scan multiple players within client render distance. So why multiple players? Simple - I wanted to perform a statistical analysis of the equipment that the players wore. 

This post covers the technical side of the RuneLite plugin development. If you are interested in the statistical analysis, check out my post entitled [Data is Beautiful: Analysis of Bank Standing Equipment]({% post_url 2018-12-24-data-is-beautiful-bank-standing-equipment %}), which performs an analysis of the data _scraped_ from 20,000 players bank standing at the Grand Exchange.

As per the norm of my projects, here is the list of requirements for what the plugin needed to do:

- Extract metadata about a players equipment
- Togglable to extract metadata about multiple players equipment (reason - save time)
- Export item metadata to JSON format for analysis

As with all my projects, the source code used in this research is openly available on the [OSRSBox GitHub account](https://github.com/osrsbox), specifically, [my branch of RuneLite named osrsbox-plugins](https://github.com/osrsbox/runelite/tree/osrsbox-plugins/runelite-client/src/main/java/net/runelite/client/plugins/playerscraper) has the code for the player scraper RuneLite plugin. I hope you enjoy this post and the coding journey!

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Developing a RuneLite Plugin to Extract Player Equipment

As with any RuneLite plugin, I started by picking a name: _Player Scraper_... it seemed suitable. Then I made a _package_ in the RuneLite `plugins` folder named: `playerscraper`. The next step was making two files to host the code for the plugin development:

- `PlayerScraperConfig.java`
- `PlayerScraperPlugin.java`

You can view all the code and the structure I used by looking at my `orsrsbox-plugins` branch of my forked version of the official RuneLite repository on GitHub. The base folder for the [playerscraper plugin](https://github.com/osrsbox/runelite/tree/osrsbox-plugins/runelite-client/src/main/java/net/runelite/client/plugins/playerscraper) has the two files used to create the plugin.

### Adding JSON Output Support

The goal of the Player Scraper plugin was to dump metadata about a target players equipment and then analyze the resultant data. I did not need it displayed in-game (for example, on a panel), so I decided to dump the data in JSON format. I have previously written about adding JSON export support to RuneLite, so I will keep this simple. I used a JSON library (supported by Maven) called [JSON.simple](https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple). Then I simply added the dependency to the `pom.xml` file for the `runelite-client`. To be specific, this involved editing the following file:

{% highlight plaintext %}
runelite\runelite-client\pom.xml
{% endhighlight %}

In this file, I added the XML dependency object into the `dependencies` XML tag. The code listed below documents my additions.

{% highlight xml %}
<dependency>
    <groupId>com.googlecode.json-simple</groupId>
    <artifactId>json-simple</artifactId>
    <version>1.1.1</version>
</dependency>
{% endhighlight %}

Make sure to check out [my modified `pom.xml` file](https://github.com/osrsbox/runelite/blob/osrsbox-plugins/runelite-client/pom.xml) in my forked RuneLite repository (under the `osrsbox-plugins` branch). This file has the additions that I have made to support JSON generation.

### Player Scraper Config Menu

I wanted a simple plugin without too many options - primarily because there were not many options that were actually required. If you want more information on the RuneLite plugin configuration menu and how to code one, check out my previous blog post - [Writing RuneLite Plugins - Part 3 - Creating a RuneLite Plugin Config Menu]({% post_url 2018-08-18-writing-runelite-plugins-part-3-config %}). I added the following base skeleton to my `PlayerScraperConfig.java` file - this is the place to put all RuneLite plugin configuration menu code.

{% highlight java %}
package net.runelite.client.plugins.playerscraper;

import net.runelite.client.config.Config;
import net.runelite.client.config.ConfigGroup;
import net.runelite.client.config.ConfigItem;

@ConfigGroup("playerscraper")
public interface PlayerScraperConfig extends Config
{
    // ConfigItem's go here!
}
{% endhighlight %}

From here, I added a couple of `ConfigItem` entries. The first is a boolean value that toggles between single player equipment _scraping_ and multiple player equipment _scraping_ (this premise is discussed in detail later). The second configuration menu option is another boolean value that is used to toggle between having the _Scrape_ action available when right-clicking a player. This context menu entry is used to initiate (start) the plugin - to start processing player/s and extracting the equipment they are wearing. The following two `ConfigItem` entries add two menu entries:

{% highlight java %}
@ConfigItem(
        position = 1,
        keyName = "allPlayers",
        name = "Scrape all",
        description = "Scrape all players"
)
default boolean allPlayers() { return false; }

@ConfigItem(
        position = 2,
        keyName = "menuOption",
        name = "Menu option",
        description = "Show Inspect option in menus"
)
default boolean menuOption() { return true; }
{% endhighlight %}

As you can see in the code above, the `allPlayers` option is set to `false` by default - so the plugin would only scan a single player. However, the `menuOption` option is set to `true` by default so that the context menu entry is added when the plugin starts. [Check out the `PlayerScraperConfig.java`](https://github.com/osrsbox/runelite/blob/osrsbox-plugins/runelite-client/src/main/java/net/runelite/client/plugins/playerscraper/PlayerScraperConfig.java) if you want to see the entire configuration file and syntax.

### Player Scraper Plugin

After setting up the plugin configuration menu, the next step was to actually write the code for the `PlayerScraperPlugin.java` file. This is the heart of the plugin and the majority of the code for a simple plugin lives in this file (note that you can have other files for your plugin if you implement additional classes). If I have learned anything about RuneLite plugin development, have a look to see what others have done and base your plugin on that code. Why? A couple of reasons make this thoroughly evident:

- Someone has most likely written code that does something similar to what you already want (unless you are designing a very radical plugin)
- That code has been vetted by members of the RuneLite development team before being added to the actual client (Push Request FTW!)
- That code has been reviewed/tested by the RuneLite developers, and if implemented in the client it has been tested tens of thousands of users.

#### Adding a Menu Entry when Right-Clicking a Player

The first thing I wanted to do was add a new menu entry so that when you right-click a player, there was an option to _Scrape_ a player. I was pretty sure that were existing RuneLite plugins that have an added context menu entry. After firing up the RuneLite client and right-clicking the closest player, the context menu had a **Lookup** option available. This is for the hiscores plugin provided by the client. Having a look at the source code, [`HiscorePlugin.java`](https://github.com/runelite/runelite/blob/master/runelite-client/src/main/java/net/runelite/client/plugins/hiscore/HiscorePlugin.java) revealed the method they used to add a menu entry. This was a good place to start...

I won't go into huge amounts of details with this section. There is already existing code examples that provide a good guide to adding an entry to the right-click menu. As I mentioned, I used the [`HiscorePlugin.java`](https://github.com/runelite/runelite/blob/master/runelite-client/src/main/java/net/runelite/client/plugins/hiscore/HiscorePlugin.java) as a basis. Specifically, the following functions I coped and modified:

1. `onConfigChanged`
1. `onMenuEntryAdded`
1. `onPlayerMenuOptionClicked`
1. `insertMenuEntry`

Looking back, I didn't even really need a right-click menu option, as the entire purpose of my plugin was to scan all players within render distance and dump the equipment information... but it was a nice feature to add and was a good coding experience.

#### Finding Players

After looking around the RuneLite GitHub repository a little more, I found an open Pull request entitled [Add Equipment Inspector plugin](https://github.com/runelite/runelite/pull/3733) authored by Sean Duffy. This was a good find. Sean had implemented a very similar plugin. The plugin had the functionality I was after, adding a right-click context menu entry for looking up a player, and it had the code to fetch the equipment of one specific player. The way he wrote the plugin was to dump the player equipment on a RuneLite panel. But this code could be easily adapted to save the equipment information to a JSON file.

The next thing to do was determine how the player selection worked. After a browse of the [RuneLite API](https://static.runelite.net/api/runelite-api/overview-summary.html), I discovered a function available called `getPlayers` that gets a list of all valid players from the player cache. This was the same code used in the Equipment Inspector plugin. The [API documentation for getPlayers](https://static.runelite.net/api/runelite-api/net/runelite/api/Client.html#getPlayers--) provides a summary of the method. The function returns a list of players. The code snippet below illustrates the implementation to populate a list called `players` with all the active players.

{% highlight java %}
List<Player> players = client.getPlayers();
{% endhighlight %}

From here, you can simply loop the list of players. The code I ended up with is listed below:

{% highlight java %}
for (Player player : players)
{
    String finalPlayerName = player.getName();
    Optional<Player> targetPlayer = players.stream()
            .filter(Objects::nonNull)
            .filter(p -> p.getName().equals(finalPlayerName)).findFirst();
    if (targetPlayer.isPresent())
    {
        // Get the target player
        Player p = targetPlayer.get();
        processPlayer(p, finalPlayerName);
    }
}
{% endhighlight %}

This was simple to implement, as I already had a working example. If you wanted to target just one player, you would just skip the `for` loop and use the name of the player that was clicked. [Check out the `PlayerScraperPlugin.java`](https://github.com/osrsbox/runelite/blob/osrsbox-plugins/runelite-client/src/main/java/net/runelite/client/plugins/playerscraper/PlayerScraperPlugin.java) file if you want to see the entire plugin file and syntax. The section of code that performs the player targeting is in a method named `playerScraper`. 

#### Extracting Player Metadata

Before extracting player equipment, I decided to try to also include some metadata about each player - mainly to aid in data later data analysis. For example, I wanted the world was the player _scraped_ on, and what the combat level of the player was. This type of information is very easy to get, thanks to the RuneLite API. 

Getting the world was pretty easy, as this information would be the same as the current world my player was logged in on. The RuneLite client has this capability built-in. The [API documentation for the getWorld](https://static.runelite.net/api/runelite-api/net/runelite/api/Client.html#getWorld--) function returns an integer for the current world, as illustrated in the code snippet below:

{% highlight java %}
int currentWorld = client.getWorld();
{% endhighlight %}

Next, getting the player combat level. At the end of the last section, the second to last line of code got the `Player` object for a targeted player, as illustrated by the code below:

{% highlight java %}
Player p = targetPlayer.get();
{% endhighlight %}

The `Player` object has a variety of associated information, including a function to fetch the player level. The [API documentation for the Player](https://static.runelite.net/api/runelite-api/net/runelite/api/Player.html) object provides a summary of the methods available. The `getCombatLevel` function will return an integer of the targeted player. Again, a code snippet is provided below for reference.

{% highlight java %}
int combatLevel = p.getCombatLevel();
{% endhighlight %}

#### Extracting Player Equipment

The only thing left to do was extract the actual equipment a player was wearing. Again, this was easy due to the plethora of functions available in the RuneLite client API. To get the equipment that a target layer is wearing, you need to first get the _template_ of the player using the `getPlayerComposition` method. This must be invoked using the `Player` object, as shown in the code snippet below.

{% highlight java %}
PlayerComposition playerComposition = p.getPlayerComposition();
{% endhighlight %}

From here, you can use the `playerComposition` object to query specific equipment slots. According to the [RuneLite API documentation for PlayerComposition](https://static.runelite.net/api/runelite-api/net/runelite/api/PlayerComposition.html), there are a variety of options available. You can fetch a list of item IDs using the `getEquipmentIds` function. You can also query based on a specific equipment slot using the `getEquipmentId` function with a `KitType` argument. 

{% highlight java %}
int itemId = playerComposition.getEquipmentId(kitType);
{% endhighlight %}

OK, there is one caveat here. The `PlayerComposition` interface has no option to get equipment slot information for the ring slot and the ammunition slot. This information just doesn't exist in the RuneLite API. I couldn't find any information about why this is, but a little logic might highlight why. The ring and ammunition slots are never visible to another player, while all the other equipment slots (e.g., head, boots) are visible to other players. It seems logical that the ring and ammunition slots are not available in the actual client data, and therefore, cannot be extracted.

#### Example JSON Output

I think providing an example of a _scraped_ player provides a lot of context for the purpose of this plugin. The entry below displays a fictitious player named _NoNameSteve_ that has a selection of (strange!) equipment selected. FashionScape FTW!

{% highlight json %}
{
  "player":"NoNameSteve",
  "combat":3,
  "world":307,
  "head":{
    "name":"Zamorak halo",
    "id":12638
  },
  "weapon":{
    "name":"Mouse toy",
    "id":6541
  },
  "shield":{
    "name":"Lit bug lantern",
    "id":7053
  },
  "hands":{
    "name":"Graceful gloves",
    "id":13676
  },
  "torso":{
    "name":"Banshee top",
    "id":20775
  },
  "legs":{
    "name":"Anti-panties",
    "id":13288
  },
  "boots":{
    "name":"Mime boots",
    "id":3061
  },
  "cape":{
    "name":"Thieving cape",
    "id":9778
  },
  "amulet":{
    "name":"Gnome scarf",
    "id":9470
  }
}
{% endhighlight %}

## Data Analysis Method

After the lengthy process of gathering data using the playerscraper plugin, the raw data needed to be analyzed. Luckily the data from the playerscraper plugin is well structured, which made processing quite easy. However, additional data was required for analysis - primarily determining the cost and/or current GE price of each item. I accomplished this using the `summary.json` file provided by the [OSBuddy GE service](https://rsbuddy.com/exchange/summary.json). 

To ease the analysis process I wrote a simple tool in Python to process the playerscraper output and produce a CSV file to perform analysis on. I will not go into the details of the tool, as it is just some general Python stuff. But if you are interested, feel free to have a look at the [playerscraper_tools available on one of my GitHub repositories](https://github.com/osrsbox/osrsbox-python/tree/master/playerscraper_tools).

## Conclusion

I hope you enjoyed reading this post. It is quite a technical write up compared to the interesting information displayed in the [Data is Beautiful: Analysis of Bank Standing Equipment]({% post_url 2018-12-24-data-is-beautiful-bank-standing-equipment %}). But I hope that it might be useful to other developers, or for those who like watercooler style development blogs.

If you have any feedback or questions, please feel free to leave a comment below. I always appreciate feedback on these types of projects! Until next time, happy scaping everyone!
