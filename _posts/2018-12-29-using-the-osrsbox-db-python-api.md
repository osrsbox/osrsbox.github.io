---
layout: post
title: "OSRSBox | Blog | Using the OSRSBox Item Database Python API"
name: "Using the OSRSBox Item Database Python API"
desc: "A tutorial covering how to use the Python API to query OSRS items"
tags:
- Python
- Tool
- Database
- Data
add_to_popular_list: false
thumbnail: api.png
---

This post presents a quick introduction to the Python API that I have authored for my [OSRSBox Item Database]({{ site.url }}/projects/osrsbox-db/). The database contains every item in Old School RuneScape (OSRS) with lots of properties for each item, including alchemy values, examine text, quest status and item bonuses and equipment properties. 

The API is a simple implementation that makes processing the item database easier. You can load the database, and interact with each item as an object. This makes it simple and fast to author basic Python scripts to extract or manipulate item information from the database. You can also do funky things such as import the item "database" into an actual database such as MySQL or MongoDB. I prefer to write Python scripts, but both of these options could be very useful. 

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Basic Environment Configuration

To use the OSRSBox Item API you only need the following requirements:

1. Python version 3.6 or higher

Only the standard Python installation is required, and the API (by default) only uses the `dataclasses` library when using Python 3.6 (but not 3.7 as it is standard). The API has been written and tested in Python version 3.6 and Python version 3.7.

## Project Structure and API

