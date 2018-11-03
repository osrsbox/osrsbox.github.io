---
layout: post
title: "OSRSBox | Blog | Writing RuneLite Pulgins - Part 2 - General Structure of RuneLite Plugins"
name: "Writing RuneLite Pulgins - Part 2"
desc: "General Structure of RuneLite Plugins"
tags:
- Plugin
- RuneLite
add_to_popular_list: true
thumbnail: runelite-coding.png
---

My last post started the series of my journey developing plugins for the popular open source Old School RuneScape (OSRS) client RuneLite. In that post I covered the first step in developing RuneLite plugins - [Setting up the RuneLite Development Environment]( {% post_url 2018-07-26-osrs-cache-research-extract-cache-definitions %}). Please have a look over that post if you are interested in seeing how I setup the IntelliJ IDE, the Java Development Kit and configured RuneLite for building locally.

In this post, we continue the journey. This time we are going to discuss the various components that can be used to create RuneLite plugins. Luckily for us, the RuneLite developers have an excellent plugin system - and lots of the hassle of creating plugins is relieved by using the functionality already provided in the RuneLite client. For example, you can create a configuration panel menu for any plugin using a really simple structure with lots of other plugins to use as code examples and inspiration.

This post conveys the basics of the structure of RuneLite plugins. I couldn't find much documentation on this subject, and really needed some of this information when I started out writing plugins. This will be a very generalized post, and we will get into deeper specifics in future posts where we target each aspect of RuneLite plugin development.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## RuneLite Project Location

Since we setup the RuneLite development environment in the last post, we are ready to get straight into beginning plugin development. But first, we do need some understanding on how RuneLite is structured. The first thing, finding our way in the RuneLite project source code. So, to start it would be prudent to provide a summary of the project structure. Last post we downloaded the RuneLight project in the IntelliJ IDE. It is, by default, saved to the `IdeaProjects` folder in your home directory. In my Windows 10 system, my downloaded project is located in:

{% highlight plaintext %}
C:\Users\<username>\IdeaProjects\runelite
{% endhighlight %}

In the above path, you can replace `<username>` with the user on your system. In Linux systems the location will be different. An easy method to find the location of the project source code in the file system in to:

- Have the RuneLite project open in IntelliJ
- Right-click the `runelite-parent` project in the left panel named _Projects_
- Left-click the _Copy Path_ option from the context menu
- Paste this somewhere (e.g., Notepad) to see the location of the project source code in the file system

## RuneLite Project Structure

The RuneLite project has numerous sub-projects that are not specifically related to the client - although most provide _services_ or _functionality_ to help build the client or provide resources for it. Inside the RuneLite project repository, the key directory for the actual client (the software that allows us to play OSRS) is located in:

{% highlight plaintext %}
runelite\runelite-client\
{% endhighlight %}

Furthermore, with the `runelite-client` the actual location of the bulk of the code for the client is located in:

{% highlight plaintext %}
runelite\runelite-client\src\main\java\net\runelite\client\
{% endhighlight %}

Inside this folder you will see a variety of subfolders which handle different aspects of the client. Where examples are `config`, `ui` and `account` - all of which are self-explanatory by the naming conventions. This post will not go into detail about other aspects of the client source code and will instead focus on plugin development. All the source code for every plugin is located in:

{% highlight plaintext %}
runelite\runelite-client\src\main\java\net\runelite\client\plugins\
{% endhighlight %}

To start, I would recommend browsing through this folder and having a quick review of the content. The next section discusses the fundamentals of the plugin system in RuneLite, and viewing examples of plugins while reading can be greatly beneficial.

## RuneLite Plugin Fundamentals

So we know where the RuneLite source code is in the file system, a high-level overview of the RuneLite project structure and knowledge of the currently available plugins and where they reside (the source code) in the project. When I got to this point, I really needed further information on how the plugin system worked and had to review the code of other plugins to see how it all worked. This was a great learning experience, and I recommend doing the same. But hopefully a summary of the fundamental plugin architecture and design will help others.

First thing first... There is a folder for every plugin and all source code for a plugin should reside in it's own folder. For example, the _Hiscore_ plugin has its own individual folder located at:

{% highlight plaintext %}
runelite\runelite-client\src\main\java\net\runelite\client\plugins\hiscore\
{% endhighlight %}

Inside this `hiscore` folder is the various source code files that the plugin uses. The naming convention for plugin folder are lowercase with no spaces. So if we made a new plugin named _Prayer Detector_, the folder should be named `prayerdetector`. The following discussion uses the same example of a fictitious plugin named _Prayer Detector_.

The RuneLite plugin system is broadly made up of the following four primary components. 

- Config
- Panel
- Plugin
- Overlay

Technically, these are Java files (`.java`) that contain the source code to power a RuneLite plugin. Say, for example, say we are making a new plugin called _Prayer Detector_, we could have the following files in our folder named `prayerdetector`:

- `PrayerDetectorConfig.java`
- `PrayerDetectorPanel.java`
- `PrayerDetectorPlugin.java`
- `PrayerDetectorOverlay.java`

