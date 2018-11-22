---
layout: post
title: "OSRSBox | Blog | OpenRS Tutorial - Compiling and Using the OpenRS Cache Tools"
name: "OpenRS Tutorial - Compiling and Using the OpenRS Cache Tools"
desc: "Detailed guide on how to compile and use the tools from the OpenRS Project"
tags:
- OpenRS
- Cache
- 3D Models
- Sprites
add_to_popular_list: false
thumbnail: osrs-coding.png
---

This post outlines instructions for building (compiling) the _open source_ OpenRS project that has the functionality to parse the OSRS cache. Bundled with the project are a selection of useful tools to parse the cache and extract interesting data about items, NPCs, and objects, as well as extracting other things like music tracks, sprites (in-game images) and maps.

_Disclaimer_: One caveat, the data extracted from the cache including art assets and music are (of course) proprietary and owned by Jagex - **this post and the documented information is purely an educational exercise**. Please do not use this information for nefarious purposes, and treat OSRS content with the love and respect it deserves!

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## The OpenRS Project

The original [OpenRS Project](https://github.com/kfricilone/OpenRS) dates back to around 2011 (according to the project license). The version used in this tutorial is hosted on GitHub by a user named [kfricilone](https://github.com/kfricilone) who took the original version of OpenRS and modified it to work with the OSRS cache structure. 

The following section documents how to build (compile) the OpenRS project using IntelliJ in a Windows 10 environment. The final section provides a summary of the tools available and how to use them.

## Building OpenRS using IntelliJ

I used IntelliJ on a Windows 10 system to build OpenRS. If you have dabbled with Java and/or IntelliJ in the past, this process is pretty straight-forward. However, if you have not... the setup has some essential tweaks. I will not cover the installation of IntelliJ or the Java Development Kit (JDK) in this post. I have written about the same setup in another post entitled [Writing RuneLite Plugins - Setting up the Development Environment]({% post_url 2018-08-10-writing-runelite-plugins-part-1-building %}). Have a look at that post if you want a tutorial on how to install IntelliJ and the JDK. This section will continue, under the impression that you have IntelliJ and the JDK installed.

When you start IntelliJ you will be presented with the normal _Welcome Screen_. A good option here is to download the OpenRS project using git. This is easily achieved using the _Check out from Version Control_ and then select _Git_ from the drop-down menu.

{% include figure.html path="blog/openrs-tutorial/openrs-1-intellij-welcome.png" alt="IntelliJ IDEA Welcome Screen" %}

You will be presented with a _Clone Repository_ dialog box where you can enter the URL of the OpenRS Git repository. The URL required is:

{% highlight plaintext %}
https://github.com/kfricilone/OpenRS.git
{% endhighlight %}

You simply need to enter the provided URL into the `URL` box. Make sure you take note of the `Directory` value. This is where the project will be downloaded to - in my case, I am saving the OpenRS source code to the `OpenRS` folder on my Desktop. When you are happy to proceed, click the _Clone_ button.

{% include figure.html path="blog/openrs-tutorial/openrs-2-intellij-git-checkout.png" alt="IntelliJ IDEA Clone OpenRS Git Repository" %}

A dialog box will appear and inform you that you have checkout out an IntelliJ IDEA project, and ask you: _Would you like to open it?_ Select _Yes_. At this point you may be presented with an error referring to an unknown JDK - this may occur if you have a different version of the JDK installed than what the original project was configured for. Just click _OK_ and we will fix this later.

{% include figure.html path="blog/openrs-tutorial/openrs-3-eclipse-jdk-import-error.png" alt="Import from Eclipse error message about unknown JDK" %}

After opening the OpenRS project, make sure you select to _Import Gradle project_ which will be displayed in the bottom right of the IntelliJ IDE. By selecting this, it imports the Gradle configuration from the OpenRS project, making it easier to set up the project for building and running the code.

{% include figure.html path="blog/openrs-tutorial/openrs-5-unlinked-gradle-project.png" alt="Dialog box about unlinked Grade project" %}

Next, we are going to add a new configuration so that we can build the project. Start by navigating to the _Run_ option from the top menu bar, then select _Edit Configurations..._. You will be presented with a new dialog box. Click on the plus icon (`+`) in the top left corner, then select _Gradle_. We have chosen a Gradle build, that we still need to configure. 

{% include figure.html path="blog/openrs-tutorial/openrs-6-gradle-configuration-add.png" alt="Adding a new Build configuration for OpenRS" %}

Add a descriptive name for your configuration and enter it in the _Name_ box. I choose to use the name _Build_. Also, make sure the add the _Gradle project_ location. Click on the box with the three dots (`...`) and select _OpenRS_. Your configuration should look like the screenshot below. Make sure you save the changes by clicking the _Apply_ button.

{% include figure.html path="blog/openrs-tutorial/openrs-7-gradle_configuration-options.png" alt="Configuring the new Grade Build configuration" %}

If you examine the taskbar at the top of IntelliJ you should see the quick menu for configurations. It will look like the screenshot below. Make sure _Build_ is selected from the menu, then click the green arrow. Alternatively, you can use the _Build_ or _Run_ menus from the top menu bar.

{% include figure.html path="blog/openrs-tutorial/openrs-8-build-openrs-icon.png" alt="Building the OpenRS project" %}

## Adding the OSRS Cache

If you finished compiling OpenRS and skipped ahead you may have run into issues when you first run any of the cache parsing tools. Without adding the OSRS cache to the correct directory, you will most likely get the following error:

{% include figure.html path="blog/openrs-tutorial/openrs-11-no-cache-error.png" alt="Error message when no cache files are present in the OpenRS repository folder" %}

This error refers to the inability for the OpenRS tools to find the OSRS cache. We must manually add the OSRS cache files into the correct directory that the OpenRS tools look for (it does not look in the logged in users home directory like some other tools). OpenRS wants the cache files in the following location:

{% highlight plaintext %}
repository/cache
{% endhighlight %}

To provide context, I git cloned OpenRS to my desktop folder. So, the absolute (complete) path I need to copy the OSRS cache files is:

{% highlight plaintext %}
C:\Users\phoil\Desktop\OpenRS\repository\cache\
{% endhighlight %}

So, what are the files that need to be copied to the specified folder? You will find your OSRS cache in the following location on your Windows system:

{% highlight plaintext %}
C:\Users\<username>\jagexcache\oldschool\LIVE\
{% endhighlight %}

There will be a collection of approximately 22 files that need to be copied. All files have a file name starting with `main_file_cache`. You need to copy the actual files (not the directory) into the `repository/cache` folder to make them available for OpenRS. Make sure you copy (not cut!) the files so that you do not break you current OSRS install. If you do not have these files, I would recommend downloading the official OSRS client and running it to generate these files. You could use RuneLite as well if you want. There are also a number of cache downloading tools, but none I have thoroughly tested or recommend.

Once you have the cache in the correct location, you can actually run the tools provided in the OpenRS project.

## OpenRS Tools

Once OpenRS is built and the cache is added to the correct directory, we can run a variety of tools that are included with the project. All tools are available in the following location:

{% highlight plaintext %}
source/net.openrs/cache/tools
{% endhighlight %}

You can expand the folders in the project pane in IntelliJ to navigate to the location tools folder. Within this folder, you will see a collection of tools. See the screenshot below for a visual example.

{% include figure.html path="blog/openrs-tutorial/openrs-9-openrs-tools.png" alt="IntelliJ project pane highlighting OpenRS tools" %}

You can easily run any of these tools by right-clicking the desired file and selecting the _Run_ option. For example, right-click the `ModelDumper` tool, then from the context-menu select _Run ModelDumper.main()_. Any tool/Java file with a little green arrow on the icon can be run like this. 

{% include figure.html path="blog/openrs-tutorial/openrs-10-run-model-dumper.png" alt="Example image of running the ModelDumper tool" %}

Once you have run a specific tool once, a new _configuration_ will be added. If a specific tool requires a program argument, you can edit the configuration, and add values into the program arguments box. However, most of the OpenRS tools do not have any program argument requirements. 

The following subsections briefly discuss the different tools and what data they extract along with examples when useful.

### Extracting Models

Listed below are the tools available for extracting 3D models from the OSRS cache:

- `ModelDumper`: Dump every model including objects, items, and NPCs
- `ObjectModelDumper`: Dump only models that are for objects (e.g., rock, ladder)
- `ItemModelDumper`: Dump only models that are for items (e.g., pickaxe, whip)
- `NpcModelDumper`: Dump only models that are for NPCs (e.g., Romeo, Chicken)

In IntelliJ run the `ModelDumper` tool, or any of the 4 model dumping tools - depending on what models you are wanting to extract. I would recommend only extracting the specific model category you are interested in (FYI - there is no option in the tool to extract specific model ID numbers). When I extracted the models I tested all 4 of the model dumping tools. The final results are presented below which include the number of models in each category and the size (actual size is listed, not size on disk which will vary depending on your file system cluster size):

- **all**: 36,000 at 67MB
- **items**: 7,300 at 11MB
- **npcs**: 5,700 at 14MB
- **objects**: 18,500 at 35MB

The model dumping tools will all extract the models to the following base directory

{% highlight plaintext %}
repository/models
{% endhighlight %}

To provide context, based on my OpenRS location, my models were dumped into the following folder:

{% highlight plaintext %}
C:\Users\phoil\Desktop\OpenRS\repository\models\
{% endhighlight %}

Depending on the specific tool you run, a sub-folder will be created for all models extracted by the specific tool used, as documented below:

- `ModelDumper`: Dump models in the `repository/models/all` folder
- `ObjectModelDumper`: Dump models in the `repository/models/objects` folder
- `ItemModelDumper`: Dump models in the `repository/models/items` folder
- `NpcModelDumper`: Dump models in the `repository/models/npcs` folder

Below is a visual example of the models I dumped using the `ModelDumper` tool, as displayed in Windows Explorer.

{% include figure.html path="blog/openrs-tutorial/openrs-12-extracted-dat-model-files.png" alt="Example of files dumped from the ModelDumper tool" %}

Please note that these models are currently very limited in terms of opening them in other tools (e.g., Blender) - as they are stored in a proprietary file format. There are many tools available to convert the `.dat` files, but none that I highly recommend. Most are closed source and many I tested were riddled with bugs and model conversion failed for a high number of the models. 

### Extracting Game Sprites

Another interesting tool is the `SpriteDumper`, which automatically dumps all the sprites (images) from the cache. The sprites are various images which are used by the client which include icons for prayers, spells and weapon styles, as well as images used for the minimap border and similar client graphics. The image below provides an example of the files saved, which are all exported in PNG format and have a default purple background.

{% include figure.html path="blog/openrs-tutorial/openrs-13-extracted-sprites.png" alt="Example of files dumped from the SpriteDumper tool" %}

### Extracting Definition Information

One of the tools provided in OpenRS took me a little by surprise. The `TypeDumper` tool is really powerful and outputs some really useful information. Many data points in the OSRS cache are _definition_ structures, which hold information about items, NPCs, objects, animations and a plethora of other data required to make OSRS tick. I have discussed the ItemDefinition before in a previous post, but the summary of data from this structure is the item name, ID number, model ID, and other metadata about the item. For example: Is it a members item? Is the item equipable? And so on. Many cache parsing tools dump definition information, but the `TypeDumper` tools dump this information for multiple types at the same time - similar to a batch processing mode. The listing below displays the output files from the tool which provides an idea of what stuff it dumps.

{% highlight plaintext %}
areas.txt
enums.txt
hitbars.txt
hitmarks.txt
idenkits.txt
invs.txt
items.txt
npcs.txt
objects.txt
overlays.txt
params.txt
sequences.txt
spotanims.txt
structs.txt
underlays.txt
varbits.txt
varclients.txt
varclientstrings.txt
varplayers.txt
{% endhighlight %}

### Extracting Music Tracks

Another interesting tool is the `TrackDumper` which extracts OSRS music tracks to the `.midi` file format. I tried out the tool to get an idea of what it did, and the extracted `.midi` files were playable in Windows Media Player (which, I guess, has midi file support). Don't judge me too quickly, I did try VLC media player first (which must not have support for the midi file format in a default install). Below is a summary of the track count and size (actual size is listed, not size on disk which will vary depending on your file system cluster size).

- **track1**: 623 tracks at 23.7MB
- **track2**: 276 tracks at 1.02MB

After performing some research about the music in OSRS, I was very surprised to see that all of the OSRS music tracks are available on the OSRS Wiki. The old OSRS Wikia site has a category called [Music tracks](http://oldschoolrunescape.wikia.com/wiki/Category:Music_tracks) which has the music available for playback and download in the `.ogg` file format. Also, the new OSRS Wiki sites have the same music tracks available on the [Music](https://oldschool.runescape.wiki/w/Music) page. So there is probably not much use for this tool anymore. However, I recommend that you support JaGeX and the OSRS developers by buying the _Runescape: Original Soundtrack Classics_ on [iTunes](https://itunes.apple.com/gb/album/runescape-original-soundtrack-classics/1434564131?app=itunes) or [Amazon](https://www.amazon.co.uk/RuneScape-Original-Soundtrack-Ian-Taylor/dp/B07GXXZ23R/ref=sr_1_1?s=dmusic&ie=UTF8&qid=1536913405&sr=1-1-mp3-albums-bar-strip-0&keywords=RuneScape%3A+Original+Soundtrack+Classics&tag=smarturl-gb-21).

## Conclusion

After trying out the OpenRS project and the suite of tools provided, I was impressed by the simplicity of the tools which we predominantly automated and required no configuration. There are a lot of cache tools which perform similar tasks, but most are distributed as executables (`.exe` or `.jar` files) which are difficult to extend or debug, and also somewhat untrustworthy (as the contents/actions are difficult to verify). The open source OpenRS project does not have this problem, with all the source code available on the GitHub repository. If you want to investigate the OSRS cache it is a great starting point. Hope you enjoyed the post, and, as always... happy scaping!
