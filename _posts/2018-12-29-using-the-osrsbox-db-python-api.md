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

**This post is no longer up-to-date as the osrsbox-db project is currently under active development and the Python API is undergoing dramatic changes. I will update the post when the API is bought up-to-date.**

This post presents a quick introduction to the Python API that I have authored for my [OSRSBox Item Database]({{ site.url }}/projects/osrsbox-db/). The database contains every item in Old School RuneScape (OSRS) with lots of properties for each item, including alchemy values, examine text, quest status and item bonuses and equipment properties. 

The API is a simple implementation that makes processing the item database easier. You can load the database, and interact with each item as an object. This makes it simple and fast to author basic Python scripts to extract or manipulate item information from the database. You can also do funky things such as import the item "database" into an actual database such as MySQL or MongoDB. I prefer to write Python scripts, but both of these options could be very useful. 

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Basic Environment Configuration

To use the OSRSBox Item API you only need the following requirements:

1. Python
1. Git

### Python

Only the standard Python installation is required, and the API (by default) uses no other third-party libraries. The API has been written and tested in Python version 3.5. It has not been tested with Python version 2.7.

### Git

Git can be used to download the [OSRSBox database repository](https://github.com/osrsbox/osrsbox-db). However, this is not mandatory as you can download the GitHub repository using the _Clone or Download_ button, and then select _Download ZIP_. This tutorial assumes you are using git. You can clone (download) the repository using the following `git` command:

{% highlight plaintext %}
git clone https://github.com/osrsbox/osrsbox-db.git
{% endhighlight %}

## Project Structure and API

The OSRSBox database (osrsbox-db) repository hosts a variety of code. The programs to scrape the OSRS Wiki are included, as well as the programs used to build, manage and update the database. This means the repository has a bunch of subfolders. The Python API tools are available inside the `item_api_tools` folder. 

{% highlight plaintext %}
cd osrsbox-db/item_api_tools
{% endhighlight %}

Inside this folder, you will find a variety of Python classes which form the API, as well as a collection of example Python scripts which use the API. 

### API Classes 

The Python API is comprised as a collection of Python classes. This code provides the ability to load and manage the database of items. When an item is loaded, various checks are performed to make sure all the properties have correct data types. In addition, there is a class to handle every object in the database, to make processing simpler. The four Python classes are described below:

1. `AllItems.py`: Handles (loads and stores) all items in the database
1. `ItemDefinition.py`: Handles an instance of a single item from the database
1. `ItemBonuses.py`: Handles an instance of the item bonuses of a single item from the database (this is for equipable items only)
1. `ItemEquipment.py`: Handles an instance of the item equipment properties of a single item from the database (this is for equipable items only)

### API Tools

Any tool in the `items_api_tools` folder that is a tool is identifiable as it starts with a lowercase letter `c_`. This stands for _caller_ and should help identify the actual tools available and tell them apart from the API classes. [Have a look at some of these scripts](https://github.com/osrsbox/osrsbox-db/tree/master/item_api_tools) if you want to see some more working examples of using the API.

## A Simple OSRSBox Database API Example

This section presents a short and simple example of how to use the Python API to import the API classes, load the item database, and then loop through every item. I would recommend creating your script in the `items_api_tools` folder so that there are no import issues. 

### Import API Classes

To use the Python API, you must import the `AllItems.py` class. If this class is imported, the remaining API classes are automatically imported into the `AllItems` class. Remember, this tutorial expects that you have created your script in the `items_api_tools` folder. The following code will import the required Python classes, followed by the required API classes.

{% highlight python %}
import os
import sys

# Import osrsbox-db API classes
sys.path.append(os.getcwd())
import AllItems
{% endhighlight %}

### Load the Item Database

Once you have imported the API class you are ready to load in the items. The API will handle this for you, and attempts to hide all the processing from the end-user. To load the item database, you must specify the location of the database. Remember, this is in the `docs` folder in the repository. If you are authoring your script in the `items_api_tools` folder, the database location can be either:

- `../docs/items-json/` if you want to load the individual JSON files
- `../docs/items_complete.json` if you want to load the single JSON file

There is no difference between the two inputs, they have the same content... just one is a directory of individual JSON files and the other is a single JSON file with all items. The API can handle both input types transparently. Loading the single `items_complete.json` file is probably faster.

The example below sets the `db_path` variable to `../docs/items-json/`, then loads the item database using the `AllItems` class. When initializing the `AllItems` object, the only required argument is the path to the JSON file/s that make up the database.

{% highlight python %}
# Set the database location
db_path = "../docs/items-json/"
# Read in the database
all_items = AllItems.AllItems(db_path)
{% endhighlight %}

Please note that the initial processing takes quite a while (depending on your system specifications), as every item must be read and loaded and there are over 20,000 items in the database. However, the second load should be much quicker as the processing performed has most likely been cached by Python on your system.

### Loop Items in the Database

Once you have the item database loaded you can process the items. In the previous example, we loaded the item database into an object called `all_items`. The API has built-in capability to iterate the items in this object to make processing easy. As a simple example, the code below loops over every item in the loaded database, and prints the item ID number and item name (if it has a name - as some item IDs do not).

{% highlight python %}
# Loop the item database, and print names of items
for item in all_items:
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
for item in all_items:
    if item.equipable:
        print(item.bonuses)
        print(item.equipment)
{% endhighlight %}

In the above code, the `if item.equipable:` statement checks to see if an item is equipable. If it is, then you can access the `item.bonuses` object and the `item.equipment` object. Instead of listing all the properties available in each object in this post, I recommend checking the [OSRSBox Database project page]({{ site.url }}/projects/osrsbox-db/) which has a table of all the properties available. However, as a simple example, you can fetch the melee strength bonus of an equipable item using the code below:

{% highlight python %}
# Loop the item database and find equipable items melee strength
for item in all_items:
    if item.equipable:
        if item.bonuses.melee_strength is not 0:
            print(item.name, item.bonuses.melee_strength, item.equipment.slot)
{% endhighlight %}

## Collection of API Examples

The previous sections discussed the technical details of how to use the Python API for the OSRSBox item database. This section provides a couple of small examples of some useful scripts to give you more of an idea about how to use the database contents in a useful manner.

### Print Item GE Buy Limits

The example below loops over all of the items and determines if an item has a buy limit associated with it and then prints the item name and the item buy limit value. 

{% highlight python %}
# Loop the item database, and print names of items
for item in all_items:
    if item.buy_limit is not None:
        print(item.name, item.buy_limit)
{% endhighlight %}

### Determine Weapon with Highest Slash Attack

The example below is a little more complex. It loops over all of the items and determines if an item is equipable. It then adds the attack slash value to a dictionary where the key is the attack slash value and appends the item name to a list which is the value. It then prints out a sorted list (highest to lowest) of attack slash value and item names. Basically, it prints a list of the items with the highest to lowest attack slash bonuses.

{% highlight python %}
from collections import defaultdict
top_attack_slash = defaultdict(list)

# Loop the item database, and print names of items
for item in all_items:
    if item.equipable:
        top_attack_slash[item.bonuses.attack_slash].append(item.name)

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
