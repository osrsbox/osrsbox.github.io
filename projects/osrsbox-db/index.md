---
layout: project
title: OSRSBOX | An OSRS Item Database Available via a RESTful API
project_name: OSRSBox Database
project_desc: A database of Old School Runescape (OSRS) items in JSON format with accompanying icon images in PNG format
include_tooltips: true
redirect_from:
  - osrs-database/
---

This project is a database of Old School Runescape (OSRS) items in JSON format with accompanying icon images in PNG format. The goal of the project is to provide a JSON object and PNG image for **every item in OSRS**. In addition, the metadata for each item is extensive including as many useful properties as possible.

The repository that accompanies this project provides public access to JSON formatted metadata about every OSRS item in the game; for example, whether an item is tradeable, stackable, or equipable or if the item is members only, or a quest item. For any equipable item, there is metadata about combat stats the item has; for example, what slash attack bonus, magic defence bonus or prayer bonus an item provides. Furthermore, high and low alchemy values are provided. Lastly, each item has a corresponding item icon in PNG format. 

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Project Overview

This section provides some brief summary information about the status of the OSRSBox database including the current project status and some useful links.

### Current Project Status

Since OSRS is a dynamic constantly updated MMO game, the items are continually changing due to game updates (a good thing!). This section briefly summarizes the last update to the primary data sources:

