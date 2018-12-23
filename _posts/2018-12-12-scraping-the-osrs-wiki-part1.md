---
layout: post
title: "OSRSBox | Blog | Scraping the Old School RuneScape (OSRS) Wiki - Part 1"
name: "Scraping the Old School RuneScape (OSRS) Wiki - Part 1"
desc: "Understanding the MediaWiki API provided by the OSRS Wiki"
tags:
- Scraping
- Wiki
add_to_popular_list: false
thumbnail: api.png
---

This post discusses how to _"scrape"_ the [Old School RuneScape Wiki website](https://oldschool.runescape.wiki/) (referred to as the OSRS Wiki in the remainder of this post). However, the technique discussed in this blog post is not really scraping... rather, it leverages the MediaWiki API to query and parse the OSRS Wiki contents. This is, in my opinion, much more effective than _scraping_ the website content, as the wiki contents are (somewhat!) structured. Say what?! Simply put:

- Using the MediaWiki API: You can get more structured, less messy data
- Using web scraping: You get less structured, more messy data

The remainder of this post is divided into sections that discuss how to extract useful data from the OSRS Wiki with a collection of useful examples of API URLs, which can be tested by copy/pasting into a web browser, or added to a program to automate data extraction.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## OSRS Wiki Terms of Use

As outlined, this post discusses extracting data from the OSRS Wiki. Since we are using their service and data/content, it is important to take two specific things into consideration:

1. **Adhere to their Copyright**. The [OSRS Wiki Copyright page](https://meta.weirdgloop.org/w/Meta:Copyrights) includes the following information: _Except where otherwise specified, the article revisions on these wikis on and after 1 October 2018 are licensed under [Creative Commons BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)._ Make sure you read and understand this license.
1. **Adhere to considerate use of their API**. I asked a question about [API and terms of use](https://oldschool.runescape.wiki/w/Forum:API_and_terms_of_use?t=20181103014443) on the OSRS Wiki which they answered and specified some requirements: 1) Adhere to rate limiting, 2) Use a custom user agent; 3) Be reasonable with the number of requests you perform. Although there are no specific guidelines on API usage (at the time of writing this post) - exercise good judgment. Remember, a small group of developers host this content free of charge for the community and we should respect their service and data/content.

## Background: Wikis, Scraping and MediaWiki API

It is prudent to first discuss the technology that powers the OSRS Wiki. The OSRS Wiki was previously hosted by Wikia (also known as Fandom) which is a free wiki hosting service. Wikia is exceptionally popular, hosting hundreds of thousands of wikis for a huge variety of topics. Wikia utilizes the open-source MediaWiki software to create and manage the wikis they host. This is a key aspect... and means that the previous Old School RuneScape wiki was hosted on the open source MediaWiki software. However, the [OSRS Wiki admins recently announced that they migrated off Wikia](https://www.reddit.com/r/2007scape/comments/9kqum1/old_school_runescape_wiki_leaving_wikia_now_live/) and moved to an independently hosted Wiki. However, the new [OSRS Wiki](https://oldschool.runescape.wiki/) is also powered by MediaWiki. 

So we know what a Wiki is and how it is powered. But what is an API? And what is scraping? Some readers may be new to these concepts, so it is important to summarize them. **Web scraping** is a method to extract data from websites - which is usually an automated process. You write a simple program, give it a list of URLs of web pages and program the functionality to extract the data that you are interested in. For example, parsing a web page and extracting an HTML table of item properties. An API, or **Application Programming Interface**, is quite complex. For the sake of this article, we will use an OSRS Wiki example. You can issue an API query to the OSRS Wiki to give you all the pages that are categorized as _Items_. Basically, we are saying: "Hey OSRS Wiki, can you please give me every page on your website that is associated with an item?". Then the OSRS Wiki will respond with a nicely structured list of pages about in-game items.

So... where is the OSRS Wiki API and how can it be used? Well, there are some convergent topics here to understand. Firstly, Wikia provides an API. To be frank, it is not very useful. If you have a look at the [Wikia API V1 documentation](http://www.wikia.com/api/v1) page you will find very limited features. I initially stopped thinking that I could use an API to query the OSRS Wiki after reading the Wikia API documentation because the functionality of the Wikia API was too limited. However, that was until I realized that Wikia uses MediaWiki. And MediaWiki has an excellent API, and excellent [API documentation](https://www.mediawiki.org/wiki/API:Main_page). Since the OSRS Wiki left Wikia, this doesn't matter anymore... Nevertheless, the new OSRS Wiki also uses MediaWiki. This Wiki stuff may seem obvious for many people, but I had never really been exposed to wikis and had never installed or managed one. Anyway, after a quick look at the MediaWiki API documentation and tutorials, I suddenly realized the power of the API.

## MediaWiki API

The [MediaWiki Wiki](https://www.mediawiki.org/wiki/API:Main_page) provides exception documentation on their API. However, it still took me a little while to start getting used to writing useful API queries, especially since there were no examples specifically for the OSRS Wiki. It was even worse because the old OSRS Wikia site had a strange (maybe old) version of the API. The new OSRS Wiki seems to run a newer version and the examples in the API documentation will mostly work without modification. Anyway, I thought it would be useful to share the knowledge I gained. Here is a quick overview of how to use the MediaWiki API specifically for the OSRS Wiki...

The OSRS Wiki has a base URL of:

{% highlight python %}
https://oldschool.runescape.wiki/
{% endhighlight %}

When you enter this URL, you will be directed to the [OSRS Wiki](https://oldschool.runescape.wiki/) home page (landing page). To access the MediaWiki API, you need to append `api.php` to the end of the base URL, as demonstrated below:

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php
{% endhighlight %}

Entering this URL will load a page on the OSRS Wiki and provide you with some documentation about the MediaWiki API, including some of the features available. It is a pretty large documentation page and has a lot of information. But I find the official [MediaWiki Wiki documentation](https://www.mediawiki.org/wiki/API:Main_page) on the API to be much easier to navigate - and it has excellent interactive examples.

### Using the MediaWiki API

To use the MediaWiki API you need to build a URL that includes the base API URL with additional _actions_ and _parameters_. I like to think of the process like asking the OSRS Wiki questions. Below is an example of a _query action_. As the name implies, this action queries (or asks) the API questions and is returned results. In the example below, the query asks the OSRS Wiki for the specific page which matches the title of _Abyssal whip_.

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=Abyssal_whip
{% endhighlight %}

We should break down this example a little to understand what is happening:

- `https://oldschool.runescape.wiki/api.php?`: The base API URL, anything after the question mark will contain the _action_ and other _parameters_
- `action=query`: The _action_ to perform, in this case, a _query_
- Any remaining parameters should be appended after the _action_ using an ampersand character (`&`)
- `prop=revisions`: Get the most recent revision (the latest edit)
- `rvprop=content`: Get the actual content of the page
- `titles=Abyssal_whip`: The title of the page to query

The query above fetches the contents of the OSRS Wiki page for the [Abyssal whip](https://oldschool.runescape.wiki/w/Abyssal_whip). I would recommend opening the API query and the actual web page for the Abyssal whip and comparing the contents. You should be able to determine that the content of the two pages are the same but in a different format. The difference:

- The API query returns the structured data for the MediaWiki software to build the actual web page
- The wiki uses the structured data to build a beautiful and visually pleasing web page for the delivery of content to end users

We should look at another, more powerful example. In this example, we will use another _action_, this time the _opensearch_ action. This action allows us to search the entire OSRS Wiki for keywords on page titles (not actual page content). In the example below, the action searches for any page on the OSRS Wiki that contains the title _abyssal_.

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=opensearch&search=abyssal&format=json&limit=20
{% endhighlight %}

If you open this API URL in another browser window you should see the following result:

{% highlight plaintext %}
[
  "Abyssal",
  [
    "Abyssal",
    "Abyssal whip",
    "Abyssal Sire",
    "Abyssal demon",
    "Abyssal Sire/Strategies",
    "Abyssal dagger",
    "Abyssal tentacle",
    "Abyssal bludgeon",
    "Abyssal guardian",
    "Abyssal walker",
    "Abyssal book",
    "Abyssal leech",
    "Abyssal orphan",
    "Abyssal portal",
    "Abyssal demon head (mounted)",
    "Abyssal head",
    "Abyssal bracelet",
    "Abyssal Nexus",
    "Abyssal Area",
    "Abyssal demon head (stuffed)"
  ],
  [
    "https://oldschool.runescape.wiki/w/Abyssal",
    "https://oldschool.runescape.wiki/w/Abyssal_whip",
    "https://oldschool.runescape.wiki/w/Abyssal_Sire",
    "https://oldschool.runescape.wiki/w/Abyssal_demon",
    "https://oldschool.runescape.wiki/w/Abyssal_Sire/Strategies",
    "https://oldschool.runescape.wiki/w/Abyssal_dagger",
    "https://oldschool.runescape.wiki/w/Abyssal_tentacle",
    "https://oldschool.runescape.wiki/w/Abyssal_bludgeon",
    "https://oldschool.runescape.wiki/w/Abyssal_guardian",
    "https://oldschool.runescape.wiki/w/Abyssal_walker",
    "https://oldschool.runescape.wiki/w/Abyssal_book",
    "https://oldschool.runescape.wiki/w/Abyssal_leech",
    "https://oldschool.runescape.wiki/w/Abyssal_orphan",
    "https://oldschool.runescape.wiki/w/Abyssal_portal",
    "https://oldschool.runescape.wiki/w/Abyssal_demon_head_(mounted)",
    "https://oldschool.runescape.wiki/w/Abyssal_head",
    "https://oldschool.runescape.wiki/w/Abyssal_bracelet",
    "https://oldschool.runescape.wiki/w/Abyssal_Nexus",
    "https://oldschool.runescape.wiki/w/Abyssal_Area",
    "https://oldschool.runescape.wiki/w/Abyssal_demon_head_(stuffed)"
  ]  
]
{% endhighlight %}

We should break down this example a little to understand what is happening:

- `https://oldschool.runescape.wiki/api.php?`: The base API URL, anything after the question mark will contain the _action_ and other _parameters_
- `action=opensearch`: The _action_ to perform, in this case, an _opensearch_
- Any remaining parameters should be appended after the _action_ using an ampersand character (`&`)
- `search=abyssal`: The search term used
- `format=json`: Return the results in JSON format (not the default XML format)
- `limit=20`: Return up to 20 search results (the default is 10, and the OSRS Wiki seems to limit this to 20 maximum)

As you can see by the output of the search, the API search found a collection of pages on the OSRS Wiki that contain the keyword _abyssal_. We could write a simple program to iterate (loop) through each of the results and grab the page contents (using the first query we looked at). To use the result, we could visit the actual web page using the following logic (in pseudo code):

{% highlight plaintext %}
"https://oldschool.runescape.wiki/w/" + page_title
{% endhighlight %}

To use the API to fetch the contents of each of the pages found we could use the following API URL:

{% highlight plaintext %}
"https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=" + page_title
{% endhighlight %}

For example:

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=Abyssal_tentacle
{% endhighlight %}

Note: In the above example, we should replace the spaces in the returned search result with the underscore character (`_`) to correctly query the page title, but you are not forced to perform this change and from my experience, the API will still load correctly without this change.

### MediaWiki API: Data Formats

According to the [MediaWiki API documentation](https://www.mediawiki.org/wiki/API:Data_formats), there used to be support for a variety of different output formats. The documentation states that this complicated development and the current roadmap of development is to standardize to only support JSON. However, they do still support XML and PHP generic outputs. From my investigation, it seems that by default the new OSRS Wiki returns JSON formatted data. In the old OSRS Wiki, if you wanted JSON formatted data, you had to append a `&format=json` to the end of the query, for example:

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=Abyssal_tentacle&format=json
{% endhighlight %}

It is really up to you what data format you wish to use, but I would recommend using JSON as it is widely supported by many programming languages and very easy to parse. It is also very easily read by humans compared to some of the other data formats.

## Example API URLs for the OSRS Wiki

This section documents some interesting API URLs for executing against the OSRS Wiki. For each example, a brief description has been provided, as well as the actual URL required. I would recommend reading the description and trying the example URL in a web browser to get an idea of the results returned.

### Get Page Contents

You may find it useful to query a specific page and get the actual page content about any page in the OSRS Wiki. The following URL provides an example of how to get the actual page content for the Abyssal tentacle including: 

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=Abyssal_tentacle&format=json
{% endhighlight %}

- `action=query`: The _action_ to perform, in this case, a _query_
- `prop=revisions`: Get the most recent revision (the latest edit)
- `rvprop=content`: Get the actual content of the page
- `titles=Abyssal_tentacle`: The title of the page to query

### Get Page Templates

The OSRS Wiki utilizes a variety of templates to produce structured data. For example, the OSRS Wiki using _Infoboxes_ to display data about items or npcs. Take the example image below which displays two different Infoboxes for the Abyssal whip item.

{% include figure.html path="blog/osrs-wiki/templates.png" alt="OSRS Wiki Template Examples" class="mx-auto" %}

The Infobox on the left is an _Infobox Item_ template that displays information about an item including high alchemy, low alchemy, release date, and members item status. While the Infobox on the right is an _Infobox Bonuses_ template that displays the stats, or item bonuses, that a specific item has. The Infoboxes vary throughout the OSRS Wiki, but these two examples are commonly seen for items.

To extract a list of templates used on a specific page, you can query a page by the title and then specify that you want the _templates_ used. 

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=3rd_age_pickaxe&prop=templates
{% endhighlight %}

- `action=query`: The _action_ to perform, in this case, a _query_
- `prop=revisions`: Get the most recent revision (the latest edit)
- `rvprop=content`: Get the actual content of the page
- `titles=3rd_age_pickaxe`: The title of the page to query
- `prop=templates`: Specify you want to fetch a list of the templates used on the page

If you do not want to _programmically_ determine the template, you can easily get the template name using the _Edit_ function on the OSRS Wiki. If you select the _Edit_ button on any page, then click on the area that you think is a template, a box will highlight the template and display the name. See the image below for an example:

{% include figure.html path="blog/osrs-wiki/template-type.png" alt="OSRS Wiki Template" class="mx-auto" %}

### Extract All Categories

Wikis are usually organized into categories and each page is tagged with specific categories. This allows a specific page, or topic, to be associated with a variety of different categories. The following URL lists the first 500 categories available on the OSRS Wiki:

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&aclimit=500&list=allcategories&format=jsonfm&formatversion=2
{% endhighlight %}

- `action=query`: The _action_ to perform, in this case, a _query_
- `aclimit=500`: Get the first 500 categories
- `list=allcategories`: Get the actual list of categories
- `format=json`: Ask for the returned data to be in JSON format

## Conclusion

Well done if you made it this far! This post just _scraped_ the surface (pun intended) of using the OSRS Wiki API. Hopefully, you got some useful information from it but just remember, please adhere to the OSRS Wiki terms of use. They provide an excellent _ad free_ resource and we should not overuse their service. In the next post, I will include some more information on using Python programs to extract data from the OSRS Wiki. You can also check out some Python tools I have written to extract data from the OSRS Wiki for my OSRS Item Database project (osrsbox-db). They are available on my [OSRSBox GitHub database repository](https://github.com/osrsbox/osrsbox-db/tree/master/wiki_extraction_tools). Until next time... happy scaping everyone!
