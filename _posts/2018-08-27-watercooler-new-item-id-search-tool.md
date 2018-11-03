---
layout: post
title: "OSRSBox | Blog | WaterCooler: New OSRS Item ID Search Tool"
name: "WaterCooler: New OSRS Item ID Search Tool"
desc: "Creating an OSRS Item ID and Item Name Search Tool"
tags:
- Plugin
- RuneLite
- Cache
- Tool
add_to_popular_list: true
thumbnail: watercooler.png
---

This post discusses a collection of new tools that I recently wrote and released on OSRSBox (website and GitHub). The [OSRS Item Search]({{ site.url }}/tools/item-search/) tool is a web-based application to search the item ID numbers and item names that are available in OSRS. Check out the image below to get an idea of what the tool looks like:

{% include figure.html path="blog/item-search/item-search-interface.png" alt="Example use of the OSRSBox Item Search tool" %}

My OSRS item search tool fills a much needed void. When starting doing some OSRS software development, I found that there were no up-to-date item ID databases or search tools. There were some solutions floating around the Internet, but none of them had game items that were recently added. This raised a big question in my brain... _Why are there no up-to-date item databases?_ Potential answer laziness of web devs? More probable answer: bad workflow for dumping the OSRS cache and updating databases. This lead me on a path to find a decent solution to providing a consistantly up-to-date item search tool.

I split the project into two primary categories:

1. Dumping OSRS item data from the Cache
1. Building a fast and responsive web application to search OSRS items

In addition, the tools and general workflow were designed to intergrate (and populate) my existing [OSRSBox Database]({{ site.url }}/projects/osrsbox-db/) project.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Developing a RuneLite Plugin to Extract Item Metadata

Is it just me, or does RuneLite seem to be the current answer for any OSRS problem?! After some serious reading and research about OSRS cache tools, I went full circle and ended up back with RuneLite. I had previously written a blog post about [using Runelite to extract NPC and item definitions]( {% post_url 2018-07-26-osrs-cache-research-extract-cache-definitions %}). This post culminated with a solution to extract the `ItemDefinitions` structure from the OSRS cache, but had no support for image extraction. Also, my build process was rediculously complex and the compiled code, `.jar` files, were messy to run. My ideal solution: _a RuneLite plugin to extract metadata about every OSRS item_! 

I always start a project (even an informal project) with a list of requirements for what the plugin needed to do! This lead to the following functionality requirements:

- Extract metadata for every OSRS item available in game
- Export item metadata to JSON format
- Extarct icon images for every OSRS item available in game
- Export item icon image to PNG format
- A reliable and easily run solution to extract new game items after every weekly updates

### Adding JSON Support for Plugins

Before doing anything, I started looking for a JSON library that could be integrated easily into the RuneLite build process. I found lots of solutions that involved importing `.jar` files - which is fine, but not exactly scalable to different development evironments (read: different computers that I, or anyone else, wants to compile RuneLite on). It seems like a Maven dependency was the best solution.  

I found a decent JSON library called _json-simple_. However, finding the best solution to use as a Maven import was difficult. There were license issues with one version I initially tried (so I was told in a blog post). Then I found a fork of the original project supported by Maven, named [JSON.simple](https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple). After finding the right library, the import was relatively easy. I simply added the dependency to the `pom.xml` file for the `runelite-client`. To be specific, this involved editing the following file:

{% highlight plaintext %}
runelite\runelite-client\pom.xml
{% endhighlight %}

In this file, I added the XML dependency object into the `dependencies` XML tag. The code listed below documents my additions.

{% highlight xml %}
<dependency>
    <groupId>com.googlecode.json-simple</groupId>
    <artifactId>json-simple</artifactId>
    <version>1.1.1</version>
</dependency>
{% endhighlight %}

