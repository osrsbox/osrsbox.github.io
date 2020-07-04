---
layout: post
title: "OSRSBox | Blog | Analysis of Wintertodt Damage at 10 Hitpoints"
name: "Analysis of Wintertodt Damage at 10 Hitpoints"
desc: "Analysis of Wintertodt damage and finding the optimal levels for the Wintertodt grind"
tags:
- Data
- Python
- Programming
add_to_popular_list: true
thumbnail: math.png
---

This post presents an analysis of damage taken at Wintertodt at varying Hitpoints and Firemaking levels. After starting an Ultimate Ironman account I wanted to know everything about Wintertodt - as it provides excellent low-level rewards and experience. It is also the go-to for low-level Ironman, Hardcore Ironman, and Ultimate Ironman accounts. Just watch any OSRS YouTubers HCIM series and they are at Wintertodt in the first or second video. The general advice from the community is to do Wintertodt at 10 Hitpoints... but is this accurate and good advice? Is there more to it? Luckily we have the Wintertodt damage formulas (as provided by the wonderful Mod Ed). Let us do some math and draw some conclusions...

{% include figure.html path="blog/wintertodt-damage/wintertodt-damage-mod-ed-tweet.png" alt="Tweet from Mod Ed outlining the Wintertodt Damage Formulas for the three different attacks." %}

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Wintertodt Damage Formulas