The OSRSBox database (osrsbox-db) repository hosts a variety of code. The programs to scrape the OSRS Wiki are included, as well as the programs used to build, manage and update the database. This means the repository has a bunch of subfolders. The Python API is available inside the `osrsbox` folder, in the [osrsbox-db repository](https://github.com/osrsbox/osrsbox-db). However, you do not need to clone the repository to use the API... You can simply use `pip` to install the `osrsbox` package. The [`osrsbox` package is hosted on PyPi](https://pypi.org/project/osrsbox/) and can be installed using: 

{% highlight plaintext %}
pip install osrsbox
{% endhighlight %}

### API Classes 

Each item is represented by Python objects, specifically using Python dataclasses. There are three types of objects that can be used to represent part of an in-game OSRS item:

- `ItemDefinition`: An item that is not equipable, and not a weapon. This object type includes basic item metadata such as `id`, `name`, `examine` text, store `cost`, `high_alch` and `low_alch` values and `quest` association. Every item object in the database has these properties.

- `ItemEquipment`: Many items in OSRS are equipable, this includes armour and other _wearable_ items. Any equipable item (that is not a weapon) is stored as an `ItemEquipment` object including attributes such as `attack_slash`, `defence_crush` and `melee_strength` values. Additional information about equipable items include skill `requirements` to wear armour or wield weapons, and item `slot` properties. Finally, every equipable item also has all the properties available in the `ItemDefinition` class.
  
- `ItemWeapon`: A selection of OSRS items are both equipable, and also weapons. The `ItemWeapon` class has additional weapon-specific attributes including `attack_speed` and `weapon_types`. Additionally, each weapon has an array of combat stances associated with it to determine the `combat_style`, `attack_type`, `attack_style` and any `bonuses` or combat `experience` association. Finally, every weapon item also has the properties available in the `ItemDefinition` and `ItemEquipment` classes. 

### API Examples

Any tool in the `osrsbox/items_api_examples` folder that is an example program. [Have a look at some of these scripts](https://github.com/osrsbox/osrsbox-db/tree/master/osrsbox/items_api_examples) if you want to see some more working examples of using the API.

## A Simple OSRSBox Database API Example

This section presents a short and simple example of how to use the Python API to import the API classes, load the item database, and then loop through every item. 

### Import API Classes

To use the Python API, you must import the `items_api` class. If this class is imported, the remaining API classes are automatically imported. The following code will import the required Python classes to load and process item metadata.

{% highlight python %}
from osrsbox import items_api
{% endhighlight %}

### Load the Item Database

Once you have imported the API class you are ready to load in the items. The API will handle this for you, and attempts to hide all the processing from the end-user. The example below loads the item database using the `items_api` class. 

{% highlight python %}
all_db_items = items_api.load()
{% endhighlight %}

### Loop Items in the Database

Once you have the item database loaded you can process the items. In the previous example, we loaded the item database into an object called `all_db_items`. The API has built-in capability to iterate the items in this object to make processing easy. As a simple example, the code below loops over every item in the loaded database, and prints the item ID number and item name (if it has a name - as some item IDs do not).

{% highlight python %}
# Loop the item database, and print names of items
for item in all_db_items:
    if item.name is not None:
        print(item.id, item.name)
{% endhighlight %}

### Access Item Details

In the previous section, we simply printed the item ID number and item name. However, this is a very simple example. Since the item database has a lot of properties for each item, we can write quite complex queries. However, to achieve this you need to be able to access the item properties. Below is a list of print statements for the properties of every item property in the database:

{% highlight python %}
print(item.id)           # Item ID number
print(item.name)         # In-game name
print(item.members)      # Boolean if members item
print(item.tradeable)    # Boolean if the item tradeable
print(item.stackable)    # Boolean if the item stackable
print(item.noted)        # Boolean if the item noted
print(item.noteable)     # Boolean if the item noteable
print(item.equipable)    # Boolean if the item equipable
print(item.cost)         # Store cost price
print(item.lowalch)      # Low alchemy value
print(item.highalch)     # High alchemy value
print(item.weight)       # Weight of the item (in kgs)
print(item.buy_limit)    # Item buy limit at GE
print(item.quest_item)   # List of quests an item is associated with
print(item.release_date) # Release date of the item
print(item.examine)      # Examine text of item
print(item.url)          # OSRS Wiki URL (uses new wiki, not Wikia)
{% endhighlight %}

The above list only prints the information in each property to the terminal. But the list gives an idea of how to use each item object. In addition, you can fetch more metadata about an item if it is equipable. This is an easy process using the API, as outlined by the code snippet below:

{% highlight python %}
# Loop the item database and find equipable items
for item in all_db_items:
    if item.equipable_by_player:
        print(item.equipment)
{% endhighlight %}

In the above code, the `if item.equipable_by_player:` statement checks to see if an item is equipable. If it is, then you can access the `item.equipment` object. Instead of listing all the properties available in each object in this post, I recommend checking the [OSRSBox Database project page on PyPi](https://pypi.org/project/osrsbox/) which has a table of all the properties available. However, as a simple example, you can fetch the melee strength bonus of an equipable item using the code below:

{% highlight python %}
# Loop the item database and find equipable items melee strength
for item in all_db_items:
    if item.equipable_by_player:
        if item.equipment.melee_strength is not 0:
            print(item.name, item.equipment.melee_strength, item.equipment.slot)
{% endhighlight %}

## Collection of API Examples

The previous sections discussed the technical details of how to use the Python API for the OSRSBox item database. This section provides a couple of small examples of some useful scripts to give you more of an idea about how to use the database contents in a useful manner.

### Print Item GE Buy Limits

The example below loops over all of the items and determines if an item has a buy limit associated with it and then prints the item name and the item buy limit value. 

{% highlight python %}
# Loop the item database, and print names of items
for item in all_db_items:
    if item.buy_limit is not None:
        print(item.name, item.buy_limit)
{% endhighlight %}

### Determine Weapon with Highest Slash Attack

The example below is a little more complex. It loops over all of the items and determines if an item is equipable. It then adds the attack slash value to a dictionary where the key is the attack slash value and appends the item name to a list which is the value. It then prints out a sorted list (highest to lowest) of attack slash value and item names. Basically, it prints a list of the items with the highest to lowest attack slash bonuses.

{% highlight python %}
from collections import defaultdict
top_attack_slash = defaultdict(list)

# Loop the item database, and print names of items
for item in all_db_items:
    if item.equipable_by_player:
        top_attack_slash[item.equipment.attack_slash].append(item.name)

for k, v in sorted(top_attack_slash.items(), reverse=True):
  print(k, ', '.join(v))
{% endhighlight %}

The output from the code above is a very long list of items! The first line printed are the items with the highest slash attach bonuses. Out of interest, these are the godswords from God wars dungeon bosses, as listed below.

{% highlight plaintext %}
132 Saradomin godsword (or), Armadyl godsword (or), Armadyl godsword, Saradomin godsword, Zamorak godsword, Armadyl godsword, Bandos godsword (or), Bandos godsword, Zamorak godsword (or), Armadyl godsword
{% endhighlight %}

## Conclusion

This post only touched the surface of the different things you can do with the OSRSBox database of items. Hopefully, it provided some guidance to help you write some simple Python scripts to process the items and extract useful information from the raw data. 

I am really open to feedback on this project. If you find any issues with the item database API, please let me know. Same goes for any inaccuracies in the database contents. There are over 20,000 items - so it is difficult to manage. But members of the OSRS community have already been giving feedback and bug reports which make this is a much better project! I am also thinking of ways to extend the Python API at the moment to provide more functionality and simplify data processing - so please let me know if you have any feedback.

Make sure to check out the [OSRSBox Database project page]({{ site.url }}/projects/osrsbox-db/) for more information. And also the [OSRSBox GitHub repository](https://github.com/osrsbox/osrsbox-db/) to check for current issues and to make pull requests if you have code/fixes to add to the project.

Until next time, happy scaping everyone!