Hold on there! We do not actually need all four, we only need all four if we want to actually use the functionality provided by each. This brings us to an important topic - _what is the purpose of each file?_ The following sections provide a brief summary of the _general purpose_ of each of the files. Remember, this is not set in stone - rather, from the review of other plugins, there is a consensus to adhere to the standardized plugin structure.

#### Config

The config system provides RuneLite developers the ability to make complex configuration menus for their plugins with very little effort. These configuration menus are viewable by left-clicking the _wrench_ icon located in the top right corner of the RuneLite client. When you open the menu, you will see the configuration options for all RuneLite plugins.

{% include figure.html path="blog/runelite-part2/config-menu.png" alt="List of configuration menus for RuneLite plugins" %}

As seen in the image above, and by experience you most likely have with RuneLite, each plugin can be turned on and off by using the slider toggle (color = orange, when enabled). Furthermore, there is commonly further configuration options that can be tweaked by the end-user, accessible using the cog icon for each listed plugin. Take the example of the Agility plugin, show in the image below.

{% include figure.html path="blog/runelite-part2/config-menu-example.png" alt="Example of the Agility plugin configuration menu" %}

It is usual that every plugin has an entry in the configuration menu, and most have additional configuration options. For example, the Agility plugin configuration (as displayed about) has the ability to change the colors of the click-boxes for agility obstacles, on/off value for the agility lap counter interface overlay and an on/off toggle for highlighting Marks of grace on rooftop agility courses.

#### Overlay

The overlay system is exactly what it sounds like - it provides the ability to create a variety of different _overlays_ that sit on top of the RuneScape client. That is, it puts graphics on top of the normal client. There are  already a large number of plugins which provide different overlays. I have broadly categorized them into two categories: 

- **Interface overlays:** These are overlays that provide enhanced interfaces - they are somewhat like widgets. Examples include: Enemy summary (hitpoints, name), Combat style (aggresive, controlled, defensive), Consumables (potion effects). The image below illustrate three interface overlays: skill boosts, slayer task icon and count, and the currently active combat style:

{% include figure.html path="blog/runelite-part2/interface-overlays.png" alt="Example of the RuneLite overlay system using the Stats, Slayer and Combat Style plugins" %}

- **Environment overlays:** These are overlays that provide additional information or enhancement of the game environment. Examples include: Ground items highlighter (shows information about items on the ground), Clue scroll helpers and Agility obstacle highlighters. The images below illustrates two environment overlays: agility obstacle click-box highlighter and the ground items highlighter.

{% include figure.html path="blog/runelite-part2/environment-overlays.png" alt="Example of the RuneLite environment overlays showing the Agility obstacle highlighter and Ground items highlighter" %}

#### Panel

The panel system is a powerful feature in RuneLite for displaying rich information. The panel system provides the ability to put information in a side-panel in the RuneLite client. Below is an example of the RuneLite panel as used by the Hiscores plugin.

{% include figure.html path="blog/runelite-part2/runelite-panel.png" alt="Example of the RuneLite panel system using the Hiscore plugin" %}

As seen in the Hiscore plugin above, the panel is used to display the hiscores of a specific player. Imagine if we tried to place this information as an overlay on the actual client - absolute chaos! There is too much information to fit on the game screen. However, you could have a similar plugin which would display a slimmed down version of the hiscores as an overlay; for example, the combat stats of an enemy player.

#### Plugin

Last, but definitely not least, is the RuneLite plugin file. This file is the _brains_ of most RuneLite plugins. The plugin file will contain the logic of the actual plugin and is executed when specific in-games events are encountered. The plugin file commonly has two functions specified that are called when a plugin is enabled and disabled:

- `startUp`: This function is executed when the plugin is loaded
- `shutDown`: This function is executed when the plugin is stopped

In addition to these two, there are also many events that can also be triggered by some type of action performed, or event that has taken place. A full list of game events can be viewed in the [RuneLite API](https://static.runelite.net/api/runelite-api/net/runelite/api/events/package-summary.html). Some examples include:

- `ChatMessage`: An event where a new chat message is received
- `GameTick`: An event called once every game tick, after all packets have processed
- `MenuEntryAdded`: An event when a new entry is added to a right-click menu
- `MenuOptionClicked`: An event where a menu option has been clicked
- `ConfigChanged`: An event where a configuration entry has been modified

The events listed above are only a very small selection. These events can be added to the plugin source code file to listen for specific events, then perform some type of action. 

## Conclusion

This post provided a high-level overview of the RuneLite plugin system, and looked at the four primary components to developing a RuneLite plugin: 1) Config, 2) Overlay, 3) Panel, and 4) Plugin. In the next few posts we will investigate each of these components while writing an actual plugin. This will include various code snippets to help other new RuneLite plugin developers.

I hope this post helped you begin the RuneLite plugin development process. The next post in this series will discuss how to create a configuration menu for a RuneLite plugin and will provide code for each of the different configuration menu items that are supported.

As always, please feel free to post a comment below if you have any feedback or notice and errors in this post. Thanks!