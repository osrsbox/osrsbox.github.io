---
layout: post
title: "OSRSBox | Blog | Data is Beautiful: Analysis of Bank Standing Equipment"
name: "Data is Beautiful: Analysis of Bank Standing Equipment"
desc: "An analysis of 20,000 players and their bank standing equipment"
tags:
- Data
add_to_popular_list: true
thumbnail: dib.png
---

This post discusses an analysis of the equipment of 20,000 Old School RuneScape players who were bank standing at the [Grand Exchange](http://oldschoolrunescape.wikia.com/wiki/Grand_Exchange). If you are interested in the method used to gather and analyze this data, check out my post entitled [Watercooler: Player Scraper - A RuneLite Plugin to Dump Player Equipment]({% post_url 2018-12-24-watercooler-analysis-of-bank-standing-equipment %}). The data analysis was performed and a short and sweet infographic produced that summarized some of the interesting findings.

{% include figure_lightbox.html path="blog/bank-standing/bank-standing-infographic.png" alt="Bank Standing Infographic - An analysis of 20,000 players and their bank standing equipment." %}

The infographic really speaks for itself. It outlines a collection of interesting information such as the most common items, a summary of equipped item wealth and most common equipment in each item slot. However, if you want to read more about the analyzed data and the analysis results please read on!

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Data Set Summary

It is probably important to start with a summary of the data that was collected and analyzed. As I have mentioned, the **data set includes the equipment items worn by exactly 20,000 Old School RuneScape bank standers at the Grand Exchange**. The players were analyzed from a variety of different sources including:

1. **World type:** Free to play and Members worlds
1. **World location:** British, Germany, American and Australian worlds
1. **World restriction:** All restricted worlds used (apart from 2200 worlds... still a pleb in 2018)

### Equipment Slots Available

The dataset only includes specific equipment slots - this is due to a limitation of the RuneLite client being unable to process certain equipment slots. I am unsure exactly why this is the case - but have an idea that equipment slots that are not visible in-game are also not available. The unavailable equipment slots are: 

1. Ammunition
1. Ring

Nevertheless, all other equipment slots are available including:

1. Amulet 
1. Boots 
1. Cape 
1. Hands 
1. Head 
1. Legs 
1. Shield 
1. Torso 
1. Weapon

Please note that the naming convention outlined above is taken directly from the [RuneLite KitType enumerator](https://static.runelite.net/api/runelite-api/net/runelite/api/kit/KitType.html), and these naming conventions are used throughout this post.

### Player Combat Summary

Player combat level was something that I was really interested in when analyzing the data. The graph below shows the distribution of the player combat level of the 20,000 players analyzed. Basically, the graph shows the count of the number of players at each combat level.

{% include figure_lightbox.html path="blog/bank-standing/player-combat-distribution.png" alt="Bank Standing Stats - Bar graph showing the distribution of players combat levels." %}

As you can see, the data set has a variety of players with varying combat levels. There is an overall trend seen with the gradual increase in the count of players at each combat level. However, once you reach around combat level 120 or so, there is a great increase in the player count for each of these levels. This is probably caused by a large number of _dedicated_ (!) players that have max, or nearly max, combat stats. In addition, there is a large number of level 3 combat accounts, which are most likely bots, or maybe pure skillers!

## Analysis of Player Items

One of the most interesting stats I wanted to look at in the data set was the most popular items that were worn in each equipment slot. Some were surprising, some not so surprising. If you took the most commonly occurring items from each equipment slot, your bank standing character would look like the flashy guy below...

{% include figure.html path="blog/bank-standing/most-common-per-slot-3d.png" alt="Your average bank stander!" %}

Pictures are great... but what about the stats! I analyzed the data further and determined the most common five (5) items for each equipment slot. The results included in the tables below provide the item name, the inventory icon of the item, the total count of time that the item was witnessed and finally, a percentage that the item was witnessed out of the 20,000 players analyzed.

#### Head slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Graceful hood | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11850.png"> | 1342 | 6.71
Helm of neitiznot | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/10828.png"> | 735 | 3.675
Slayer helmet (i) | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11865.png"> | 636 | 3.18
Rune full helm | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1163.png"> | 345 | 1.725
Snakeskin bandana | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/6326.png"> | 336 | 1.68

#### Cape slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Ava's accumulator | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/10499.png"> | 1834 | 9.17
Fire cape | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/6570.png"> | 1444 | 7.22
Graceful cape | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11852.png"> | 1254 | 6.27
Obsidian cape | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/6568.png"> | 892 | 4.46
Ava's assembler | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/22109.png"> | 315 | 1.575

#### Amulet slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Amulet of fury | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/6585.png"> | 2109 | 10.545
Amulet of glory(3) | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1710.png"> | 636 | 3.18
Amulet of glory(4) | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1712.png"> | 617 | 3.085
Amulet of glory | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1704.png"> | 613 | 3.065
Amulet of torture | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/19553.png"> | 606 | 3.03

#### Weapon slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Staff of fire | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1387.png"> | 1439 | 7.195
Abyssal whip | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/4151.png"> | 675 | 3.375
Toxic blowpipe | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/12926.png"> | 648 | 3.24
Rune crossbow | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/9185.png"> | 647 | 3.235
Rune scimitar | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1333.png"> | 521 | 2.605

#### Torso slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Graceful top | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11854.png"> | 1363 | 6.815
Black d'hide body | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/2503.png"> | 875 | 4.375
Fighter torso | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/10551.png"> | 415 | 2.075
Bandos chestplate | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11832.png"> | 397 | 1.985
Void knight top | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/8839.png"> | 362 | 1.81

#### Shield slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Dragon defender | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/12954.png"> | 1389 | 6.945
Anti-dragon shield | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1540.png"> | 508 | 2.54
Unholy book | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/3842.png"> | 414 | 2.07
Rune kiteshield | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1201.png"> | 382 | 1.91
Tome of fire | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/20714.png"> | 261 | 1.305

#### Legs slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Graceful legs | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11856.png"> | 1413 | 7.065
Black d'hide chaps | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/2497.png"> | 1171 | 5.855
Dragon platelegs | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/4087.png"> | 486 | 2.43
Rune platelegs | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1079.png"> | 485 | 2.425
Bandos tassets | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11834.png"> | 474 | 2.37

#### Hands slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Barrows gloves | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/7462.png"> | 1795 | 8.975
Graceful gloves | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11858.png"> | 1306 | 6.53
Void knight gloves | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/8842.png"> | 582 | 2.91
Black d'hide vamb | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/2491.png"> | 422 | 2.11
Bracelet of ethereum | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/21816.png"> | 373 | 1.865
 
#### Boots slot

{: .table .table-striped .table-sm}
| Item | Image | Count | Percentage |
|---|---|---|---|
Dragon boots | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11840.png"> | 1534 | 7.67
Graceful boots | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/11860.png"> | 1157 | 5.785
Snakeskin boots | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/6328.png"> | 909 | 4.545
Leather boots | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/1061.png"> | 724 | 3.62
Boots of lightness | <img class="" src="https://www.osrsbox.com/osrsbox-db/items-icons/88.png"> | 680 | 3.4

## Analysis of Item Wealth

Another aspect of the data that was interesting was how much wealth was witnessed in the 20,000 players. When adding together all of the items for each player and performing an item Grand Exchange price lookup using the OSBuddy GE prices, there was a grand total wealth of 228,028,700,715 gold coins! That's over 228 billion gold coins. However, this does not include any un-tradeable items, as they have no GE price.

{% include figure.html path="blog/bank-standing/228B.png" alt="228 billion gold coins!" %}

If you divide the total wealth by the number of players analyzed, each player had an average wealth of 11,401,435... That's almost 11 million gold coins of item wealth per player! Alas! The truth is not such a beautiful fairytale... If you take the top 1% of all players (that is 200 players), they have an approximate total wealth of 110 billion. That is just less than 50% of the complete wealth of 20,000 players! 

Based on the current OSBuddy GE prices, the **top 5 wealthies players** were:

- 1,580,444,639
- 1,566,425,202
- 1,486,098,999
- 1,335,330,088
- 1,288,094,434

The major stats regarding item wealth are listed below:

1. **Total player item wealth:** 228 billion
1. **Top 200 players item wealth:** 110 billion
1. **Average player wealth:** 11 million

## Conclusion

Writing this post was a pretty fun journey for me... I hope that you found it an interesting and informative read. If there is something you think I should have included in my analysis, please leave me a comment below - I am happy to look further into the data. Also, please feel free to ask any questions if you have them. 

It might be interesting to perform this same analysis in a year or two, to see how the economy or player base has changed. It might also be interesting to perform a similar analysis but in a different environment. For example, analysis of slayer equipment. Of course, it would be difficult to get the same amount of data (players). Until next time, happy scaping everyone!
