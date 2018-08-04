---
layout: post
title: "OSRSBox | Blog | Parsing the OSRS Cache using RuneLite"
name: "Parsing the OSRS Cache using RuneLite"
desc: "Extracting NPC and Item Definitions from the Cache"
tags:
- Cache
- RuneLite
add_to_popular_list: true
thumbnail: runelite-coding.png
redirect_from:
  - /osrsbox-cache/
---

While making some parts of this website and some authoring other tools I needed to dabble a little with the OSRS cache. For example, to help build the [OSRSBox Item Database project]((/projects/osrsbox-db/)) (osrsbox-db), I needed to extract all items from the OSRS cache. Along the way I learnt a lot about the cache structure, the type of information it contains and various tools that are available to help parse the information in the cache. This page documents some of the more useful information I found to hopefully help someone else who is interested. 

This post starts with a brief discussion about the OSRS cache, then outlines how to use the open source RuneLite project to extract item definitions and npc definitions from the cache.

## OSRS Cache Format/Structure

The OSRS Cache structure is pretty much the same as the very well know #317 Runescape 2 cache format. All cache files are stored in the home directory of the user. In Microsoft Windows (Vista onwards), the cache files are stored in the following directory:

{% highlight bash %}
C:\Users\<username>\jagexcache\oldschool\LIVE
OR
C:\Users\ph01l\jagexcache\oldschool\LIVE
{% endhighlight %}

Similarly, on Linux-based systems the cache files are stored in the following directory:

{% highlight bash %}
/home/<username>/jagexcache/oldschool/LIVE
OR
/home/ph01l/jagexcache/oldschool/LIVE
{% endhighlight %}

Inside the cache directory there are a number of files, but there are only two primary file types/formats. These file types are easily identified by their corresponding file extension, namely:

1. Data files, with a `.dat` extension
2. Index files, with a `.idx` extension

The following sections discuss each of these file type/formats in further detail.

### Data Files (dat)

The primary data file is named `main_file_cache.dat2`. This file contains the entire OSRS cache including information about items, npcs, images, sounds, models and animations. However, the file is stored in a complex structure and you cannot just open the `main_file_cache.dat2` file and view images or extract music. The file is made up of various _blocks_ of data, some are compressed, some are not, and the information is not trivial to extract. To extract anything from the `main_file_cache.dat2` file you must know the location of the data blocks. This information is provided by index files. 

### Index Files (idx)

As the name suggests, index file are an index for the `main_file_cache.dat2` file. In OSRS there are currently 17 index files named consecutively from `main_file_cache.idx0` to `main_file_cache.idx16`, as well as one index file named `main_file_cache.idx255`. The table below documents each index file, and the data that the index file points to.

{: .table .table-striped .table-sm}
| Index file name        | Content            |
|------------------------|--------------------|
| main_file_cache.idx0   | Skeleton           |
| main_file_cache.idx1   | Skin               |
| main_file_cache.idx2   | Config (See below) |
| main_file_cache.idx3   | Interface          |
| main_file_cache.idx4   | Sound Effects 1    |
| main_file_cache.idx5   | Landscape/Maps     |
| main_file_cache.idx6   | Music 1            |
| main_file_cache.idx7   | Models             |
| main_file_cache.idx8   | Sprites            |
| main_file_cache.idx9   | Texture            |
| main_file_cache.idx10  | Huffman            |
| main_file_cache.idx11  | Music 2            |
| main_file_cache.idx12  | Client scripts     |
| main_file_cache.idx13  | Fonts	          |
| main_file_cache.idx14  | Sound Effects 2    |
| main_file_cache.idx15  | Sound Effects 3    |
| main_file_cache.idx16  | Unknown            |
| main_file_cache.idx255 | Unknown            |

The config file, or `main_file_cache.idx2` contains highly useful information.

{: .table .table-striped .table-sm}
| Index 2 block  | Content                                          |
|----------------|--------------------------------------------------|
| 0              | Unknown                                          |
| 1              | Underlay Definition                              |
| 2              | Empty                                            |
| 3              | IdentityKit                                      |
| 4              | Overlay Definition                               |
| 5              | Unknown                                          |
| 6              | Object Definition                                |
| 7              | Empty                                            |
| 8              | Mapped Values                                    |
| 9              | NPC Definition                                   |
| 10             | Item Definition                                  |
| 11             | Empty                                            |
| 12             | Animation Definition (sequence)                  |
| 13             | Animated Graphic Definition (Spot Animation/GFX) |
| 14             | VarpBit Definition                               |
| 15             | Empty                                            |
| 16             | Varp Definition                                  |

## RuneLite Tools

