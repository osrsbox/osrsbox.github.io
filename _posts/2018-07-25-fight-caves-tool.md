---
layout: post
title: "OSRSBox | Blog | Writing a Fight Caves Spawn Predictor"
name: "Writing a Fight Caves Spawn Predictor"
desc: "Visually map every mob in the Fight Caves, including Jad!"
tags:
- Tool
- Fight Caves
- Jad
add_to_popular_list: true
thumbnail: jad.png
---

This post documents the [Fight Caves Spawn Predictor]({{ site.url }}/tools/fight-caves/) tool I wrote for graphically mapping every monster spawn in the OSRS Fight Caves mini-game. An animated GIF is shown below that displays the map and basic use of the tool... Basically, enter the locations on the first 2-3 waves and you will get an interactive map of all mobs and spawn locations.

{% include figure.html path="blog/fight-caves/fight-caves-animation.gif" alt="Fight Caves Spawn Locations" class="mx-auto" %}

I never got a Firecape when I first played RuneScape 2. I quit around 2006 and, like many current veterans, had no idea what I was doing back in RuneScape 2. When I came back to OSRS around 2014, getting a firecape was my first goal in the game. Even with the release of the Infernal Cape, it is still a goal of many old school players. Recently I was doing some YouTube binging and found an interesting video by Giant Bully, entitled [Fight Caves - Predicting All Spawn Positions](https://www.youtube.com/watch?v=LG5hy9bfb_g). The video discussed the spawn locations of mobs in the Fight Caves mini-game, and revealed that they are a set pattern - based on 15 different rotations. Now, even the Old School RuneScape Wikia lists the 15 different [TzHaar Fight Cave Rotations](http://oldschoolrunescape.wikia.com/wiki/TzHaar_Fight_Cave/Rotations) which are displayed using static map images for each of the rotations.

One part of the video that I found really interesting was the code that Giant Bully linked, by the original founder of the Fight Caves rotation method - FwostyMage. Included in the video description was the original [program written in C](https://pastebin.com/vziVqdtR). Giant Bully also linked to an [online C compiler](https://www.tutorialspoint.com/compile_c_online.php) and where you can run the script online. I immediately did a Fight Caves run, entered in the first 2 waves of mob spawn locations and got back a complete list of where each mob would spawn on each wave. It was amazing! However, it was not exactly easy to read the text of the mob spawn locations. I mean, it wasn't that hard either - but I thought a visual graphical interface would be much nicer. So my idea for a web-based online Fight Caves spawn predictor and mapper was born! 

## Fight Caves Spawn Locations

The Fight Caves is a very old RuneScape mini-game. It was originally released in October, 2005 - so some of the mini-game design is relatively straight-forward. Monsters, or mobs, in the fight-caves can spawn in a total of 5 different locations - regardless of the mob type. The 5 different locations can be specified based on the compass location:

- Center
- North West
- South West
- South
- South East

Rather than tying to visualize the mob spawn locations in your mind, the following image displays the spawn locations.

{% include figure.html path="blog/fight-caves/spawn-locations.png" alt="Fight Caves Spawn Locations" class="mx-auto" %}

To enable mobs to spawn in these 5 specific spawn locations there must be some type of code that dictates how and where mobs are spawned. The game designer must have written an alrorithm to achieve this. Basically put, there must be some type of logic or set of rules that specify where mobs spawn. The player FwostyMage determined how this algorithm works. The image below displays a _spawn circle_ which covers the logic behind how the spawns work and what spawn rotation the algorithm uses.

{% include figure.html path="blog/fight-caves/spawn-circle.png" alt="Fight Caves Spawn Locations" %}

Instead of writing scrawls of pages describing the algorithm, I recommend watching the video by Giant Bully, entitled [Fight Caves - Predicting All Spawn Positions](https://www.youtube.com/watch?v=LG5hy9bfb_g). This video goes into exceptional depth about the spawn locations, spawn circle algorithm and explains very accurately how this works. The examples used in the video are very useful for understanding the basic principles.

## Writing a Fight Caves Spawn Predictor in JavaScript

When starting writing my Fight Caves Spawn Predictor tool, there were no graphical interface solutions to map the mob spawns. Rather there was a tool (written in C) that could output the spawn locations for every wave. There were also a few spreadsheets floating around the Internet that provided a break-down of all possible spawn rotations and documented every wave, the mobs and spawn locations.

I rewrote the original [C program](https://pastebin.com/vziVqdtR) in JavaScript - mainly so that the program could be used on a website. The full code is available from [fight-caves.js](https://www.osrsbox.com/tools/fight-caves/fight-caves.js). The actual code to determine the mob spawn locations is relatively short, and made up of a few functions and data structures. Below is a brief explaination, mainly provided for others who might want to utilize the code:

- `possible_spawns`: A dictionary of all the possible spawn locations for the first 2-3 waves of the Fight Caves. These are used to validate any user input, that is, check that the user has entered in the correct spawns to determine the full spawn rotation.
- `printspawn`: Prints the spawn location for the specified wave.
- `getspawn`: Determines the spawn location for a specific mob.
- `jadspawn`: Handles spawn location for Jad
- `printwave`: Called for each wave in the Fight Caves mini-game, which in-turn calls the `getspawn` function to determine mob locations.
- `determine_spawns`: The primary entry point for determining the mob spawn locations based on what the user input for the first 2-3 waves.

When writing this post and looking back over the code, some of the naming conventions and general structure is a little disorganized. Primarily the naming conventions used for functions and some variables and a little cryptic. I will try to rewrite these and do a general clean up in the future. I find using a bunch of `console.log()` to perform print statement debugging easily reveals what is happening at each stage.

In addition to the code used to predict mob spawn locations, there is JavaScript code to control the graphical mapping of the mob spawn locations. The primary functionality I added in was:

- Buttons for moving to the _Previous Wave_, _Current Wave_ and _Next Wave_
- Overhead prayer indicators for displaying what type of protection prayer to use including _Protect from Magic_ or _Protect from Ranged_
- A small text indication to display the current wave number

## Conclusion

I found this project exceptionally interesting to investigate and program. I use the tool regularly when doing Jad slayer tasks, as I find it can increase my speed by knowing the next wave before it spawns. Hopefully you will also find it useful. Please feel free to leave any comments or feedback below. Especially if you discovered any errors or bugs. Thanks... and happy scaping!
