---
layout: post
title: "OSRSBox | Blog | Using the OSRSBox Monster Database Python API"
name: "Using the OSRSBox Monster Database Python API"
desc: "A tutorial covering how to use the Python API to query OSRS monsters"
tags:
- Python
- Tool
- Database
- Data
add_to_popular_list: false
thumbnail: api.png
---

This post presents a quick introduction to the Python API that I have authored for my [OSRSBox Monster Database]({{ site.url }}/projects/osrsbox-db/). The database contains every monster in Old School RuneScape (OSRS) with lots of properties for each monster, including combat level, hitpoints, slayer masters, slayer XP, and monster combat stats such as attack slash value, defence magic level, and ranged level. 

The monster database is available as individual JSON files via a static JSON API or by using the [`osrsbox` PyPi package](https://pypi.org/project/osrsbox/) which provides a simple API implementation that makes processing the monster database easier. You can load the database, and interact with each monster as Python objects. This makes it simple and fast to author basic Python scripts to extract or manipulate monster information from the database. You can also do funky things such as import the monster "database" into an actual database such as MySQL or MongoDB. I prefer to write Python scripts, but both of these options could be very useful.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Basic Environment Configuration

To use the OSRSBox Monster API you only need the following requirements:

1. Python version 3.6 or higher

Only the standard Python installation is required, and the API (by default) only uses the `dataclasses` package when using Python version 3.6 (as the `dataclasses` is not in Python 3.6 as default). The API has been written and tested in Python version 3.6 and Python version 3.7.

The OSRSBox database (osrsbox-db) repository hosts a variety of code. The programs to scrape the OSRS Wiki are included, as well as the programs used to build, manage and update the database. This means the repository has a bunch of subfolders. The Python API is available inside the `osrsbox` folder, in the [osrsbox-db repository](https://github.com/osrsbox/osrsbox-db). However, you do not need to clone the repository to use the API... You can simply use `pip` to install the `osrsbox` package. The [`osrsbox` package is hosted on PyPi](https://pypi.org/project/osrsbox/) and can be installed using:

{% highlight plaintext %}
pip install osrsbox
{% endhighlight %}

### API Objects Summary 

Each monster is represented by Python objects, specifically using Python dataclasses. There are two types of objects that can be used to represent part of an in-game OSRS monster:

- `MonsterDefinition`: A class to represent a monster. This object type includes basic monster metadata such as `id`, `name`, `examine` text, monster `size`, `max_hit` and `hitpoints` values and `slayer_monster` association. Every monster object in the database has these properties.

- `MonsterDrop`: Most monsters in OSRS have drops, this includes different items that have `quantity`, `noted`, `rarity` and `drop_requirements`. Monster drops are stored as a `MonsterDrop` object, and available in a Python list (like an array) in the `drops` key present in the `MonsterDefinition` class.

## A Simple OSRSBox Database API Example

This section presents a short and simple example of how to use the Python API to import the API classes, load the monster database, and then loop through every monster. 

To use the Python API, you must import the `monsters_api` class. If this class is imported, the remaining API classes are automatically imported. The following code will import the required Python classes to load and process monster metadata.

{% highlight python %}
from osrsbox import monsters_api
{% endhighlight %}

Once you have imported the API you are ready to load in the monster. The API will handle this for you, and attempts to hide all the processing from the end-user. The example below loads the monster database using the `monsters_api` class. 

{% highlight python %}
all_db_monsters = monsters_api.load()
{% endhighlight %}

Once you have the monster's database loaded you can process the monsters. In the previous example, we loaded the monster database into an object called `all_db_monsters`. TODO (up to here) The API has built-in capability to iterate the monsters in this object to make processing easy. As a simple example, the code below loops over every monster in the loaded database, and prints the monster ID number and monster name (if it has a name - as some monster IDs do not).

{% highlight python %}
# Loop the monster database, and print names of monsters
for monster in all_db_monsters:
    if monster.name is not None:
        print(monster.id, monster.name)
{% endhighlight %}

For ease of use, the full example is provided below:

{% highlight python %}
from osrsbox import monsters_api

all_db_monsters = monsters_api.load()

# Loop the monster database, and print names of monsters
for monster in all_db_monsters:
    if monster.name is not None:
        print(monster.id, monster.name)
{% endhighlight %}

## Access Monster Details

In the previous section, we simply printed the monster ID number and monster name - which is a very simple example. Since the monster database has a lot of properties for each monster, we can write quite complex programs. However, to achieve this you need to know what monster properties are available. Below is a simple example of how to print out all the available properties:

{% highlight python %}
from osrsbox import monsters_apiall_db_monsters
all_db_monsters = monsters_api.load()

# Fetch a specific monster, in this case, the "Abyssal demon"
abyssal_demon = all_db_monsters[416]

# Loop all the monster properties that are available
for a in abyssal_demon.__annotations__:
    print(a)
{% endhighlight %}

Ok... so what just happened? First, we imported the monsters API, the package name is `monsters_api`. Then we loaded the entire monster database - behind the scenes a specific file called `monsters-complete.json` that is loaded by the Python package. Then we have queried a specific monster using the monster ID `416` which is unique to the Abyssal demon - you can loop the database to find monster IDs. The final two lines is a simple loop that looks at all the _annotations_ available for the `MonsterDefinition` class. The output is:

{% highlight plaintext %}
id
name
incomplete
members
release_date
combat_level
size
hitpoints
max_hit
attack_type
attack_speed
aggressive
poisonous
immune_poison
immune_venom
weakness
slayer_monster
slayer_level
slayer_xp
slayer_masters
examine
wiki_name
wiki_url
attack_level
strength_level
defence_level
magic_level
ranged_level
attack_stab
attack_slash
attack_crush
attack_magic
attack_ranged
defence_stab
defence_slash
defence_crush
defence_magic
defence_ranged
attack_accuracy
melee_strength
ranged_strength
magic_damage
drops
rare_drop_table
{% endhighlight %}

This list is exceptionally useful. We could use these available properties to help write a complex script. These properties are all available for each monster, and we could use them as follows:

{% highlight python %}
from osrsbox import monsters_api
all_db_monsters = monsters_api.load()

# Fetch a specific monster, in this case, the "Abyssal demon"
abyssal_demon = all_db_monsters[416]

print(abyssal_demon.hitpoints, abyssal_demon.max_hit)
{% endhighlight %}

The last line adds in a print statement to print the `hitpoints` and `max_hit` of the specific Abyssal demon monster! This is very useful data! When programming with a new library or API, I like complete examples that have a specific purpose. The following section outlines some full examples.

## Collection of API Examples

The previous sections discussed the technical details of how to use the Python API for the OSRSBox monster database. This section provides a couple of small examples of some useful scripts to give you more of an idea about how to use the database contents in a useful manner.

### Search Monster Drops
 
As previously mentioned, each monster has a list (array) of `MonsterDrop` objects. One useful purpose of this data could be to search every monster to determine what monsters  Pinned drop a specific item. From here, you could identify the lowest combat, or easiest monster to kill to get the specific item drop. 

{% highlight python %}
from osrsbox import monsters_api

# Load all monsters
all_db_monsters = monsters_api.load()

item_search_keyword = "prayer potion"

# Loop through all monsters in the database and search for items by name
print("The following monsters drop prayer potions!!!")
print(f"{'ID':<10} {'Name':<25} {'Wiki Name':<25}")
for monster in all_db_monsters:
    if monster.drops:
        for drop in monster.drops:
            if item_search_keyword in drop.name.lower():
                print(f"{monster.id:<10} {monster.name:<25} {monster.wiki_name:<25}")
{% endhighlight %}

The results from this program are listed below for reference:

{% highlight plaintext %}
The following  Pinned monsters drop prayer potions!!!
ID         Nam Pinned e                      Wiki Name                
465        Skeletal Wyvern           Skeletal Wyvern (2)      
466        Skeletal Wyvern           Skeletal Wyvern (3)      
467        Skeletal Wyvern           Skeletal Wyvern (4)      
468        Skeletal Wyvern           Skeletal Wyvern (1)      
499        Thermonuclear smoke devil Thermonuclear smoke devil
963        Kalphite Queen            Kalphite Queen (Crawling)
965        Kalphite Queen            Kalphite Queen (Airborne)
2205       Commander Zilyana         Commander Zilyana        
2267       Dagannoth Rex             Dagannoth Rex            
4303       Kalphite Queen            Kalphite Queen (Crawling)
4304       Kalphite Queen            Kalphite Queen (Airborne)
6493       Commander Zilyana         Commander Zilyana        
6498       Dagannoth Rex             Dagannoth Rex            
6500       Kalphite Queen            Kalphite Queen (Crawling)
6501       Kalphite Queen            Kalphite Queen (Airborne)
6604       Mammoth                   Mammoth                  
6615       Scorpia                   Scorpia                  
6618       Crazy archaeologist       Crazy archaeologist      
6619       Chaos Fanatic             Chaos Fanatic            
6803       Maniacal monkey           Maniacal monkey          
7095       Tortured gorilla          Tortured gorilla (Lv 142)
7097       Tortured gorilla          Tortured gorilla (Lv 142)
7118       Maniacal monkey           Maniacal monkey          
7119       Maniacal Monkey Archer    Maniacal Monkey Archer   
7144       Demonic gorilla           Demonic gorilla          
7145       Demonic gorilla           Demonic gorilla          
7146       Demonic gorilla           Demonic gorilla          
7147       Demonic gorilla           Demonic gorilla          
7148       Demonic gorilla           Demonic gorilla          
7149       Demonic gorilla           Demonic gorilla          
7150       Tortured gorilla          Tortured gorilla (Lv 141)
7151       Tortured gorilla          Tortured gorilla (Lv 141)
7307       Ancient Wizard            Ancient Wizard (Mage)    
7308       Ancient Wizard            Ancient Wizard (Ranger)  
7309       Ancient Wizard            Ancient Wizard (Melee)   
7310       Brassican Mage            Brassican Mage           
7792       Long-tailed Wyvern        Long-tailed Wyvern       
7793       Taloned Wyvern            Taloned Wyvern           
7794       Spitting Wyvern           Spitting Wyvern          
7806       Deranged archaeologist    Deranged archaeologist
{% endhighlight %}

From here you could further investigate the monster database for more information. For example, you could query each monster to determine the monster with the lowest `hitpoints` or the lowest `max_hit`. Maybe you could also determine the `rarity` value for each monster drop, to determine the monster with the highest probability which drops the `prayer potion` item drop.

### List Nieve Slayer Tasks

The monster database has a selection of properties related to the Slayer task. Specifically, the monster database has the `slayer_monster` to determine if a monster can be killed for a Slayer task, the `slayer_level` required to kill a specific monsters, the amount of `slayer_xp` awarded for each monster kill, and an association of `slayer_masters` that can assignment the specific monster as a task.

With all of that in mind, below is a simple script that determines the monsters that can be assigned by the slayer master `Nieve`. Please note that the list may be more exhaustive as variations of monsters are included, for example, the results include `Nechryael` or `Nechryarch`.

{% highlight python %}
from osrsbox import monsters_api

nieve_task_list = set()

# Load all monsters
all_db_monsters = monsters_api.load()

# Loop through all monsters in the database
monster_set = set()
for monster in all_db_monsters:
    if "nieve" in monster.slayer_masters:
        nieve_task_list.add(monster.name)

for assignment in nieve_task_list:
    print(assignment)
{% endhighlight %}

The results from this program are listed below for reference:

{% highlight plaintext %}
Skeleton Hellhound
Nechryarch
Flight Kilisa
Balfrug Kreeyath
...
Greater demon
Drake
Skotizo
Smoke devil
{% endhighlight %}

## Conclusion

This post only touched the surface of the different things you can do with the OSRSBox database of monsters. Hopefully, it provided some guidance to help you write some simple Python scripts to process the monsters and extract useful information from the raw data. 

I am open to feedback on this project. If you find any issues with the monster database API, please let me know. Same goes for any inaccuracies in the database contents. There are over 2,600 monsters - so it is difficult to manage. But members of the OSRS community have already been giving feedback and bug reports which make this is a much better project! I am also thinking of ways to extend the Python API at the moment to provide more functionality and simplify data processing - so please let me know if you have any feedback.

Make sure to check out the [OSRSBox Database project page]({{ site.url }}/projects/osrsbox-db/) for more information. And also the [OSRSBox GitHub repository](https://github.com/osrsbox/osrsbox-db/) to check for current issues and to make pull requests if you have code/fixes to add to the project. Until next time, happy scaping everyone!
