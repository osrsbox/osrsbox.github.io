---
layout: default
title: OSRSBox | osrsbox-cache | OSRS Cache Documentation
---

# osrsbox-cache
## OSRS Cache Documentation

While making some parts of this website and some other tools I have authored I needed to dabble a little with the OSRS cache. For example, to help build the OSRSBox database of items (osrsbox-db) I needed to extract all items from the cache. Along the way I learnt a lot about the cache structure, the type of information it contains and various tools that are avilable. This page documents some of the more useful information I found to hopefully help someone else who is interested. 

## OSRS Cache Format/Structure

The OSRS Cache structure is pretty much the same as the very well know #317 Runescape 2 cache format. All cache files are stored in the home directory of the user. In Microsoft Windows (Vista onwards), the cache files are stored in the following directory:

{: .code-box}
```
C:\Users\<username>\jagexcache\oldschool\LIVE
OR
C:\Users\ph01l\jagexcache\oldschool\LIVE
```

Similarly, on Linux-based systems the cache files are stored in the following directory:

{: .code-box}
```
/home/<username>/jagexcache/oldschool/LIVE
OR
/home/ph01l/jagexcache/oldschool/LIVE
```

Inside the cache directory there are a number of files, but there are only two primary file types/formats. These file types are easily identified by their corresponding file extension, namely:

1. Data files, with a .dat extension
2. Index files, with a .idx extension

The following sections discuss each of these file type/formats in further detail.

### Data Files (dat)

The primary data file is named `main_file_cache.dat2`. This file contains the entire OSRS cache including information about items, npcs, images, sounds, models and animations. However, the file is stored in a complex structure and you cannot just open the `main_file_cache.dat2` file and view images or extract music. The file is made up of various _blocks_ of data, some are compressed, some are not, and the information is not trivial to extract. To extract anything from the `main_file_cache.dat2` file you must know the location of the data blocks. This information is provided by index files. 

### Index Files (idx)

As the name suggests, index file are an index for the `main_file_cache.dat2` file. In OSRS there are currently 17 index files named consecutively from `main_file_cache.idx0` to `main_file_cache.idx16`, as well as one index file named `main_file_cache.idx255`. The table below documents each index file, and the data that the index file points to.

{: .content}
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

{: .content}
| Index 2 block  | Content                                          |
|----------------|--------------------------------------------------|
| 0              | Unknown                                          |
| 1              | Underlay Defintion                               |
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

### How Index Files Point to Data Blocks

Discussion of how index files point to specific data blocks

## RuneLite Tools

RuneLite is a suite of open source tools for RuneScape. The project provides a free, open-source and super fast client for Old School RuneScape. In addition, the creators also provide a client deobfuscator and a cache extraction tool. This documentation foucsses on the cache tool for extracting information from the OSRS cache, and dabbles a little later with the deobfuscator for extracting cache version information. The [RuneLite homepage](https://runelite.net/) provide a summary of the project and precompiled downloads for the client. The [RuneLite GitHub project page](https://github.com/runelite/runelite) is the official repository to get the source code for the project.

### Compiling RuneLite Tools

The RuneLite client comes as a precompiled download (a `.jar` file). However, the other tools available do not come precompiled. Therefore, this section documents how to compile the tools. Although this is a pretty staight-forward process, it may be difficult for people without much programming experience.

The following instructions were performed on Microsoft Windows 10 64-bit. However, the instructions should be suitable for other Microsoft Windows operating systems and also adaptable to other operating systems such as Linux. The following software is required: 1) Git; 2) Netbeans; 3) Java.