Sometimes explaining where exactly to edit code can be difficult. If you want more information, you can [view my modified `pom.xml` file](https://github.com/osrsbox/runelite/blob/osrsbox-plugins/runelite-client/pom.xml) in my forked RuneLite repository (under the `osrsbox-plugins` branch). This file has the additions that I have made to support JSON generation.

After the addition to the `pom.xml` file, you can import the required components of the library into your plugin file. I only used two imports, one for creating JSON objects and one for creating JSON arrays.

{% highlight java %}
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
{% endhighlight %}

This was the last step to modify the RuneLite client to support JSON generation. Later in the article I briefly discuss how to actually use the _JSON Simple_ library to create JSON objects containing item metadata.

## Writing the RuneLite ItemScraper Plugin

As with any RuneLite plugin, I started by picking a name: _Item Scraper_. This seemed descriptive! As I have discussed in previous blog posts, I then made a _package_ in the `plugins` folder named: `itemscraper`. Then I made two files to start plugin development:

- `ItemScraperConfig.java`
- `ItemScraperPlugin.java`

You can view all the code and the structure I used by looking at my `orsrsbox-plugins` branch of my forked version of the official RuneLite repository on GitHub. The base files for the [itemscraper plugin](https://github.com/osrsbox/runelite/tree/osrsbox-plugins/runelite-client/src/main/java/net/runelite/client/plugins/itemscraper) has the two files used to create the plugin.

### Method to Run the Plugin

I started by setting up a base plugin structure with the mandatory imports (writing this I think someone, maybe me, should author a base plugin for starting plugin development - let me know in the comments if you are interested in this). Anyway, the first thing to do is determine when and how to start the _Item Scraper_ plugin. All plugins usually have a `startUp()` function that is run when a plugin is started. The code to extract item metadata could be included here, but I thought that it might be better to have an _action_ that can be triggered to run the plugin. The idea of using a command seemed like a good idea, which I ended up going with.

Even the OSRS vanilla client supports a variety of commands. For example, the `::renderself` command can be used to remove visibility of your OSRS character in-game. There are a bunch of other commands, and even chat effect commands. RuneLite itself uses commands in a variety of plugins. For example, check out the [Chat Commands Plugin](https://github.com/runelite/runelite/wiki/Chat-Commands) which can use commands such as `!total` and `!price`. 

According to the [DevToolsPlugin class](https://static.runelite.net/api/runelite-client/net/runelite/client/plugins/devtools/DevToolsPlugin.html), there is an `onCommand()` function that listens to entries in the chat box. Any chat that is entered and contains two colons (`::`) can be caught and handled in a RuneLite plugin. I wrote a simple function based on other plugins to listen to chat commands, specifically, my implementation listens for a `::dump` command and then executes my custom `dumpItems()` function. An example of my `onCommand()` method is provided below.

{% highlight java %}
@Subscribe
public void onCommand(CommandExecuted commandExecuted)
{
    String[] args = commandExecuted.getArguments();
    switch (commandExecuted.getCommand())
    {
        case "dump":
        {
            dumpItems();
            break;
        }
    }
}
{% endhighlight %}

Notice how the `case` statement (similar to switch for non-Java people!) looks for the `dump` command, then runs a function called `dumpItems()` ... this is the function where the magic happens! Well it is not very magical, it is more logical!

### Saving Item Metadata to JSON Format

After adding a new `dumpItems()` function, I started to write the code to dump the actual items. In OSRS, every item has a unique ID number, so the first thing is to loop every item ID and then process each item. However, I could not find any RuneLite API methods to determine the total number of item ID numbers or to provide a list of valid item ID numbers. Furthermore, any list would be dynamic and would be extended every game update. I went with a dirty hack, and wrote a simple `for` loop to start from `0` and iterate through to the highest item ID number. To find the highest item ID value I looked at the [ItemID.java](https://github.com/runelite/runelite/blob/master/runelite-api/src/main/java/net/runelite/api/ItemID.java) file from RuneLite which contains a list of all items. I decided to create a loop from 0 to 25,000 to ensure complete coverage.

{% highlight java %}
private void dumpItems()
{
    // Code to dump items!
    log.debug(">>> Lets dump some data...");
    for(int i=1; i<25000; i++)
    {
        // Process specific item ID number
    }
}
{% endhighlight %}

Fetching the item information is pretty easy thanks to RuneLite's API. There is an `ItemComposition` interface which populates a template with metadata about any item.

{% highlight java %}
ItemComposition itemComposition = client.getItemDefinition(itemID);
if (itemComposition != null)
{
    // Process each itemComposition
}
{% endhighlight %}

In addition to performing a check to see if the `itemComposition` is `null`, I also checked the item name for `Null`, `null` or `""` (an empty string). This was to remove any item ID numbers that were not valid. The [RuneLite API documents the ItemComposition](https://static.runelite.net/api/runelite-api/net/runelite/api/ItemComposition.html) methods, which can return a variety of useful information. Check the API documentation for a complete list - but some of the methods I used are listed below:

- `getID()`: Gets the items ID (we already have this)
- `getName()`: Gets the items name
- `getNote()`: Gets a value specifying whether the item is noted
- `getPrice()`: Gets the store price of the item
- `isMembers()`: Checks whether the item is members only
- `isStackable()`: Checks whether the item is able to stack in a players inventory
- `isTradeable()`: Returns whether or not the item can be traded to other players
- `getInventoryActions()`: Gets an array of possible right-click menu actions the item has in a player inventory (useful to determine if an item is equipable)

From here, it was as simple as creating a JSON object and populating it with item metadata. The code snippet below displays the process of creating a new `JSONObject` then populating it with the item ID and name. 

{% highlight java %}
// Create a new JSON object for player
JSONObject itemJSON = new JSONObject();

// Populate JSON with everything useful
itemJSON.put("id", itemComposition.getId());
itemJSON.put("name", itemComposition.getName());
{% endhighlight %}

I used the methods listed earlier to populate a variety of different metadata properties about each item. Basically trying to populate as much _useful_ information as I could get from the ItemDefinition methods provided by the API. The next logical thing is to save the actual JSON file. The plugin saves all JSON files to a folder named `items-json-runelite` in the root `runelite` folder which has to actually exist (yes... probably should have added support to create this folder on run-time - hopefully in the future). It will save the output file to `<itemIDnumber>.json`, for example: `1243.json`. The code snippet below documents how I saved the file, but it is pretty much the same for any other Java application.

{% highlight java %}
// Write item JSON to a file
// File name is the item ID number
String fileNameOutput = "items-json-runelite/" + itemID + ".json";
try (FileWriter file = new FileWriter(fileNameOutput))
{
    file.write(itemJSON.toJSONString());
    file.flush();

} catch (IOException e) {
    e.printStackTrace();
}
{% endhighlight %}

The end result from this process is approximately 21,000 individual JSON files. One for every item in OSRS! Below is an example entry for the `Cannonball` item with the ID number of `0`: 

{% highlight plaintext %}
{
  "id": 2,
  "name": "Cannonball",
  "tradeable": true,
  "stackable": true,
  "noteable": false,
  "equipable": false,
  "members": true,
  "cost": 5,
  "lowalch": 2,
  "highalch": 3,
}
{% endhighlight %}

In addition to the individual JSON files (one for each item), I also added support to generate a `summary.json` file that contains every item name and item ID number. This is the file that I use for the actual item search web application. For interest sake, this file is available from:

{% highlight plaintext %}
https://www.osrsbox.com/osrsbox-db/summary.json
{% endhighlight %}

### Saving Item Icon to PNG Format

The final plugin requirement was to save the item icon image in PNG format. I found a method in the `ItemManager` class that had a `getImage()` function to fetch the icon image and return it as a `BufferedImage` type. Again, the plugin saves all PNG files to a folder named `items-icon-runelite` in the root `runelite` folder (which has to exist).

{% highlight java %}
// Try to save the item icon image as a png
try
{
    String outName = "items-icons-runelite/"  + itemID + ".png";
    File outputFile = new File(outName);
    BufferedImage iconImage = itemManager.getImage(itemID);
    ImageIO.write(iconImage, "png", outputFile);
} catch (IOException e) {
    e.printStackTrace();
}
{% endhighlight %}

Saving the image was the final part of the RuneLite plugin design. The full source code of the [ItemScraperPlugin.java](https://github.com/osrsbox/runelite/blob/osrsbox-plugins/runelite-client/src/main/java/net/runelite/client/plugins/itemscraper/ItemScraperPlugin.java) is provided on my GitHub repository. It is much easier to read the code in completed format - so make sure to have a look.

## Writing a Item Search Web Application

After getting an up-to-date list of item ID numbers and names, it was possible for me to make an item ID and item name search tool using the [summary.json](https://www.osrsbox.com/osrsbox-db/summary.json) file. Aside from an up-to-date item list, it was important that the item ID and item search was fast and responsive. I am never a fan of re-inventing the wheel, so the first objective was to find a decent library for building a table solution to handle the following requirements:

- Handle loading 20,000+ rows in a table
- Fetching item icons from the [OSRSBox Database project]({{ site.url }}/projects/osrsbox-db/)
- Support pagination to split large numbers of search hits across multiple pages
- Support live search
- Support column sorting/ordering

Yeah... based on those requirements I wasn't going to write the JavaScript by myself. A work colleague pushed me in the right directory, a project named [DataTables](https://datatables.net/) which is a JQuery plugin for making HTML tables _the free and easy way_. Less than 40 lines of (my own) JavaScript resulted in a solution that had all the requirements I needed.

The only issue I faced was that when loading the initial table using DataTables, the item icon images crashed the web browser. I was, after all, making over 20,000 GET requests for PNG images. I discovered a simple solution on the DataTables forums (sorry, I have lost the link) to fake _lazy loading_ of the images. Problem solved! Have a look at the [`item-seach.js` file]({{ site.url }}/tools/item-search/item-search.js) if you are interested in the code.

## Conclusion

I hope you found this an entertaining and informative blog post. Looking back, this project was somewhat different from regular RuneLite plugin development like creating overlays - but I thought it was an interesting journey to document. Hopefully you have found some of the techniques and thought process interesting!

As always please leave and feedback or comments below. Always happy to hear from other avid OSRS players and developers. See you all next time!