RuneLite is a suite of open source tools for Old School RuneScape. The project provides a free, open-source and super fast client for Old School RuneScape. In addition, the creators also provide a cache extraction tool and used to provide a client deobfuscator. This documentation focuses on the cache tool for extracting information from the OSRS cache, and dabbles a little later with the deobfuscator (using and old version from the RuneLite project) for extracting cache version information. The [RuneLite homepage](https://runelite.net/) provide a summary of the project and precompiled downloads for the client. The [RuneLite GitHub project page](https://github.com/runelite/runelite) is the official repository to get the source code for the project.

### Compiling RuneLite Tools

The RuneLite client comes as a precompiled download (a `.jar` file). However, the other tools that are part of the suite of tools do not come precompiled. Therefore, this section documents how to compile the tools. Although this is a pretty staight-forward process, it may be difficult for someone without much programming experience.

The following instructions were performed on Microsoft Windows 10 64-bit. However, the instructions should be suitable for other Microsoft Windows operating systems and also adaptable to other operating systems such as Linux. The following software is required: 1) Git; 2) Netbeans; 3) Java.

1. Git SCM. Download from [here](https://git-scm.com/downloads). Select Windows to download the installer for Windows-based systems, and install using default options. Version 2.15.1 was used in this tutorial. Note: You can use any git client.
2. Netbeans and Java. The easiest option is to download the Netbeans IDE that is bundled with Java EE. Download from [here](https://netbeans.org/downloads/). Install using default options. Version 8.2 was used in this tutorial.

Now, clone the RuneLite repository using Git Bash. For those new to git, you need to open Git Bash using the Windows Explorer context menu. In Windows Explorer, browse to a folder where you want to down the RuneLite repository, right-click a white-space area in Windows Explorer, and select _Git Bash_. Then enter the following command into the Git Bash command prompt to download the source code from the RuneLite GitHub repository:

{% highlight bash %}
git clone https://github.com/runelite/runelite.git
{% endhighlight %}

Excellent, we have everything ready to go.

Open the NetBeans IDE from the Windows Start Menu. We will start by making a couple of configurations to Netbeans to make life easier. Firstly, we will disable testing, mainly because it takes a very long time to compile the project with additional tests. Perform the following tasks:

+ Go to Tools > Options
+ Select Java (the icon on the top bar)
+ Select the Maven tab
+ Add a checkbox in: Skip tests for any build executions no directly related to testing
+ Click Apply, then click OK

Now, open the RuneLite repository in the NetBeans IDE:

+ File > Open Project
+ Navigate to the folder of the cloned Runelite repository
+ It will have a little MA icon, to indicate it is a Maven project
+ Double-click the icon to load the project
+ After the project loads:
    + Expand the Runelite icon
    + Expand the Modules folder
    + Right click Cache, and select Open Project
	+ A new project will appear is the navigation pane

Before we can build the actual cache tool, we need to modify the source code a little. Since RuneLite is a suite of tools, we need to configure the Maven project to only build the Cache tool. Using the navigation menu, open the following file:

+ Cache > Project Files > pom.xml

You need to add a line in the `pom.xml` file to specify a main class. With a main class, the tool cannot be run correctly. You need to add the following entry:

{% highlight xml %}
<manifest>
	<mainClass>net.runelite.cache.Cache</mainClass>
</manifest>
{% endhighlight %}

The entry needs to be in the `<plugin>` section, specifically in the `maven-assembly-plugin` section. Inside this XML entry is a `configuration` tag, then a `archive` tag. Basically, you need to add a `manifest` tag that states that the resultant build file (`.jar`), should use the Cache main class as the program entry point. Without this addition, you will get a `no main manifest attribute` error when running the `.jar` file. The following snippet displays a section of the `pom.xml` file, and what it should look like after the entry is added.

{% highlight xml %}
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
        <configuration>
            <archive>
                <manifest>
                    <mainClass>net.runelite.cache.Cache</mainClass>
                </manifest>
            </archive>
...
</plugin>
{% endhighlight %}
										
Great! Now you can build the cache tool. Perform the following tasks:

+ Right click the Cache project in the navigation menu
+ Select Build

This will compile the Cache tool and produce a `.jar` file that can be executed. The build process may take a while for the first build, because a collection of dependencies need to be downloaded. The `.jar` file for the cache tool is available in the following directory:

{% highlight bash %}
runelite\cache\target
{% endhighlight %}

Two different versions will be compiled:

- `cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar`
- `cache-1.4.11-SNAPSHOT.jar`

As illustrated by the naming conventions, one has a `.jar` build with all project dependencies. The other is a standalone `.jar` file without dependencies. It is recommended to the use the `cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar` file to avoid any dependency issues.

## Extracting OSRS Cache Information using Runelite

The cache tool has support for extracting the following types of data from the OSRS cache:

- **items**: Extract JSON files with information about game items
- **npcs**: Extract JSON files with information about game NPCs
- **objects**: Extract JSON files with information about game objects
- **sprites**: Extract graphics from the cache
- **tree**: Extract every file from the cache in `.dat` files

You can run the newly build cache tool by using the Windows Command environment. The following steps should help:

- Open the Windows Start Menu
- Start typing `cmd` and left-click to open
- Navigate to the runelite folder
- As an alternative method, you can open the runelite folder in Windows Explorer, right-click on any whitespace while holding the Shift key, and open the Command Prompt. 
- NOTE: You can also use Powershell for this task.

The cache tool has the following general syntax:

{% highlight bash %}
java.exe -jar cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar -c <cache-location> <cache-extraction-option> <output-directory>
{% endhighlight %}

Where each of the inputs are explained below:

- `<cache-location>` is the location of the OSRS cache. This is usually in the home directory; for example: `C:\Users\<username>\jagexcache\oldschool\LIVE\`. In the following command examples, the username is: `ph01l`.
- `<cache-extraction-option>` is the type of information that you want to extract. Valid options are `-items`, `-npcs`, `-objects` and `-sprites`.
- `<output-directory>` is the directory to save the output. Sometimes this will be created automatically by the tool, and sometimes you will have to manually create it. In the following command examples, as output is saved to the `Desktop` folder for the user named `ph01l`.

Examples are helpful for this type of tool, where the command can be complex. The following five snippets provide examples of how to run the RuneLite cache tool.

{% highlight bash %}
# EXTRACT ITEM INFORMATION IN JSON FORMAT
java.exe -jar .\cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -items C:\Users\ph01l\Desktop\items
{% endhighlight %}

{% highlight bash %}
# EXTRACT NPC INFORMATION IN JSON FORMAT
java.exe -jar .\cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -npcs C:\Users\ph01l\Desktop\npcs
{% endhighlight %}

{% highlight bash %}
# EXTRACT OBJECT INFORMATION IN JSON FORMAT
java.exe -jar .\cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -objects C:\Users\ph01l\Desktop\objects
{% endhighlight %}

{% highlight bash %}
# EXTRACT IMAGES
java.exe -jar .\cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -sprites C:\Users\ph01l\Desktop\sprites
{% endhighlight %}

{% highlight bash %}
# EXTRACT THE ENTIRE CACHE IN DAT FORMAT
java.exe -jar .\cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar -u -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -t tree
{% endhighlight %}

You can also run the cache tool directly in Netbeans. However, to achieve this you must provide command line arguments within the NetBeans IDE. This is complex to setup, but simple after it is configured. To achieve this, in the bottom-right pane (the output/debugging pane) there is a little icon that looks like a fast forward button - colored (yellow). There are two icons which look the same, it is the bottom one! When hovered over, it will read: _Re-run with different parameters_. This button allows us to enter command line arguments when running the program. The first line needs to have the arguments added to it. In original format, th configuration has the following line:

{% highlight bash %}
exec.args=-classpath %classpath net.runelite.cache.Cache
{% endhighlight %}

If you want to _Run_ the cache tool directly in Netbeans you need to add additional arguments. For example, to dump items you can use the following arguments:

{% highlight bash %}
exec.args=-classpath %classpath net.runelite.cache.Cache -c C:\Users\ph01l\jagexcache\oldschool\LIVE -items C:\Users\ph01l\Desktop\items
{% endhighlight %}

### Example of OSRS Cache Item Definition

The information I wanted to extract from the OSRS Cache was the item definitions. I needed this information to get an up-to-date and complete list of all items in OSRS. The code snippet below show one item definition that has been extracted from the cache. The specific item has the ID number of `22111` and is the `Dragonbone necklace`.

{% highlight json %}
{
  "id": 22111,
  "name": "Dragonbone necklace",
  "resizeX": 128,
  "resizeY": 128,
  "resizeZ": 128,
  "xan2d": 417,
  "yan2d": 81,
  "zan2d": 27,
  "cost": 80000,
  "isTradeable": true,
  "stackable": 0,
  "inventoryModel": 35102,
  "members": true,
  "zoom2d": 716,
  "xOffset2d": 1,
  "yOffset2d": 20,
  "ambient": 0,
  "contrast": 0,
  "options": [
    null,
    null,
    "Take",
    null,
    null
  ],
  "interfaceOptions": [
    null,
    "Wear",
    null,
    null,
    "Drop"
  ],
  "maleModel0": 34627,
  "maleModel1": -1,
  "maleModel2": -1,
  "maleOffset": 0,
  "maleHeadModel": -1,
  "maleHeadModel2": -1,
  "femaleModel0": 34627,
  "femaleModel1": -1,
  "femaleModel2": -1,
  "femaleOffset": 0,
  "femaleHeadModel": -1,
  "femaleHeadModel2": -1,
  "notedID": 22112,
  "notedTemplate": -1,
  "team": 0,
  "shiftClickDropIndex": -2,
  "boughtId": -1,
  "boughtTemplateId": -1,
  "placeholderId": 22113,
  "placeholderTemplateId": -1
}
{% endhighlight %}

As you can see these is a variety of information - some useful, some not. The usefulness of the information really depends on what information you are after! 