1. Git SCM. Download from [here](https://git-scm.com/downloads). Select Windows to download the installer for Windows-based systems, and install using default options. Version 2.15.1 was used in this tutorial. Note: You can use any git client.
2. Netbeans and Java. The easiest option is to download the Netbeans IDE that is bundled with Java EE. Download from [here](https://netbeans.org/downloads/). Install using default options. Version 8.2 was used in this tutorial.

Now, clone the RuneLite repository using Git Bash. For those new to git, you need to open Git Bash using the Windows Explorer context menu. In Windows Explorer, browse to a folder where you want to down the RuneLite repository, right-click a white-space area in Windows Explorer, and select _Git Bash_. Then enter the following command to download the source code from the repository:

{: .code-box}
```
git clone https://github.com/runelite/runelite.git
```

Excellent, we have everything ready to go.

Open Netbeans from the Windows Start Menu. We will start by making a couple of configurations to Netbeans to make life easier. Firstly, we will disable testing, mainly because it takes a very long time to compile the project with additonal tests. Perform the following tasks:

+ Go to Tools > Options
+ Select Java (the icon on the top bar)
+ Select the Maven tab
+ Add a checkbox in: Skip tests for any build executions no directly related to testing
+ Click Apply, then click OK

Now, open the RuneLite repository in Netbeans:

+ File > Open Project
+ Navigate to the folder of the cloned Runelite repository
+ It will have a little MA icon, for a maven project
+ Double-click the icon to load the project
+ After the project loads:
    + Expand the Runelite icon
    + Expand the Modules folder
    + Right click Cache, and select Open Project
	+ A new project will appear is the navigation pane
	+ Right click Deobfuscator, and select Open Project
	+ A new project will appear is the navigation pane

Before we can build the actual cache tool, we need to modify the source code a little. Since RuneLite is a suite of tools, we need to configure the Maven project to only build the cache tool. The same process can also be done for the deobfuscator. Using the navigation menu, open the following file:

+ Cache > Project Files > pom.xml

You need to add a line in the `pom.xml` file to specify a main class. With a main class, the tool cannot be run correctly. You need to add the following entry:

{: .code-box}
```
<manifest>
	<mainClass>net.runelite.cache.Cache</mainClass>
</manifest>
```

For the deobfuscator, the following entry needs to be added:

{: .code-box}
```
<manifest>
	<mainClass>net.runelite.deobfuscator.Deobfuscator</mainClass>
</manifest>
```

The entry needs to be in the `<plugin>` section, specifically in the `maven-assembly-plugin` entry. The following snippet displays a section of the `pom.xml` file, and what it should look like after the entry is added.

{: .code-box}
```
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
```
										
Great! Now you can build the cache tool. Perform the following tasks:

+ Right click the cache project in the navigation menu
+ Select Build

This will compile the cache tool and produce a `.jar` file that can be executed. The `.jar` file for the cache tool is available in the following directory:

{: .code-box}
```
runelite\cache\target
```

Two different versions will be compiled:

+ `cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar`
+ `cache-1.2.9-SNAPSHOT.jar`

As illustrated by the naming conventions, one has a `.jar` build with all project dependencies. The other is a standalone `.jar` file without dependencies. It is recommended to the use the `cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar` file to avoid any dependency issues.

## Extracting OSRS Cache Information using Runelite

The cache tool has support for extracting the following types of data from the OSRS cache:

+ items: Extract JSON files with information about game items
+ npcs: Extract JSON files with information about game NPCs
+ objects: Extract JSON files with information about game objects
+ sprites: Extract graphics from the cache
+ tree: Extract every file from the cache in `.dat` files

You can run the newly build cache tool by using the Windows Command environment. The following steps should help:

+ Open the Windows Start Menu
+ Start typing `cmd` and left-click to open
+ Navigate to the r

The cache tool has the following general syntax:

{: .code-box}
```
java -jar cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar -c <cache-location> <cache-extraction-option> <output-directory>
```

Where each of the inputs are explained below:

+ `<cache-location>` is the location of the OSRS cache. This is usually in the home directory; for example: `C:\Users\ph01l\jagexcache\oldschool\LIVE\`.
+ `<cache-extraction-option>` is the type of information that you want to extract. Valid options are `-items`, `-npcs`, `-objects` and `-sprites`.
+ <output-directory> is the directory to save the output. Sometimes this will be created automatically by the tool, and sometimes you will have to manually create it.

Examples are helpful for this type of tool, where the command can be complex. The following five snippets provide examples of how to run the RuneLite cache tool.

{: .code-box}
```
# EXTRACT ITEM INFORMATION IN JSON FORMAT
java -jar .\cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -items C:\Users\ph01l\Desktop\items
```

{: .code-box}
```
# EXTRACT NPC INFORMATION IN JSON FORMAT
java -jar .\cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -npcs C:\Users\ph01l\Desktop\npcs
```

{: .code-box}
```
# EXTRACT OBJECT INFORMATION IN JSON FORMAT
java -jar .\cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -objects C:\Users\ph01l\Desktop\objects
```

{: .code-box}
```
# EXTRA
CT IMAGES
java -jar .\cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -sprites C:\Users\ph01l\Desktop\sprites
```

{: .code-box}
```
# EXTRACT THE ENTIRE CACHE IN DAT FORMAT
java -jar .\cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar -u -c C:\Users\ph01l\jagexcache\oldschool\LIVE\ -t tree
```

You can also run the cache tool directly in Netbeans. However, to achieve this you must provide command line arguments. To achieve this, in the bottom-right pane (the output/debugging pane) there is a little icon that looks like a fast forward button - colored (yellow). There are two icons which look the same, it is the bottom one! When hovered over, it will read: Re-run with different paramters. This button allows us to enter command line arguments when running the program. The first line needs to have the arguments added to it. In original format, th configuration has the following line:

{: .code-box}
```
exec.args=-classpath %classpath net.runelite.cache.Cache
```

If you want to _Run_ the cache tool directly in Netbeans you need to add additional arguments. For example, to dump items you can use the following arguments:

{: .code-box}
```
exec.args=-classpath %classpath net.runelite.cache.Cache -c C:\Users\ph01l\jagexcache\oldschool\LIVE -items C:\Users\ph01l\Desktop\items
```

## Extracting OSRS Cache Version using Runelite

The previous section discussed extracting information from the OSRS cache. Sometimes it is also highly useful to determine the OSRS cache version that you are working with. This section outlines methods to extract the cache version on both Windows and Linux operating systems. Both tools are based on the [RuneLite cache updater](https://github.com/runelite/updater/blob/master/src/main/bash/update.sh), and adapted to only extract the cache version number.

To provide some context and further information, both Windows and Linux scripts work in the same way. The script will download the latest OSRS cache version, the same way that any OSRS client would. The RuneLite deobfuscator tool will then be executed against the downloaded `.jar` client and the version number extracted. 

The script has two dependencies: 1) The RuneLite Deobfuscator tool; and 2) Java. You can compile your own version of the deobfuscator (by using the documentation above), or download a precompile version of the deobfuscator tool from [here](http://osrsbox.com/osrsbox-cache/cache-1.2.9-SNAPSHOT-jar-with-dependencies.jar). Make sure the PowerShell script (`osrs_cache_version.ps1`) and the deobfuscator tool (`deob-1.2.9-SNAPSHOT-jar-with-dependencies.jar`) are in the same directory. Also, make sure you navigate to the correct directory in your terminal.

The following two sections outline how to determine the OSRS cache version using the two scripts available.

### Extract the Current OSRS Cache Version (Windows Powershell)

A simple [PowerShell script](http://osrsbox.com/osrsbox-cache/osrs_cache_version/osrs_cache_version.ps1) is provided to download the lastest OSRS cache and determine the current version number. To run this script, you must allow scripts to be run in PowerShell. This is disabled by default for security reasons. To enable scripts to be run for a temporary session, execute the following command:

{: .code-box}
```
powershell –ExecutionPolicy Bypass 
```

Invoke the script using the following command:

{: .code-box}
```
./osrs_cache_version.ps1
```

The output from the script will be similar to that displayed below. The second to last line of the script output will display the current OSRS cache version.

{: .code-box}
```
PS C:\Users\phoil\Desktop> .\osrs_version.ps1
>>> Starting...
  > Downloading: jav_config.ws
  > Base URL used: http://oldschool90.runescape.com/
  > Initial JAR file for download: gamepack_3732011.jar
  > Downloading: http://oldschool90.runescape.com/gamepack_3732011.jar
  > Download successful
  > OSRS cache version: 160
>>> Finished.
```

### Extract the Current OSRS Cache Version (Linx BASH)

A simple [BASH script](http://osrsbox.com/osrsbox-cache/osrs_cache_version/osrs_cache_version.sh) is provided to download the lastest OSRS cache and determine the current version number. Invoke the script using the following command:

{: .code-box}
```
./osrs_cache_version.sh
```

The output from the script will be similar to that displayed below. The second to last line of the script output will display the current OSRS cache version.

{: .code-box}
```
>>> Starting...
  > Downloading: jav_config.ws
  > Download sucessful.
  > Base URL used: http://oldschool90.runescape.com/
  > Initial JAR file for download: gamepack_8851460.jar
  > Downloading: http://oldschool90.runescape.com/gamepack_8851460.jar
  > Download sucessful.
  > OSRS version: 160
>>> Finished.
```