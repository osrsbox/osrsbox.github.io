---
layout: post
title: "OSRSBox | Blog | Scraping the Old School RuneScape (OSRS) Wiki - Part 3"
name: "Scraping the Old School RuneScape (OSRS) Wiki - Part 3"
desc: "Extracting MediaWiki Wikitext and Infobox Information from the OSRS Wiki"
tags:
- Scraping
- Wiki
add_to_popular_list: false
thumbnail: api.png
---

This post discusses how to extract data _scraped_ from the [Old School RuneScape Wiki](https://oldschool.runescape.wiki/) (referred to as the OSRS Wiki in the remainder of this post). This post is the third in the part of a series! In my first post, [Scraping the Old School RuneScape (OSRS) Wiki - Part 1]({% post_url 2018-12-12-scraping-the-osrs-wiki-part1 %}), we covered the basic principles of the MediaWiki API and how it relates to the OSRS Wiki. In my second post, [Scraping the Old School RuneScape (OSRS) Wiki - Part 2]({% post_url 2018-12-13-scraping-the-osrs-wiki-part2 %}), we looked at automating API queries using simple Python scripts.

This post continues the journey about the OSRS Wiki API. This time, we are looking at extracting raw wikitext from the OSRS Wiki - this is the structured text that makes up the content of the wiki. Then we look at parsing information from the raw wikitext - specifically, extracting the information in the commonly used Infoboxes used throughout the wiki. To give you an idea of what we are trying to do, below is a screenshot of an Infobox that holds the bonuses (stats) for a specific item - in this case, the _Abyssal tentacle_. We are going to investigate how to automate the extraction of the data held within this object.

{% include figure.html path="blog/osrs-wiki/template-type.png" alt="Example of OSRS Wiki Infobox for Item Bonuses" class="mx-auto" %}

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## OSRS Wiki Terms of Use

As outlined, this post discusses extracting data from the OSRS Wiki. Since we are using their service and data/content, it is important to take two specific things into consideration:

1. **Adhere to their Copyright**. The [OSRS Wiki Copyright page](https://meta.weirdgloop.org/w/Meta:Copyrights) includes the following information: _Except where otherwise specified, the article revisions on these wikis on and after 1 October 2018 are licensed under [Creative Commons BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)._ Make sure you read and understand this license.
1. **Adhere to considerate use of their API**. I asked a question about [API and terms of use](https://oldschool.runescape.wiki/w/Forum:API_and_terms_of_use?t=20181103014443) on the OSRS Wiki which they answered and specified some requirements: 1) Adhere to rate limiting, 2) Use a custom user agent; 3) Be reasonable with the number of requests you perform. Although there are no specific guidelines on API usage (at the time of writing this post) - exercise good judgment. Remember, a small group of developers host this content free of charge for the community and we should respect their service and data/content.

## Extracting Wikitext from an OSRS Wiki Page

In order to extract information for a specific OSRS Wiki page, you must have the title of the page. You could also use the page ID instead of the title, but I think the page title is more effective as the OSRS Wiki uses the in-game name as the title for most items, npcs, and quests. This means that (most of the time!) getting the correct page is relatively straight-forward. You can also programmatically extract lists of page titles from the OSRS Wiki. For example, by querying categories, such as the _Items_ category which will return page titles as one of the results. 

I almost forgot! ... Wikitext?!?! What is it? According to [the MediaWiki wiki](https://www.mediawiki.org/wiki/Wikitext), wikitext is a document written in a markup language. HTML is also a markup language... and HTML and wikitext follow the same principles. Markup languages provide the ability to format plain text. For example, an HTML document is written in plain text, and you can format elements such as headings using the `<h1>` HTML tag. Wikitext is very similar but uses a different syntax than HTML. In contrast, a document format such as Microsoft Office Word, or `.docx` file is not plaintext... if you open a `.docx` file in Notepad or similar text editor, it will be gibberish!

So how do you get wikitext? This can range from simple to complex. To provide a simple example first - you can see the raw wikitext for any page on the OSRS Wiki by selecting the _Edit source_ button on the top of each page in the wiki. **Warning:** Take care using this method, as this opens an editor to change the page contents which you should only do if you are seriously editing the wiki page. A warning note is supplied stating that edits are logged. Please keep our OSRS Wiki beautiful.

A visual example is displayed below with the _Edit source_ and _wikitext_ highlighted in red. Note the unique structure of the text.

{% include figure.html path="blog/osrs-wiki/osrs-wiki-example-wikitext-editor.png" alt="Example of OSRS Wiki wikitext in built-in editor" class="mx-auto" %}

Obviously, we do not want to grab this information from the website and parse it... we should query the API and ask for the wikitext for a specific page. We covered this in part 1 of this series, but to reiterate... you can query the OSRS Wiki API and ask for wikitext using the following URL below. The example below parses the wikitext for the _Abyssal tentacle_ item page.

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=parse&prop=wikitext&format=json&page=Abyssal_tentacle
{% endhighlight %}

When you enter the URL into your browser, you can get an idea of how the returned data will be structured. It is a very simple JSON structure with only a couple of entries, but lots of information. Below is an example of the query being run in the Mozilla Firefox browser. Note how the data in both of these data sources generally looks the same! In addition, at this time, note how there is a specific JSON entry called `wikitext`.

{% include figure.html path="blog/osrs-wiki/osrs-wiki-api-example-wikitext.png" alt="OSRS Wiki API Query Example in JSON" class="mx-auto" %}

### Updated Python Example to Extract Wikitext

So far we have covered the data format of the OSRS Wiki (which is very similar to any MediaWiki based wiki). We have also outlined an example query using the API to extract the raw wikitext. Next, we are going to update the Python script we used in the last post to fetch wikitext instead of page titles (see [Scraping the Old School RuneScape (OSRS) Wiki - Part 2]({% post_url 2018-12-13-scraping-the-osrs-wiki-part2 %})). 

To start, we must update the API URL we require to get the wikitext. To accomplish this we need to update the API parameters, therefore, we will update the `parameters` dictionary object we constructed last time. This is quite easy, as we simply need to update the values to match the URL we used in the above example. The updated parameters are listed below. Please take the time to compare these values to the API URL we tested before.

{% highlight python %}
parameters = {
    'action': 'parse',
    'prop': 'wikitext',
    'format': 'json',
    'page': 'Abyssal_tentacle'
}
{% endhighlight %}

Some important differences... This time we have an `action` of `parse` instead of `query`. We set the `prop` to fetch us `wikitext`. The format is JSON, as usual. And the `page` parameter is set to `Abyssal_tentacle` but could be replaced with the title of any OSRS Wiki page.

We do not need to change anything else from our original script. The full script is provided below for reference. Make sure to update the `custom-agent` field as discussed in part 2 of this series. This is important, as it allows us to send information about ourselves with the API queries (be nice to the OSRS Wiki admins!).

{% highlight python %}
import requests

# Construction custom user-agent for query
custom_agent = {
    'User-Agent': 'some-agent',
    'From': 'name@domain.com' 
}

# Construct the parameters of the API query
parameters = {
    'action': 'parse',
    'prop': 'wikitext',
    'format': 'json',
    'page': 'Abyssal_tentacle'
}

# Call the API using the custom user-agent and parameters
result = requests.get('https://oldschool.runescape.wiki/api.php', 
                        headers=custom_agent, 
                        params=parameters).json()

print(result)
{% endhighlight %}

Right at the end of the script, we print the data contained in `result` to the screen. But this is not very useful as it is a blob of text. It would be much more beneficial if we could process the data and extract useful information. But we shouldn't parse the data manually... we should use a library to help us.

## Parsing Infobox Templates from Wikitext

Luckily for us, the wikitext format used by MediaWiki is widely used and supported. I could not find an official wikitext parser or an API parameter that worked well with the Infoboxes on the OSRS Wiki... but there are numerous parsers available for a huge variety of different programming languages. The [MediaWiki wiki has a great post on Alternative parsers](https://www.mediawiki.org/wiki/Alternative_parsers). 

Since I prototype program in Python, and the previous posts focus on Python solutions, it makes sense to choose a wikitext parser library for Python. I trialed a variety of solutions but ended up picking a library called [mwparserfromhell](https://github.com/earwig/mwparserfromhell/). The full name for the library is _MediaWiki Parser from Hell_. It is a simple, but powerful tool. It supports Python 2 and Python 3, and provides built-in support for parsing wikitext, and more importantly, wikitext templates! This makes it very easy to process wikitext data.

### Setting Up MediaWiki Parser From Hell

Like my previous post, this is a very brief summary of how to get up and running with `mwparserfromhell` using Python. Check the [mwparserfromhell GitHub documentation](https://github.com/earwig/mwparserfromhell/) for more information.

Start by installing the `mwparserfromhell` library using `pip`.

{% highlight plaintext %}
pip3.7 install mwparserfromhell
{% endhighlight %}

If you have a different version of Python installed (e.g., Python 3.5) you will need to specify a different `pip` executable (e.g., `pip3.5`). If you are on Windows, just add the `.exe` extension. An easy way to find your `pip` version, is type `pip` then press the `Tab` key twice to list the executables available. If a `pip` executable is not found using this method, it might not be installed on your system, or `pip` is not available in your environment variables path.

### Extend the Original wikitext Extraction Script

We are now going to start adding to the existing Python script that we previously started. The basic logic of the script is:

1. Fetch the wikitext from a specific OSRS Wiki page
1. Read in the raw wikitext
1. Parse the wikitext for templates
1. Find the template of interest (based on the template name)
1. Extract data from the template

So far we have only accomplished the first step. Luckily, the `mwparserfromhell` library will do most of the other steps for us. Open the previously authored script in your preferred text editor or Python IDE. Right at the top of the file, add another import statement for our new wikitext library. Enter in the following line:

{% highlight python %}
import mwparserfromhell
{% endhighlight %}

Now what we want to do is grab the wikitext data from the original `result` variable. The wikitext is nested in a JSON structure in the following location:

{% highlight python %}
data = result["parse"]["wikitext"]["*"]
{% endhighlight %}

In the code above, we simply access the required dictionary keys to get the raw wikitext data. If you look back at the returned JSON data, you will be able to see how the code above translates to the data that is stored in the `result` variable. 

Next, we want to call the `mwparserfromhell` library to parse (read) the raw wikitext. Since this library was designed to handle raw wikitext, this will make the process of extracting the data relatively straight-forward. The syntax is pretty easy and is copied from the project documentation. 

{% highlight python %}
wikicode = mwparserfromhell.parse(data)
{% endhighlight %}

This line reads in the wikitext to a new variable named `wikicode`. From here we have an actual object that we can manipulate easier. The entire goal of this process was to extract the Infobox, and we can achieve this using the templates functionality provided by the library.

To extract just the template names we can use the following code:

{% highlight python %}
templates = wikicode.filter_templates()
for template in templates:
    template_name = template.name
{% endhighlight %}

If we ran the code so far, we would get the following output:

{% highlight plaintext %}
otheruses
Infobox Item
Infobox Bonuses
!
CombatStyles
clear
Coins
GEP
Slash weapons
{% endhighlight %}

This is a list of all the templates present on the specific page we query... Remember back, we are querying the page for the _Abyssal tentacle_ item. From my experience, the useful templates on the OSRS Wiki are: `Infobox Item` and `Infobox Bonuses` which hold the item (and quest/npc) properties and item bonuses respectively. The best method I have determined for parsing a specific template is to perform a simple string comparison in the template name. For example, in the following code snippet, we check to see if the template name contains the string `infobox item` - to check if it is an infobox that is designed for holding item properties.

{% highlight python %}
templates = wikicode.filter_templates()
for template in templates:
    template_name = template.name.strip()
    print("Template name:", template_name)
    if "infobox item" in template_name.lower():
        # WE FOUND AN INFOBOX ITEM TEMPLATE!
        item_name = template.get("name").value.strip()
{% endhighlight %}

Wow! We have covered a lot of material in a short amount of time. The best method to learn about MediaWiki API queries and parsing wikitext templates is to experiment. Additionally, print statements will save you (mainly becuase Python is a loosely typed language). If you are unsure of the data held in a variable at any point, just print the variable and variable type using the `type()` function. 

The script below is a full example of the theory and practice that we have covered in this post. Remember, you could easily combine this code with other code used to extract items or categories from the OSRS Wiki... depending on what sort of data you were after.

{% highlight python %}
import requests
import mwparserfromhell

# Construction custom user-agent for query
custom_agent = {
    'User-Agent': 'some-agent',
    'From': 'name@domain.com' 
}

# Construct the parameters of the API query
parameters = {
    'action': 'parse',
    'prop': 'wikitext',
    'format': 'json',
    'page': 'Abyssal_tentacle'
}

# Call the API using the custom user-agent and parameters
result = requests.get('https://oldschool.runescape.wiki/api.php', 
                        headers=custom_agent, 
                        params=parameters).json()

# Grab the actual wikitext portion of the result
data = result["parse"]["wikitext"]["*"].encode("utf-8")

# Use mwparserfromhell to read in the wikitext
wikicode = mwparserfromhell.parse(data)

templates = wikicode.filter_templates()
for template in templates:
    template_name = template.name.strip()
    print("Template name:", template_name)
    if "infobox item" in template_name.lower():
        item_name = template.get("name").value.strip()
        item_examine = template.get("examine").value.strip()
        print("Item name:", item_name)
        print("Item examine text:", item_examine)
{% endhighlight %}

## Conclusion

This post concluded this series on _scraping_ or extracting, data from the OSRS Wiki. We covered extracting wikitext and then parsing Infobox templates to get useful data about items, monsters or quests. Like I have previously mentioned ... multiple times ... please adhere to the OSRS Wiki terms of use. They provide an excellent _ad free_ resource and we should not overuse their service. 

You can also check out some Python tools I have written to extract data from the OSRS Wiki for my OSRS Item Database project (osrsbox-db). They are available on my [OSRSBox GitHub database repository](https://github.com/osrsbox/osrsbox-db/tree/master/extraction_tools_cache). Until next time... happy scaping everyone!
