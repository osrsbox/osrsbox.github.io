---
layout: post
title: "OSRSBox | Blog | Calculating Melee Damage per Second (DPS) in OSRS"
name: "Calculating Melee Damage per Second (DPS) in OSRS"
desc: "A walkthrough example of how to calculate Melee DPS with a detailed discussion of the combat formulas used"
tags:
- Data
- DPS
add_to_popular_list: false
thumbnail: math.png
---

This post discusses and provides an example of how to calculate Damage per Second (DPS) for a typical melee equipment setup. For a long time, I have been interested in the method used to calculate DPS in Old School RuneScape (OSRS) using specific equipment against a specific monster. This post documents my journey of implementing the theory of calculating DPS into an actual example - using the [Combat Formulas](http://services.runescape.com/m=forum/forums.ws?317,318,712,65587452) and [DPS Calculator for Old School RuneScape](https://twitter.com/BitterkoekjeRS/status/739003659858681856) by Bitterkoekje as guidance. I also used the DPS calculator to check my workings! This post is pretty lengthy, but I felt the level of detail was useful for people without any experience calculating max hit or DPS.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Introduction

I always found it strange that DPS is not a more sought-after metric in OSRS. I was too much of a noob to think about it in RS2, but after leaving and playing World of Warcraft I discovered that DPS was a stable metric using popular add-ons such as [Recount](https://www.curseforge.com/wow/addons/recount). The image below shows an example of the _Damage Done_ interface for the Recount addon for a party (a group of players). This interface shows the total damage done, DPS and percentage of the damage done.

{% include figure.html path="blog/calc-dps/recount-dps-example.png" alt="Example of the Recount addon authored for World of Warcraft" %}

The purpose of this introduction (verbal waffle!) is to outline that the DPS metric is under-utilized in OSRS. If you want to determine if one equipment setup is better than another in terms of pure damage output - DPS is the metric you need. It is also evident that PvM is currently heavily weighted towards producing lots of damage fast, rather than having a tankier setup for longevity. This means that high DPS usually wins in terms of gear selection - an important reason we should use it as a metric. Another major point here - the stats do not lie... DPS is DPS and there is not as much room for disagreement when faced with pure numbers to indicate which gear setup has the best DPS score. However, some monster or boss encounters may not be about pure damage, and require DPS in conjunction with game mechanics.

If you are reading this post and think I have forgotten about Bitterkoekje, you are mistaken! If you play OSRS and do not know who Bitterkoekje is, you should! So... **Bitterkoekje is the boss when it comes to DPS in OSRS**. Bitterkoekje is the author of a very popular post on the official RuneScape forums called [Combat Formulas](http://services.runescape.com/m=forum/forums.ws?317,318,712,65587452), which outlines a variety of mathematical formulas for the OSRS combat system. The level of detail is excellent, but it gets pretty complex! Bitterkoekje is also the author of a [DPS Calculator for Old School RuneScape](https://twitter.com/BitterkoekjeRS/status/739003659858681856) - probably the most popular DPS calculator available. Below is an example of the DPS Calculator (available in Google Sheets) that takes a player name, potions used, prayers used, equipment items worn, and a target monster as input. It returns max hit, accuracy and most importantly DPS.

{% include figure.html path="blog/calc-dps/dps-calculator-example.png" alt="Example of DPS Calculator for Old School RuneScape by Bitterkoekje" %}

As you can see in the image above, one of the key aspects of the DPS Calculator is that you can compare two equipment setups. In the example above I am comparing the max hit and DPS differences between two very similar equipment setups. The only difference is on the left I am using an Abyssal whip, and on the right, I am using the Abyssal tentacle. In addition, I have configured the calculator to calculate max hit, accuracy, and DPS against the Abyssal demon. It is essential to select the specific monster as they have different defensive stats which alter the results.

Looking at the example in the image... the benefit of using a Tentacle whip (on a Slayer task against an Abyssal demon) grants one extra max hit (36) and approximately 0.228 more DPS. There is also a slight accuracy increase of just under 1%. The idea is that from these values, you can determine if the cost of the Abyssal tentacle is worth the increased max hit, accuracy and, ultimately, DPS.

Anyway... Bitterkoekje's DPS calculator is excellent. It is well-known and seems to be utilized by players to determine the best or most suitable equipment, potions, and prayers to use. However, I have one major problem with just putting in the required and reviewing the output... **How does this calculator work? Maybe I am too curious for my own good...**

This post documents my journey to determine DPS for a specific combat scenario and outlines what I learned along the way. I also try to explain the calculation process in simple terms - as it took a while for me to understand the combat formulas used, and how to calculate the final DPS value. This post is divided into the major stages for DPS calculation, starting with the combat scenario (player stats, equipment, potions, prayer, and enemy) and ends with the calculation of DPS. Enjoy!

## Combat Scenario

This post investigates calculating DPS for a very common combat scenario using melee gear. The combat scenario is also for a Slayer task, against Abyssal demons. In this section the gear used, player combats stats and target enemy is outlined to form a combat scenario that has the data needed to calculate DPS.

#### Equipment Setup

The equipment used in this scenario is pretty much the go-to equipment setup for many common higher-level Slayer tasks when using melee - not max melee, but getting close. The equipment includes Slayer helm (i), Bandos chestplate, Bandos tassets, Fire cape, Prims, Barrows gloves, Zerker ring, Torture ammy, Dragon defender and Whip - oh, and a blessing for that +1 Prayer. Pictures are better... below is a picture of the equipment used as seen in the [Equipment Stats interface](https://oldschool.runescape.wiki/w/Equipment_Stats).

{% include figure.html path="blog/calc-dps/profile-gear.png" alt="The gear profile used in this DPS calculation example" %}

Remember that this image is here during the post as we will be referring back to it, specifically to get the values for a different Attack bonus, Other bonuses and Target-specific bonuses that are displayed. These are needed to calculate DPS!

#### Player Combat Stats

We summarized the equipment setup, now we will summarize the combat stats. For calculating DPS for melee there are only two player skill levels needed: Attack and Strength. Defence is not required.

- **Attack: 97**
- **Strength: 99**

Yeah... still a pleb... not max combat in 2019!

#### Player Combat Modifiers

Combat modifiers are essential for including in DPS calculation as they affect the skill levels and max hit. Combat modifiers include prayers used, potions used, and attack style. If you didn't know, attack style (e.g., Accurate, Aggressive and Defensive) offer hidden bonuses. We will discuss attack style later, but if you are interested now have a read of the [Combat Options page of the OSRS Wiki](https://oldschool.runescape.wiki/w/Combat_Options). The combat modifiers in our combat scenario are:

- **Potion: Super strength potion** 
- **Potion: Super attack potion** 
- **Prayer: Piety** 
- **Attack style: Accurate**

We will discuss the effect these combat modifiers have on DPS and how they factor into the calculations later in this post.

#### Target Monster

The target monster for this combat scenario is the Abyssal demon while on a Slayer task. I think being on a Slayer task is a good addition to the calculate DPS example as it is very common that people want to include the Slayer helm bonus - and this makes the calculation a little more difficult. Also, the popularity of Slayer in the OSRS community really highlights the reason to include this. The image below shows the overall combat stats and an image of the [Abyssal demon taken from the OSRS Wiki](https://oldschool.runescape.wiki/w/Abyssal_demon#Normal). It is is the _Normal_ version of the Abyssal demon found in the _Slayer Tower_, not the one found in the _Catacombs of Kourend_.

{% include figure.html path="blog/calc-dps/abyssal-demon-stats-and-image.png" alt="The stats and an image of the Abyssal demon" %}

Again, remember that this image is here with the associated combat stats. We will need these stats later when calculating the defensive capability of the Abyssal demon to ultimately determine the players DPS.

## Calculating DPS

Congratulations! You have made it to the part where we actually calculate the DPS of the specific combat scenario. Unfortunately, this is not a straight-forward task and can be very difficult depending on the gear, potions, and prayer used. It is even more difficult to incorporate special attacks into the equation - we will not include, but will include the Slayer helm bonus. Bitterkoekje includes the Slayer helm and Salve amulet in special attacks section, but we will just include the Slayer helm at the last part of the calculation.

Anyway, determining DPS involves the calculation of the max hit, payer accuracy, target defence, and weapon attack speed. There are different sections for each of these phases below. Then a final section about using these values to finally get the DPS value.

### 1. Calculating Max Hit

Max hit is the highest attack a player can hit. It is an essential value to include in DPS calculation - so we must first calculate the player max hit. According to [Bitterkoekje Combat Formulas post](http://services.runescape.com/m=forum/forums.ws?317,318,712,65587452), the method to determine the max hit of a player is specified by the following equation:

{% highlight plaintext %}
max_hit = 0.5 + effective_level * (equipment_bonus + 64) / 640
{% endhighlight %}

I hope that doesn't make sense! Because when I first read it, I felt like I needed to go back to university and take Math 101. Luckily, Bitterkoekje has provided detailed instructions on how to get the _effective level_ and _equipment bonuses_. Out of these two values, the _effective level_ is definitely more difficult to calculate, as the _equipment bonus_ is a simple lookup on the equipment stats interface. The method to determine _effective level_ and _equipment bonus_ are discussed in the subsections below.

Note: In Bitterkoekje's combat formulas, the value `A` is used to denote _effective level_ and the value `B` is used to denote _equipment bonus_. I think these are a little confusing, so I have substituted the names in the formula.

#### 1.1. Determine Effective Level

In the most basic description, the _effective level_ is a value that dictates the overall level a player has in combat of a specific type (e.g., Strength when calculating max hit for a melee gear setup). The effective level includes the following properties:

1. Skill level (e.g., Strength level)
1. Potion effect (e.g., Super strength potion)
1. Prayer type (e.g., Piety)
1. Attack style (e.g., Accurate, Aggressive, Controlled)
1. Item bonus (e.g., Slayer helm bonus, Void set bonus, Salve amulet)

Remember, we are only talking about melee in this post. Ranged is very similar, however, Magic is much different to calculate. Anyway, here is a brief summary of the steps used to determine the _effective level_ for melee max hit calculation. This has been taken from [Bitterkoekje Combat Formulas post](http://services.runescape.com/m=forum/forums.ws?317,318,712,65587452) and slightly reworded for only melee max hit calculation.

1. Take the player's strength level
1. Add the potion effect to determine increased strength level
1. Multiply by the prayer used, round down to the nearest integer
1. Add attack style bonus 
1. Add +8

Yes... complex! I will do my calculations for each step for the combat scenario that I have previously outlined. The last line of each step has the final result or mathematical equation for that phase of calculation.

1. Take the player's strength level
    - Taken from skills interface
    - `99`
1. Add the potion effect to determine increased strength level
    - Using the Super strength potion effect which is:
    - 5 + 15% of Strength level, then round down to nearest integer
    - Check the [OSRS Wiki page on the Super strength potion for details](https://oldschool.runescape.wiki/w/Super_strength)
    - `5 + 0.15 * 99 = 19.85`, rounded down to `19`
    - `99 + 19 = 118`
1. Multiple by the prayer level and round down to nearest integer
    - Piety is 23% boost to player strength
    - Check the [OSRS Wiki page on the Piety for details](https://oldschool.runescape.wiki/w/Piety)
    - `118 * 1.23 = 145.14`, rounded down to `145`
1. Add attack style bonus
    - For melee: Aggressive is +3, Controlled is +1, Accurate is +0 to strength
    - Since the combat scenario is using the Accurate attack style, we add 0
    - `145 + 0 = 145`
1. Add +8
    - This one is easy!
    - `145 + 8 = 153`

Done! The _effective level_ for our combat scenario is `153`. A couple of notes about this particular calculation. We could skip the potion effect calculation - we could just drink the potion in-game and see that drinking a Super strength potion at 99 strength would boost it to 118. This information is also available on the OSRS Wiki page for the potion. I would recommend a similar strategy for looking up prayer multipliers, or checkout the information provided in the [Combat Formulas](http://services.runescape.com/m=forum/forums.ws?317,318,712,65587452) post to see all prayer multpliers.

#### 1.2. Determine Equipment Bonus

In the most basic description, the _equipment bonus_ is a value that dictates the overall bonus a player gets from worn items (equipment or gear). When calculating melee max hit, the equipment bonus is the _Melee strength_ value from the _Equipment Stats_ interface. An image is displayed below that highlights the value used to determine the melee-based equipment bonus. In our case, the value is `133`, which is our Melee strength bonus.

{% include figure.html path="blog/calc-dps/profile-gear-equipment-bonus-max-hit.png" alt="The gear profile used with equipment bonus value for max hit highlighted" %}

#### 1.3. Max Hit Formula

Now we have the two variables we need to calculate max hit for our specified combat scenario.

{% highlight plaintext %}
effective_level = 153
equipment_bonus = 133
{% endhighlight %}

Remember back to the original max hit formula? Listed below is the original formula.

{% highlight plaintext %}
max_hit = 0.5 + effective_level * (equipment_bonus + 64) / 640
{% endhighlight %}

If we put in the values we calculated into the max hit formula we get the following formula with all variables filled in.

{% highlight plaintext %}
max_hit = 0.5 + 153 * (133 + 64) / 640
{% endhighlight %}

The output of this calculation is `47.5953`, which **needs to be rounded down to the nearest integer** - as you cannot hit a `47.5953` on an enemy, you can only hit a `47`. Therefore the **final max hit value** is `47`.

Hey Hey Hey! Hold on! We have not finished. Set bonuses, or items bonuses, are also required to be included... There are 4 items that provide increased melee damage (there are a couple others, but these are the main ones).

1. Void Knight equipment set: The melee set, including the helm, offers a +10% to damage and accuracy
1. Black mask, Slayer helm and Slayer helm (i): On a task, using melee, you get a +16.67% damage increase (commonly represented as 7/6). If used with Salve amulet, this bonus is ignored
1. Salve amulet: Against undead creatures, you get a +16.67% damage increase (again, commonly represented as 7/6)
1. Salve amulet(e): Against undead creatures, you get a +20% damage increase

Since we have specified the use of a Slayer helm, and have the combat scenario of being on a Slayer task we need to add the Slayer helm bonus. Adding item bonuses into the max hit calculation depends on the item type. The golden rule:

- Adding the Void Knight set is done at the end of the _effective level_ calculation, and rounded down to the nearest integer
- Any other melee bonus is applied to the already calculated (and rounded) down max hit

So to get the final max hit, including the Slayer helm bonus, we need the following final calculation:

{% highlight plaintext %}
max_hit_with_slayer_helm = max_hit * 6/7
{% endhighlight %}

**FINAL MAX HIT VALUE: 54**

I thought it was prudent to check this max hit value, so I performed a double check. Firstly, I plugged the same combat scenario into the [DPS Calculator for Old School RuneScape](https://twitter.com/BitterkoekjeRS/status/739003659858681856) - and got the same results. I also tested my max hit in-game using the [Undead combat dummy](http://oldschoolrunescape.wikia.com/wiki/Undead_combat_dummy) - the results are illustrated below!

{% include figure.html path="blog/calc-dps/combat-dummy-max-hit.png" alt="A max hit against a combat dummy" %}

### 2. Calculating Player Max Attack Roll

Still here?! You must be determined or inquisitive! The next step to determine DPS is to figure out the player max attack roll, sometimes called the max accuracy roll. The player max attack roll is the accuracy of a players attack  - basically, how often will you land an attack with any damage value. When calculating DPS, player accuracy is compared to enemy defence (discussed later) to determine the chance of an attack hitting. Luckily for us, calculating this value is **very similar to calculating max hit**... we calculate the _effective level_ and determine the _equipment bonus_, but the final formula is different from the max hit formula. The following formula specifies the method for calculating the player max attack roll.

{% highlight plaintext %}
max_attack_roll = effective_level * (equipment_bonus + 64)
{% endhighlight %}

Oh no! We are at it again! We need to calculate the _effective level_ and _equipment bonus_. Luckily we have done this before so I will not go into as much detail this time.

#### 2.1. Determine Effective Level

When we calculated the _effective level_ for the max hit, we used strength. This time, for the **max attack roll we will be using values associated with the Attack skill**. This is key to remember: max hit uses strength levels and strength modifiers, while max attack roll uses attack levels and attack modifiers. For example, we include the Super attack potion as the potion modifier for the max attack roll. Another good example is for the max attack roll we use the **Attack multiplier** from the Piety prayer, instead of the Strength multiplier. For the max hit, the prayer multiplier was 23% (Strength), while this time we use the prayer multiplier of 20% (Attack boost). Below is the process I used to calculate the max attack roll of the player.

1. Take the player's attack level
    - Taken from skills interface
    - `97`
1. Add the potion effect to determine increased strength level
    - Using the Super attack potion effect which is:
    - 5 + 15% of Attack level, then round down to nearest integer
    - Check the [OSRS Wiki page on the Super attack potion for details](https://oldschool.runescape.wiki/w/Super_attack)
    - `5 + 0.15 * 97 = 19.55`, rounded down to `19`
    - `97 + 19 = 116`
1. Multiple by the prayer level and round down to nearest integer
    - Piety is 20% boost to player attack
    - Check the [OSRS Wiki page on the Piety for details](https://oldschool.runescape.wiki/w/Piety)
    - `116 * 1.20 = 139.2`, rounded down to `139`
1. Add attack style bonus
    - For melee: Controlled is +1, Accurate is +3
    - Since the combat scenario is Accurate, we add 3
    - `139 + 3 = 142`
1. Add +8
    - This one is easy!
    - `142 + 8 = 150`

Done! The _effective level_ for our combat scenario is `150`. 

#### 2.2. Determine Equipment Bonus

When calculating melee max attack roll, the equipment bonus is the _Attack bonus_ for the specific attack style used. We have specified the use of the Abyssal whip using the Accurate attack style. For this weapon, the Accurate attack style is Slash. Therefore, we need to use the Slash bonus value from the _Equipment Stats_ interface. An image is displayed below that highlights the value used to determine the melee-based equipment bonus. In our case, the value is `136`, which is our Melee attack style bonus.

{% include figure.html path="blog/calc-dps/profile-gear-equipment-bonus-max-attack-roll.png" alt="The gear profile used with equipment bonus value for max attack roll highlighted" %}

#### 2.3. Max Attack Roll Formula

Now we have the two variables we need to calculate the max attack roll for our specified combat scenario. 

{% highlight plaintext %}
effective_level = 150
equipment_bonus = 136
{% endhighlight %}

Listed below is the original player max attack roll formula.

{% highlight plaintext %}
max_attack_roll = effective_level * (equipment_bonus + 64)
{% endhighlight %}

If we put in the values we calculated into the max attack roll formula we get the following formula with all variables filled in.

{% highlight plaintext %}
max_attack_roll = 150 * (136 + 64)
{% endhighlight %}

The output of this calculation is `30,000`, which **needs to be rounded down to the nearest integer**. It is already an integer, therefore, the **max attack roll value** is `30,000`. However, we still need to include the Slayer helm bonus while on task. So to get the final max hit, including the Slayer helm bonus, we need the following final calculation:

{% highlight plaintext %}
max_hit_with_slayer_helm = max_attack_roll * 6/7
{% endhighlight %}

**FINAL MAX ATTACK ROLL VALUE: 35,000** 

We will use this value later when calculating DPS. Again, I double checked this number using the [DPS Calculator for Old School RuneScape](https://twitter.com/BitterkoekjeRS/status/739003659858681856) - and got the same result. FYI - you have to dig around in the extra sheets in the calculator to find the max attack roll result.

### 3. Calculating Enemy Max Defence Roll

We are up to the last variable that we have to calculate. We need to figure out the max defence roll of the enemy. In our combat scenario, this is an Abyssal demon. Basically, this value provides the chance that an enemy will block the attack of the player. Again, calculating this value is **very similar to calculating max attack roll**... but the inputs to the formula are different. The following formula specifies the method for calculating the player max defence roll.

{% highlight plaintext %}
max_defence_roll = effective_level * (equipment_bonus + 64)
{% endhighlight %}

Note that it is the same formula as used when calculating the max attack roll for the player's attack. We need to calculate the _effective level_ and _equipment bonus_. Luckily we have done this twice now!

#### 3.1. Determine Effective Level

When we calculated the _effective level_ for the max hit and max attack roll we used inputs from the player including strength/attack level, potion boots to level, and prayer multipliers. For the max defence roll, we need to provide inputs about the target enemy. In our combat scenario, the [Abyssal demon](https://oldschool.runescape.wiki/w/Abyssal_demon#Normal) was specified. Therefore, we will determine the _effective level_ using inputs from this specific monster. You could look up this data on the OSRS Wiki, or cast the Lunar spellbook [Monster Examine](https://oldschool.runescape.wiki/w/Monster_Examine) spell on the monster in-game. 

I will not outline the same steps again. Instead, I will start my calculations following the same method I have previously outlined:

1. Take the enemy defence level
    - Taken from the OSRS Wiki or from the Monster Examine spell
    - `135`
1. Add the potion effect to determine increased defence level
    - Monsters cannot use potions!
    - `135 + 0 = 135`
1. Multiple by the prayer level and round down to the nearest integer
    - Monsters cannot use prayers!
    - Cannot multiply by 0, so skip this step
1. Add attack style bonus
    - For NPC rolls, always use the default stance bonus of +9
    - This above statement from Bitterkoekje was difficult to decipher. When adding +9 here, then +8 below, the max defence roll was way off. I am assuming that the attack style bonus is always +1 for NPCs.
    - `135 + 1 = 136`
1. Add +8
    - This one is easy!
    - `136 + 8 = 144`
1. Multiple by the item bonus, round down to the nearest integer
    - Monsters cannot have item stats bonuses
    - Cannot multiply by 0, so skip this step

Done! The _effective level_ for our combat scenario is `144`. 

#### 3.2. Determine Equipment Bonus

When calculating melee max defence roll, the equipment bonus is the _Defence bonus_ for the specific attack style used by the attacking player. We have specified the use of the Abyssal whip using the Accurate attack style. For this weapon, the Accurate attack style is Slash. Therefore, we need to use the Slash defence bonus value for the enemy monster. In our combat scenario, the [Abyssal demon](https://oldschool.runescape.wiki/w/Abyssal_demon#Normal) was specified which has a Slash defence value of `20`.

#### 3.3. Max Defence Roll Formula

Now we have the two variables we need to calculate the max defence roll for our specified combat scenario.

{% highlight plaintext %}
effective_level = 144
equipment_bonus = 20
{% endhighlight %}

Listed below is the original max defence roll formula.

{% highlight plaintext %}
max_defence_roll = effective_level * (equipment_bonus + 64)
{% endhighlight %}

If we put in the values we calculated into the max defence roll formula we get the following formula with all variables filled in.

{% highlight plaintext %}
max_defence_roll = 144 * (20 + 64)
{% endhighlight %}

**FINAL MAX DEFENCE ROLL VALUE: 12,096** 

The output of this calculation is `12,096`, which **needs to be rounded down to the nearest integer**. It is already an integer, therefore, the **final max defence roll value** is `12,096`. We will use this value later when calculating DPS. Again, I double checked this number using the [DPS Calculator for Old School RuneScape](https://twitter.com/BitterkoekjeRS/status/739003659858681856) - and got the same result. FYI - you have to dig around in the extra sheets in the calculator to find the max defence roll result.

### 4. Calculating Hit Chance

In sections 2 and 3 we found the max attack roll and max defence roll. The entire point of calculating these two values was to determine the hit chance. The hit chance, sometimes referred to as accuracy, is the likelihood of one of your attacks being successfully executed against a target enemy. Basically, did you land a hit on a monster, or not. Lucky for us, this calculation is pretty easy because we have the required values. From the previous sections we have the following values:

{% highlight plaintext %}
max_attack_roll = 35,000
max_defence_roll = 12,096
{% endhighlight %}

The formula for this one is pretty easy.

{% highlight plaintext %}
If max attack roll is higher than the max defence roll:
    hit_chance = 1 - (max_defence_roll + 2) / (2 * (max_attack_roll + 1))
Else if max defence roll is higher than max attack roll:
    hit_chance = max_attack_roll / (2 * max_defence_roll + 1)
{% endhighlight %}

Ok... maybe not too easy. But I think the problem is how I wrote the equation - I was trying to make it easy to read! Here is the same logic implemented in the Python programming language. The max rolls are set as variables `attack` and `defence` in the first two lines.

{% highlight python %}
attack = 35000      # The max attack roll
defence = 12096     # The max defence roll

if attack > defence:
    hit_chance = 1 - (defence + 2) / (2 * (attack + 1))
else:
    hit_chance = attack / (2 * defence + 1)
{% endhighlight %}

If we look at our example. The max attack roll (`35,000`) is higher than the max defence roll (`12096`), therefore, we use the first formula: `hit_chance = 1 - (defence + 2) / (2 * (attack + 1))`. If we fill in the placeholders we get the following formula.

{% highlight python %}
hit_chance = 1 - (12096 + 2) / (2 * (35000 + 1))
{% endhighlight %}

**FINAL HIT CHANCE VALUE: 0.82717636639** 

The result from this calculation is `0.82717636639`, or approximately `0.83` but it is best not to round this value. Instead, we should use it as input to the DPS calculation as it is. We do not have further use for max accuracy and max defence rolls anymore - the entire purpose of these two values was to determine the hit chance! It took a lot of effort, but this value is key to calculating DPS.

### 5. Calculating Damage per Second (DPS)

We are getting somewhere now! We have done the majority of the calculation needed to determine DPS. Let's do a quick review:

1. We calculated the max hit based primarily on the strength level, and equipment, potions, prayers, and item bonuses that improve player strength.
1. We calculated the max attack roll of the attacking player
1. We calculated the max defence roll of the defending NPC
1. We calculated the hit chance (accuracy) of the attacking player using the max attack roll and max defence roll

To reiterate, we have ended up with the following calculated values.

{% highlight plaintext %}
max_hit = 54
hit_chance = 0.82717636639
{% endhighlight %}

We are on easy street now... To calculate DPS we need to use the following formula.

{% highlight plaintext %}
dps = hit_chance * (max_hit / 2) / attack_interval
{% endhighlight %}

I could not find this formula at the front of Bitterkoekje's Combat Formulas post, and found it lurking in one of his comments on page 47! We have the hit chance, and we have the max hit. What about the attack interval. Do not fret! This is really easy. This is simply the time in seconds between player attacks. We are using the Abyssal whip which has an attack speed of 4 game ticks. Since OSRS game ticks are 0.6 seconds, we can simply calculate: `4 * 0.6` to get `2.4`. So the Abyssal whip attacks are once every 4 seconds. The attack speed information is available on the OSRS Wiki.

{% highlight plaintext %}
attack_interval = 2.4
{% endhighlight %}

Let's plug the values into the DPS formula.

{% highlight plaintext %}
dps = 0.82717636639 * (54 / 2) / 2.4
{% endhighlight %}

**DAMAGE PER SECOND (DPS): 9.30573412189** 

The result from all our calculations is approximately `9.31`. This means that we do just over 9 damage per second in the specified gear, against an Abyssal demon while on a Slayer task. We should probably check Bitterkoekje's DPS Calculator to double check we got everything correct. The box of relevant information is displayed in the screenshot below.

{% include figure.html path="blog/calc-dps/dps-calculator-comparison.png" alt="Screenshot of the DPS calculator showing the same results" %}

## Conclusion

This post ended up really long! But I felt it was necessary to provide a thorough example with a detailed discussion of what was happening at each step. I really felt like I needed a complete example when first investigating this topic - and I hope this example helps people learn the DPS calculation method. If anyone is interested, I have included a simple Python script called [dps_melee_example.py]({{ site.url }}/assets/img/blog/calc-dps/dps_melee_example.py) which has a couple of simple functions for max hit, max roll, hit chance and DPS calculations. It has hard-coded player and enemy monster values - but might be of use to someone to see the same steps discussed in this post in a program.

Believe it or not, the melee DPS example we used was actually one of the most simple of the combat styles. We also did not include special attacks in this example - but this is not too complicated. Also, I do not really see the point of the calculating DPS for special attacks as you cannot consistently hit specs. It would make more sense to include special attacks as an _over time_ effect which is added to your DPS. I think this would not be too complicated to implement - maybe a future post! One more thing... we only looked at melee DPS. Range DPS is pretty similar. However, magic DPS is a lot different to calculate. Again, maybe a future post.

I had a lot of fun writing up this post, and hope you either enjoyed the read or at least... learned something! Until the next time, happy scaping everyone!