Luckily for us, [Mod Ed Tweeted the Wintertodt damage formulas back in May 2017](https://twitter.com/jagexed/status/869168964609429504?lang=en). To understand the damage formulas we must first understand the different Wintertodt boss attack types. There are three different attack types:

1. Standard attack: all players take periodic, random damage dealt approximately every 10-20 seconds (cannot be avoided)
1. Brazier attack: the [Braziers](https://oldschool.runescape.wiki/w/Brazier) sometimes shatter causing damage if you are next to the Brazier (can be avoided)
1. Area attack: snow occasionally falls in random 3x3 tile spaces (can be avoided)

The amount of damage taken varies based on Hitpoints level, Firemaking level, the number of Braziers lit, and the number of _warm items_ worn by the player. To be more specific, the following three formulas are used to calculate damage taken for each of the three attacks.

1. Standard attack: `SA = (16 - W - 2B) * (HP + 1) / FM`
1. Brazier attack: `BA = ((10 - W) * (HP + 1) / FM * 2)`
1. Area attack: `AA = ((10 - W) * (HP + 1) / FM * 3)`

In the above formulas, the following symbols are used:

- _FM_: Base Firemaking level
- _HP_: Base Hitpoints level
- _W_: Number of warm items worn, where the maximum value is 4
- _B_: Number of braziers lit, where the maximum value is 3

## Using Python to Calculate Wintertodt Damage

Now that we have understood the Wintertodt damage formulas, we can write some programming code to automate calculations. This is important as it would be good to determine the Wintertodt damage at varying Hitpoints and Firemaking levels, from 50-99 Firemaking and 10-99 Hitpoints. If you calculated the damage at each level of the two skills it would be 4,361 calculations - so it needs to be automated!

I started by writing a simple Python function called `calculate_wintertodt_damage` which takes 4 parameters (`HP`, `FM`, `W` and `B`) for each of the inputs to the Wintertodt damage formulas (see the formulas above) and returns the damage for each of the 3 attacks types (`SA`, `BA` and `AA`). For reference, the function is provided below.

{% highlight python %}
import math

def calculate_wintertodt_damage(HP, FM, W, B):
    SA = (16 - W - 2 * B) * (HP + 1) / FM
    SA = math.floor(SA)

    BA = ((10 - W) * (HP + 1) / FM) * 2
    BA = math.floor(BA)

    AA = ((10 - W) * (HP + 1) / FM) * 3
    AA = math.floor(AA)

    return SA, BA, AA
{% endhighlight %}

To provide an example of how to use the function... If you wanted to determine and print out the damage for each Wintertodt attack type at 10 Hitpoints, 50 Firemaking while wearing 4 warm items and having 3 Braziers lits, the code would be:

{% highlight python %}
SA, BA, AA = calculate_wintertodt_damage(10, 50, 4, 3)
print("Standard attack:", SA)
print("Brazier attack:", BA)
print("Area attack:", AA)
{% endhighlight %}

Furthermore, you could loop a specific level to determine the damage of each Wintertodt attack at varying levels. For example, looping Hitpoints levels at 1 level intervals from level 10 to 99, the code would be:

{% highlight python %}
for hitpoints in range(10, 100):
    SA, BA, AA = calculate_wintertodt_damage(hitpoints, 50, 4, 3)
    print("Hitpoints level:", hitpoints)
    print("Standard attack:", SA)
    print("Brazier attack:", BA)
    print("Area attack:", AA)
{% endhighlight %}

## Analysis of Wintertodt Damage

The entire point of this post was to analyze Wintertodt damage and determine the most suitable level for the Wintertodt grind. However, I wanted to answer other questions like:

- How much does Firemaking level affect Wintertodt damage?
- Is 10 Hitpoints the best level for the Wintertodt grind?
- Is there any difference between level 10 Hitpoints and level 11 or 12?

The analysis presented in this section assumes:

- That 4 pieces of warm clothing are worn - these are easy to get even on a low-level account. The only account that might not be able to get 4 pieces are low-level Zeah-only ironmen accounts.
- That 3 or more Braziers are lit - if playing on a dedicated world, 3 Braziers will most likely always be lit. The only scenario where they are not consistently lit is when soloing Wintertodt.

Note: After doing a lot of solo Wintertodt runs on my UIM, I figured out that there is usually only one burner lit (the one I am focussing on). So if you wanted to determine solo damage levels it would probably be sensible to set the brazier value to 1.

### Damage at Varying Hitpoints Levels

The first thing I wanted to analyze was Wintertodt damage at varying Hitpoints levels. It is a common statement that the optimal level for Wintertodt is 10 Hitpoints and that high-level players are _"punished"_ based on the minigames mechanics. A good example is a post on [2007scape subreddit entitled: Stop punishing players with high HP at Wintertodt](https://www.reddit.com/r/2007scape/comments/7wzvfx/stop_punishing_players_with_high_hp_at_wintertodt/) which has 300+ comments, and 2.2K upvotes at a rate of 91% upvotes. A post that most of the OSRS community (or specifically the /r/2007scape Reddit community) agree with.

The first thing I researched was the damage done at varying Hitpoints levels while assuming a base level of 50 Firemaking. The graph below shows the damage taken at Wintertodt from level 10 to 99 Hitpoints. Each line represents a different Wintertodt attack style (standard damage, Brazier damage, and area of effect damage).

{% include figure_lightbox.html path="blog/wintertodt-damage/wintertodt-damage-at-varying-hitpoints.png" alt="Line graph showing Wintertodt damage at varying Hitpoints levels." %}

It is no surprise that the damage taken slowly increases as a player's Hitpoints level increases. One interesting takeaway is that the damage taken seems to be in distinct _"blocks"_ which increases at specific intervals. For example, the standard attack (blue line) remains to be a hit splat of 1 from level 10-15 Hitpoints. Then it increases to a hit splat of 2 from level 15-20 Hitpoints and so on. The same is true for Brazier attacks and the area of attack damage. 

### Percentage of Damage at Varying Hitpoints Levels

So we know that damage scales as Hitpoints level increases. Something else I thought might be interesting was the **percentage of damage done at varying Hitpoints level**. Basically, how much does a Wintertodt attack damage a player compared to their respective Hitpoints level? I calculated this for the standard Wintertodt attack by dividing the standard attack by Hitpoints and multiplying by 100 to get a percentage value (`SA / Hitpoints * 100`). The results are displayed in the line graph below:

{% include figure_lightbox.html path="blog/wintertodt-damage/wintertodt-damage-percentage-at-varying-hitpoints.png" alt="Line graph showing Wintertodt damage as a percentage of a player's Hitpoints at varying Hitpoints levels." %}

Take note of the y-axis of this graph, where all plotted values fall between approximately 6 and 13 percent of a player's Hitpoints level. To explain this further, at 10 Hitpoints the damage taken is 1, which is 10% of the player's Hitpoints value. What is evident from this graph is that the standard damage attack is pretty equal as a proportion of a player's total Hitpoints level. Yes, at lower Hitpoints levels the damage dealt as a percentage of a player's Hitpoints can vary with peaks and lows - however, the general trend is quite linear. The average across all Hitpoints levels is 11.05. Meaning that on average, the Wintertodt standard attack does 11 percent of damage per standard attack. So if you are 10 Hitpoints that is 1 damage. If you are 60 Hitpoints it will be 6 damage. 

**So why are players complaining that Wintertodt is punishing high-level players?** Like I said, the percentage of damage dealt is pretty linear. I mean, you could spend more time a write better algorithm to make the damage more equal... and fairer... Or is the fact the linear damage approach might not be the actual problem. I think the answer, or problem, is much simpler to answer after crunching some data. My general thought is that ** high-level players are _punished_ as high-level food is more expensive.** I don't want to get controversial in this post, so use this analysis and data to draw your conclusions!

### Damage at Varying Firemaking Levels

The first thing I thought when I properly looked at the Wintertodt damage formulas was: _Oh my, so having a higher Firemaking level reduces all three types of damage?!_ It just seemed from the formulas that have a higher Firemaking level would drastically reduce the damage taken. I mean, I always knew Firemaking level helped with reducing damage slightly, but I didn't think it would be significant.

The line graph below displays the Wintertodt damage for all three attack types for a player with 50 Hitpoints and varying Firemaking levels, from 50 to 99.

{% include figure_lightbox.html path="blog/wintertodt-damage/wintertodt-damage-at-varying-firemaking.png" alt="Line graph showing Wintertodt damage at 50 Hitpoints and varying Firemaking levels." %}

As seen, the damage for each of the 3 Wintertodt attacks decreases as a player's Firemaking level increases. This example (as seen in the graph above) demonstrates this trend, and the same trend is apparent at other Hitpoint levels. Some damage reduction is significant. At 50 Hitpoints and 50 Firemaking, the following damage occurs:

- Standard attack: 6
- Brazier attack: 12
- Area attack: 18

When reaching 90 Firemaking, while still at 50 Hitpoints, the following damage occurs:

- Standard attack: 3
- Brazier attack: 6
- Area attack: 10

These reductions are significant. Each attack is reduced by 50% for standard and Brazier attacks, and slightly under 50% for the area attack. To put it in other terms, if you are level 50 Hitpoints and level 90 Firemaking, you can eat one cake for every 4 standard attack received. Given that high levels in OSRS are the majority of experience needed (insert 92 is half of 99 jokes here), this damage reduction helps in the last few Firemaking levels.

### Is 10 Hitpoints the Meta?

There are [memes galore on /r/2007scape](https://www.reddit.com/r/2007scape/comments/9mi4kf/when_you_hit_50_firemaking_and_head_to_wintertodt/)... But rushing Wintertodt on a low-level Ironman is a very, very well known strategy. I mean why not, you get rapid Firemaking levels, while passively training Woodcutting and Construction, as well as the potential to train Fletching, Construction, and a tiny little Farming and Herblore. The rewards are great too. Excellent starting cash for any Iron-based account. 

From the previous analysis, we know that having low Hitpoints reduces damage. Having a high Firemaking level also reduces damage. The question I wanted an answer for: **is there any difference between level 10 and say 20 or so Hitpoints?** Knowing that damage will reduce as Firemaking level increases, is it still _efficient_ to go to the Wintertodt at 20 Hitpoints. My primary reason for this... If you can get a few more Hitpoints levels you can get more quests done, and can get some easy early levels in the skills that affect Wintertodt [Supply crate](https://oldschool.runescape.wiki/w/Supply_crate) rewards. These rewards are affected by the player's Woodcutting, Herblore, Mining, Fishing, Crafting, and Farming (as confirmed in this [Twitter post by Mod Ash](https://twitter.com/JagexAsh/status/1051830039346597888)).

The line graph below displays damage taken at 10, 20, and 30 Hitpoints levels and vary Firemaking levels from 50 to 99.

{% include figure_lightbox.html path="blog/wintertodt-damage/wintertodt-damage-at-varying-hitpoints-and-firemaking.png" alt="Line graph showing Wintertodt damage at varying Hitpoints and Firemaking levels." %}

I found this analysis exceptionally interesting. At 20 Hitpoints and 70 Firemaking, the standard damage attack is a 1 hit splat. This is the same as starting Wintertodt at 10 Hitpoints and 50 Firemaking. The main point, 70 Firemaking is pretty easy (as it is a very fast skill). So having higher Hitpoints and starting Wintertodt might be a decent solution. A couple of the early games might require a little more food, but it will be reduced as your Firemaking level increases.

I am heading to Wintertodt at a maximum of 14 Hitpoints on my Ultimate Ironman. I have crunched some numbers and it seems like the perfect balance in terms of the ability to gain Hitpoint levels and maintaining low damage. I want some Hitpoints levels to finish quests so I can get levels in the skills that affect Supply crate rewards. Low damage is especially important as the best food for UIMs is Pineapples sliced into Pineapple rings which heal 2 Hitpoints each (as Pineapples can be noted). The line graph below displays the damage taken for each of the three Wintertodt attacks at 14 Hitpoints, and vary Firemaking levels from 50 to 99.

{% include figure_lightbox.html path="blog/wintertodt-damage/wintertodt-damage-my-uim-plan.png" alt="Line graph showing Wintertodt damage at 14 Hitpoints and varying Firemaking levels." %}

As seen above, at 68 Firemaking, each Wintertodt attack is the same as at 10 Hitpoints... like I mentioned earlier since Firemaking levels are so fast, I think this is an excellent level for the Wintertodt grind.

## Wintertodt Damage Tools

When researching this topic I found a variety of useful tools. Since most player probably doesn't want to write Python to calculate Wintertodt damage, I thought I would post these tools here in case anyone was interested in using them:

- [OSRS Wintertodt Damage Calculator](https://docs.google.com/spreadsheets/d/1NwEL9w4NhNOxVNkDN6H5X-3gc648FO6vK0NVOYsrwZU/edit#gid=0)
- [OrbScape Wintertodt Damage Calculator](https://orbscape.com/calc/osrs/wintertodt.php)

## Conclusion

This post got long really fast. I tried to keep the writing to a minimal amount and let the numbers speak... But like usual, I got excited and kept dumping my brain on the keyboard.

I hope this post helped you understand the Wintertodt damage mechanics, and that the analysis made you think a little about how damage is calculated. As I said, I am heading to Wintertodt at 14 Hitpoints, and I would like to hear feedback about what others think of this. As always, please leave a comment below if you notice any errors, or have any feedback. I enjoy writing these posts and hope that you have found it useful and informative! Thanks, and happy scaping everyone.
