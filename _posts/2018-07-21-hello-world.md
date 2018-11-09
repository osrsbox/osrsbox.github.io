---
layout: post
title: "OSRSBox | Blog | Hello World!"
name: "Hello World!"
desc: "Welcome to the OSRSBox Blog!"
tags:
- Blog
add_to_popular_list: false
include_tooltips: true
thumbnail: hello-world.png
---

Greetings everyone! This is the first blog post for the OSRSBox website. The OSRSBox project is something that I have been working on for a long time. I initially released this website in a ridiculously half-finished state and continued working on some of the tools and projects. I have now tidied all the projects, tools and code to result in a (hopefully!) polished final product. 

Currently, I have a collection of different projects and online tools that are related to OSRS. A very brief summary is provided below, with links to the actual pages on this site describing each in more detail. However, there is always more to do! And I have a variety of tools and projects that I am currently working on.

### OSRSBox Database

The [OSRSBox Item Database project](/projects/osrsbox-db/), or osrsbox-db for short is a database of Old School Runescape (OSRS) items in JSON format with accompanying icon images in PNG format. A database is probably a bad name, as it not technically a database... rather it is a RESTful API. I named its database, as it provides a good indication of what it does, and people who are not die-hard computer geeks probably don't know what a RESTful API is.

Basically, osrsbox-db stores information about OSRS items in individual files in JSON format. For example, [this link](https://www.osrsbox.com/osrsbox-db/items-json/12453.json) provides direct access to the `12453.json` file, which holds metadata about the Black wizard hat (g) item. In OSRS, the ID number `12453` is unique to the Black wizard hat (g). This is why the item ID is utilized in the database for fetching all item information.

### OSRSBox Tooltips

The [OSRSBox ToolTips project](/projects/osrsbox-tooltips/), or osrsbox-tooltips for short is the primary reason I created the OSRSBox Item Database project. The idea originally came from World of Warcraft (WOW) tooltips - primarily the [WOWhead tooltips](http://www.wowhead.com/tooltips) that are used on the WOWhead website and other WOW fan sites. You can see a more thorough working demo of WOWhead tooltips [here](http://wow.zamimg.com/widgets/power/demo.html).

There was no project like this for OSRS and I thought it might be pretty cool to have tooltips for OSRS items. The tooltips are populated with content by querying the osrsbox-db and dynamically generating the tooltip information. For example, check out the lovely <span class="osrstooltip" id='21021' title='Please wait ...'>[Ancestral robe top]</span> and their stats!

### Fight Caves Spawn Predictor

The [Fight Caves Spawn Predictor](/tools/fight-caves/) was the first tool I wrote for OSRS. The Fight Caves spawn predictor will map the entire fight caves mob rotation - when and where each and every mob spawn. Simply input the location of the first two/three waves of the fight caves and you will get a full, interactive map of your future fight caves experience. 

Watch out for my next blog post on the background information and process I went through to write my first OSRS tool: the Fight Caves Spawn Predictor. Please feel free to add comments if you have anything to share or have any feedback on any of my tools or projects. Thanks!