- [`items-complete.json`](https://github.com/osrsbox/osrsbox-db/blob/master/docs/items-complete.json): Updated as of 2019/03/16
- [`items-summary.json`](https://github.com/osrsbox/osrsbox-db/blob/master/docs/items-summary.json): Updated as of 2019/03/16
- [`items-json`](https://github.com/osrsbox/osrsbox-db/tree/master/docs/items-json): Updated as of 2019/03/16
- [`items-icons`](https://github.com/osrsbox/osrsbox-db/tree/master/docs/items-icons): Updated as of 2019/03/16

### Useful Links

This project is hosted on GitHub, where you will find the database, as well as the tools used to create the database contents.

- [osrsbox-db GitHub repository](https://github.com/osrsbox/osrsbox-db): The project repository
- [osrsbox-db raw data](https://github.com/osrsbox/osrsbox-db/tree/master/docs): The actual database contents including JSON files for all items in OSRS
- [osrsbox-db GitHub issues tracker](https://github.com/osrsbox/osrsbox-db/issues): Location for checking or submitting issues
- [osrsbox-db Blog Posts](https://www.osrsbox.com/blog/tags/Database/): A list of any blog post I have written that includes the osrsbox-db

## JSON structured data

The osrsbox-db stores information about OSRS items in separate JSON files. For example, [this link](https://www.osrsbox.com/osrsbox-db/items-json/12453.json) provides direct access to the `12453.json` file, which holds metadata about the Black wizard hat (g) item. In OSRS, the ID number `12453` is unique to the Black wizard hat (g). This is why the item ID is utilized in the database for fetching all item information - it is unique! 

But what is actually contained in these JSON files? Well, it is a collection of metadata (information) about each specific item. There are two main categories of metadata about an item: 

- Item property information
- Item equipment information

### Item Property Information

All items have properties; for example, the item's weight and the high alchemy value. All item properties are listed below for reference, including the data type for each property (e.g., string, integer, float) and a description of the property.

{: .table .table-striped .table-sm}
| Property            | Data type   | Description                                       |
| ------------------- | ------------| --------------------------------------------------|
| id                  | integer     | Unique OSRS item ID number                        |
| name                | string      | Name of the item                                  |
| members             | boolean     | If the item is a members only item                |
| tradeable           | boolean     | If the item is tradeable (between players and GE) |
| tradeable_on_ge     | boolean     | If the item is tradeable (only on GE)             |
| stackable           | boolean     | If the item is stackable (in inventory)           |
| noted               | boolean     | If the item is noted                              |
| notable             | boolean     | If the item is notable                            |
| linked_id           | integer     | The noted/unnoted equivalent of the item          |
| placeholder         | boolean     | If the item is a placeholder                      |
| equipable           | boolean     | If the item is equipable (based on menu entry)    |
| equipable_by_player | boolean     | If the item is equipable by a player              |
| cost                | integer     | The store price of an item                        |
| lowalch             | integer     | The low alchemy value of the item (cost * .4)     |
| highalch            | integer     | The high alchemy value of the item (cost * .6)    |
| weight              | float       | The weight (in kilograms) of the item             |
| buy_limit           | integer     | The Grand Exchange buy limit of the item          |
| quest_item          | boolean     | If the item is associated with a quest            |
| release_date        | string      | Date the item was released                        |
| examine             | string      | The examine text(s) for the item                  |
| url                 | string      | OSRS Wiki URL link                                |
| equipment           | object      | Object of item equipment info (if equipable)      |

### Item Equipment Information

If an item is equipable it will have additional metadata about the combat bonuses that it provides; for example, the melee strength bonus the Dragon dagger item provides. In addition, each equipable item will also have generic equipment information including the item slot, attack speed (if a weapon) and the skill requirements to equip the item. 

The following table specifies the different item equipment properties. This information includes the item bonuses, as well as the item slot, attack speed (if a weapon), and the skill requirements to equip an item.

{: .table .table-striped .table-sm}
| Property        | Data type | Description                           |
| --------------- | --------- | ------------------------------------- |
| attack_stab     | integer   | The stab attack bonus of the item     |
| attack_slash    | integer   | The slash attack bonus of the item    |
| attack_crush    | integer   | The crush attack bonus of the item    |
| attack_magic    | integer   | The magic attack bonus of the item    |
| attack_ranged   | integer   | The ranged attack bonus of the item   |
| defence_stab    | integer   | The stab defence bonus of the item    |
| defence_slash   | integer   | The slash defence bonus of the item   |
| defence_crush   | integer   | The crush defence bonus of the item   |
| defence_magic   | integer   | The magic defence bonus of the item   |
| defence_ranged  | integer   | The ranged defence bonus of the item  |
| melee_strength  | integer   | The melee strength bonus of the item  |
| ranged_strength | integer   | The ranged strength bonus of the item |
| magic_damage    | integer   | The magic damage bonus of the item    |
| prayer          | integer   | The prayer bonus of the item          |
| slot            | string    | The item slot (e.g., head)            |
| attack_speed    | integer   | The attack speed of an item           |
| skill_reqs      | array     | An array of objects {skill: level}    |

### JSON Structure

So what does this JSON object actually look like? Well, listed below is an example of a complete JSON object for the Abyssal whip. You could just click on [this link](https://www.osrsbox.com/osrsbox-db/items-json/4151.json) to view the raw JSON using the osrsbox-db API.

{% highlight json %}
{
    "id": 4151,
    "name": "Abyssal whip",
    "members": true,
    "tradeable": true,
    "tradeable_on_ge": true,
    "stackable": false,
    "noted": false,
    "noteable": true,
    "linked_id": 4152,
    "placeholder": false,
    "equipable": true,
    "equipable_by_player": true,
    "cost": 120001,
    "lowalch": 48000,
    "highalch": 72000,
    "weight": 0.453,
    "buy_limit": 70,
    "quest_item": false,
    "release_date": "26 January 2005",
    "examine": "A weapon from the abyss.",
    "url": "https://oldschool.runescape.wiki/w/Abyssal_whip",
    "equipment": {
        "attack_stab": 0,
        "attack_slash": 82,
        "attack_crush": 0,
        "attack_magic": 0,
        "attack_ranged": 0,
        "defence_stab": 0,
        "defence_slash": 0,
        "defence_crush": 0,
        "defence_magic": 0,
        "defence_ranged": 0,
        "melee_strength": 82,
        "ranged_strength": 0,
        "magic_damage": 0,
        "prayer": 0,
        "slot": "weapon",
        "attack_speed": 4,
        "skill_reqs": [
            {
                "skill": "attack",
                "level": 70
            }
        ]
    }
}
{% endhighlight %}

## Accessing JSON data about OSRS items

The JSON file for each OSRS item can be directly accessed using unique URLs provide through the `osrsbox.com` website. Technically, this provides some of the functionality of a RESTful API, but only supports GET requests. That is, you can fetch JSON files using a unique URL but cannot modify any JSON content. Below is a list of URL examples for items in the osrsbox-db:

- [https://www.osrsbox.com/osrsbox-db/items-json/12453.json](https://www.osrsbox.com/osrsbox-db/items-json/12453.json)
- [https://www.osrsbox.com/osrsbox-db/items-json/10.json](https://www.osrsbox.com/osrsbox-db/items-json/10.json)
- [https://www.osrsbox.com/osrsbox-db/items-json/2003.json](https://www.osrsbox.com/osrsbox-db/items-json/2003.json)
- [https://www.osrsbox.com/osrsbox-db/items-json/3097.json](https://www.osrsbox.com/osrsbox-db/items-json/3097.json)
- [https://www.osrsbox.com/osrsbox-db/items-json/3098.json](https://www.osrsbox.com/osrsbox-db/items-json/3098.json)

As displayed by the links above, each item ID is stored in the `osrsbox-db` repository, under the [`items-json`](https://github.com/osrsbox/osrsbox-db/tree/master/docs/items-json) folder. 

In addition to the single JSON files for each item, there is also a collection of JSON files that contain combined items. The following list documents the additional JSON files that are available:

- `items-complete.json`: A single JSON file containing every item. This file is also provided through the API and is available from [items-complete.json](https://www.osrsbox.com/osrsbox-db/items-complete.json)
- `items-json-slot`: A collection of JSON files that have the same database contents as `ītems-complete.json`, but are split into the different equipment slots. The following list documents all the files available:
    - [items-2h.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-2h.json)
    - [items-ammo.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-ammo.json)
    - [items-body.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-body.json)
    - [items-cape.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-cape.json)
    - [items-feet.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-feet.json)
    - [items-hands.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-hands.json)
    - [items-head.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-head.json)
    - [items-legs.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-legs.json)
    - [items-neck.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-neck.json)
    - [items-ring.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-ring.json)
    - [items-shield.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-shield.json)
    - [items-weapon.json](https://www.osrsbox.com/osrsbox-db/items-json-slot/items-weapon.json)

So how can you get and use these JSON files about OSRS items? It is pretty easy, but really depends on what you are trying to accomplish and what programming language you are using. 

### Accessing JSON Using wget

Take a simple example of downloading a single JSON file. In a Linux system, we could use the `wget` command to download a single JSON file, as illustrated in the example code below:

{% highlight bash %}
wget https://www.osrsbox.com/osrsbox-db/items-json/12453.json
{% endhighlight %}

### Accessing JSON Using Python

Maybe you are interested in downloading a single (or potentially multiple) JSON files about OSRS items and processing the information in a Python program. The short script below downloads the `12453.json` file using Python's urllib library, loads the data as a JSON object and prints the contents to the console. The code is a little messy, primarily due to supporting both Python 2 and 3 (as you can see from the "try" and "except" importing method implemented).

{% highlight python %}
import json

try:
    from urllib.request import urlopen
except ImportError:
    from urllib2 import urlopen

url = ("https://www.osrsbox.com/osrsbox-db/items-json/12453.json")
response = urlopen(url)
data = response.read().decode("utf-8")
json_obj = json.loads(data)
print(data)
{% endhighlight %}

### Accessing JSON Using JavaScript

Finally, let's have a look at JavaScript (specifically jQuery) example to fetch a JSON file from the osrsbox-db and build an HTML element to display in a web page. The example below is a very simple method to download the JSON file using the jQuery getJSON function. Once we get the JSON file, we loop through the JSON entries and print each key and value (e.g., name and Black wizard hat (g)) on it's own line in a div element. If you want to experiment with the code, the code is available in a W3Schools TryIt Editor at [this link](https://www.w3schools.com/code/tryit.asp?filename=FY2CQ7W1J346).

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script>
      $(document).ready(function(){
          $("button").click(function(){
              $.getJSON("https://www.osrsbox.com/osrsbox-db/items-json/12453.json", function(result){
                  $.each(result, function(i, field){
                      $("div").append(i + " " + field + "<br>");
                  });
              });
          });
      });
    </script>
  </head>
  <body>
    <button>Get JSON data</button>
    <div></div>
  </body>
</html>
{% endhighlight %}

So, if you have read this far, we can fetch OSRS item information using a public API provided by osrsbox-db... But what can we do with this data? The initial reason the osrsbox-db was created was to enable osrsbox-tooltips! Support for elusive items such as the <span class="osrstooltip" id='11806' title='Please wait ...'>[Saradomin godsword]</span>. Please see the [osrsbox-tooltips](https://github.com/osrsbox/osrsbox-tooltips) page for information about the project. However, since then I have used the osrsbox-db project in a variety of other projects whenever information about OSRS items are required.

## Icon images in PNG format

In addition to providing an API to JSON data. This project also provides thumbnail image in the PNG file format. However, not all OSRS items have an accompanying PNG image - usually untradeable items that have no OSRS Wikia page. As an example, see the image below:

Look, it's a ... Black wizard hat (g) ![alt text](https://www.osrsbox.com/osrsbox-db/items-icons/12453.png)

The Item icon images work in a very similar way to the JSON files. Each image is identified and accessed through the `osrsbox.com` website using the unique item ID number. Below is a list of URL examples for items icons in the osrsbox-db:

- [https://www.osrsbox.com/osrsbox-db/items-icons/12453.png](https://www.osrsbox.com/osrsbox-db/items-icons/12453.png)
- [https://www.osrsbox.com/osrsbox-db/items-icons/10.png](https://www.osrsbox.com/osrsbox-db/items-icons/10.png)
- [https://www.osrsbox.com/osrsbox-db/items-icons/2003.png](https://www.osrsbox.com/osrsbox-db/items-icons/2003.png)
- [https://www.osrsbox.com/osrsbox-db/items-icons/3097.png](https://www.osrsbox.com/osrsbox-db/items-icons/3097.png)
- [https://www.osrsbox.com/osrsbox-db/items-icons/3098.png](https://www.osrsbox.com/osrsbox-db/items-icons/3098.png)

As displayed by the links above, each item ID is stored in the `osrsbox-db` repository, under the `items-icon` folder. 

## Projects Using osrsbox-db

- [OSRSBox Tooltips (osrsbox-tooltips)]({{ site.url}}/projects/osrsbox-tooltips/)
- [Item Search for Old School RuneScape]({{ site.url}}/tools/item-search/)

## Project Acknowledgements

This project uses a collection of resources, and was only achievable using tools and data provided by other people who contribute to the OSRS community. A special thanks to:

- The amazing open source [RuneLite](https://runelite.net/) client which was used to create a custom plugin to dump item data and item icons from the OSRS cache
- The fantastic community driven [OSRS Wiki](https://oldschool.runescape.wiki/) which was used to augment the item data from the OSRS cache

## Project Feedback

I would thoroughly appreciate any feedback regarding the osrsbox-db project, especially problems with the inaccuracies of the data provided. So if you notice any problem with the accuracy of item property data, could you please let me know. The same goes for any discovered bugs, or if you have a specific feature request. The best method is to [open a new Github issue](https://github.com/osrsbox/osrsbox-db/issues) in the project repository. 

## Project Contribution

This project would thoroughly benefit from contribution from additional developers. Please feel free to submit a pull request if you have code that you wish to contribute - I would thoroughly appreciate the helping hand. For any code contributions, the best method is to [open a new GitHub pull request](https://github.com/osrsbox/osrsbox-db/pulls) in the project repository. Also, feel free to contact me (e.g., email) if you wish to discuss contribution before making a pull request.

## Project License

The osrsbox-db project is released under the GNU General Public License version 3 as published by the Free Software Foundation. You can read the [LICENSE](LICENSE) file for the full license, check the [GNU GPL](https://www.gnu.org/licenses/gpl-3.0.en.html) page for additional information, or check the [tl;drLegal](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3) documentation for the license explained in simple english. The GPL license is specified for all source code contained in this project. Other content is specified under GPL if not listed in the **Exceptions to GPL** below.

#### Exceptions to GPL

Old School RuneScape (OSRS) content and materials are trademarks and copyrights of JaGeX or its licensors. All rights reserved. OSRSBox, and the osrsbox-db project, is not associated or affiliated with JaGeX or its licensors. 

Additional data to help build this project is sourced from the [OSRS Wiki](https://oldschool.runescape.wiki/). This primarily includes item metadata. As specified by the [Weird Gloop Copyright](https://meta.weirdgloop.org/w/Meta:Copyrights) page, this content is licensed under CC BY-NC-SA 3.0 - [Attribution-NonCommercial-ShareAlike 3.0 Unported](https://creativecommons.org/licenses/by-nc-sa/3.0/) license.

## Project Attribution

The osrsbox-db project is a labour of love. I put a huge amount of time and effort into the project, and I want people to use it. That is the entire reason for it's existence. I am not too fussed about attribution guidelines... but if you want to use the project please adhere to the licenses used. Please feel free to link to this repository or my [OSRSBox website](https://www.osrsbox.com/) if you use it in your project - mainly so others can find it, and hopefully use it too!