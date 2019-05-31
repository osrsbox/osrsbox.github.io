---
layout: post
title: "OSRSBox | Blog | Scraping the Old School RuneScape (OSRS) Wiki - Part 2"
name: "Scraping the Old School RuneScape (OSRS) Wiki - Part 2"
desc: "Programming with MediaWiki API Queries to extract data from the OSRS Wiki"
tags:
- Scraping
- Wiki
add_to_popular_list: false
thumbnail: api.png
---

This post discusses how to automate _"scraping"_ of the [Old School RuneScape Wiki website](https://oldschool.runescape.wiki/) (referred to as the OSRS Wiki in the remainder of this post). In my last post [Scraping the Old School RuneScape (OSRS) Wiki]({% post_url 2018-12-12-scraping-the-osrs-wiki-part1 %}), we covered the basic principles of the MediaWiki API and how it relates to the OSRS Wiki. We also covered the structure of API URLs and provided a list of useful examples specifically for the OSRS Wiki.

This post continues the journey of the OSRS Wiki API. This time, we are looking at automating extraction of information from the OSRS Wiki using simple Python programs.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## OSRS Wiki Terms of Use

As outlined, this post discusses extracting data from the OSRS Wiki. Since we are using their service and data/content, it is important to take two specific things into consideration:

1. **Adhere to their Copyright**. The [OSRS Wiki Copyright page](https://meta.weirdgloop.org/w/Meta:Copyrights) includes the following information: _Except where otherwise specified, the article revisions on these wikis on and after 1 October 2018 are licensed under [Creative Commons BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)._ Make sure you read and understand this license.
1. **Adhere to considerate use of their API**. I asked a question about [API and terms of use](https://oldschool.runescape.wiki/w/Forum:API_and_terms_of_use?t=20181103014443) on the OSRS Wiki which they answered and specified some requirements: 1) Adhere to rate limiting, 2) Use a custom user agent; 3) Be reasonable with the number of requests you perform. Although there are no specific guidelines on API usage (at the time of writing this post) - exercise good judgment. Remember, a small group of developers host this content free of charge for the community and we should respect their service and data/content.

## Writing a Simple API Program

It is most likely that you do not want to manually extract data from the API - that is, by entering in URLs in your browser and copying/pasting the results! That really goes against the principles of API usage - as they allow automation of tasks using computer programs.

To start with, I think it is important to give a very simple API query example implemented in a computer program. The following example is written in the Python programming language, as it is probably the most simple language to implement this task. 

### Setting Up Python

This will be a very brief section - to run the programs in this post requires a little programming experience. To start, you obviously need to install the Python programming language. If you are a Linux user, it is likely that your Linux distribution already has Python. If you are on Windows, you will need to [download Python from the official website](https://www.python.org/downloads/). 

After installation of Python, I would recommend installing the `requests` package. Although there are other options in the standard Python library (e.g., `urllib`), I find the `requests` package easier to use. You can install the package using the Python package manager `pip`. Use the following command:

{% highlight plaintext %}
pip3.7 install requests
{% endhighlight %}

If you have a different version of Python installed (e.g., Python 3.5) you will need to specify a different `pip` executable (e.g., `pip3.7`). If you are on Windows, just add `.exe` to the end of the `pip` command (e.g., `pip3.7.exe`). An easy way to find your `pip` version, is type `pip` then press the `Tab` key twice to list the executables available. If a `pip` executable is not found using this method, it might not be installed on your system, or `pip` is not available in your environment variables path.

### A Simple Python Requests Example

The API query we are going to implement in our program is to query the categories available on the OSRS Wiki (have a look at [Scraping the Old School RuneScape (OSRS) Wiki Part 1]({% post_url 2018-12-12-scraping-the-osrs-wiki-part1 %}) if you want further information about this topic). The API URL we are going to implement is listed below - make sure to try it out in a web browser to get an idea of the results.

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&list=allcategories&format=json&aclimit=500
{% endhighlight %}

When you enter the URL into your browser, you can get an idea of what the returned data will be structured. Below is an example of the query being run in the Mozilla Firefox browser.

{% include figure.html path="blog/osrs-wiki/osrs-wiki-api-example-json.png" alt="OSRS Wiki API Query Example in JSON" class="mx-auto" %}

We are now going to start writing our Python program. Open your preferred text editor or Python IDE and enter in the following line:

{% highlight python %}
import requests
{% endhighlight %}

This line imports the `requests` library. After the import, we can use this library in our program. For example, to _request_ web resources.

Next, we will add a custom user agent. A user agent is a request header that contains unique characteristics of who or what is sending an HTTP request. For example, most web browsers have a custom agent. For example, an example of a Mozilla Firefox user agent value is:

{% highlight plaintext %}
Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0  
{% endhighlight %}

Check out the [Mozilla Development Network article on User Agents](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) if you want more information. So what is the point of adding a custom user agent? It allows you to send metadata about youself when making an API request. Adding a custom user agent is a very polite thing to do for the OSRS Wiki admins, as it lets them know who is accessing their API. If there is a problem with your API requests (e.g., frequency which increases server load and consumes too much bandwidth), they have your contact information. I usually include my email address and an identifiable user agent string. 

The code snippet below displays a Python dictionary that is populated with the `User-Agent` and `From` values. This dictionary object is later used when making the API request. In the following example, the dictionary variable is named `custom_agent`.

{% highlight python %}
custom_agent = {
    'User-Agent': 'some-agent',
    'From': 'name@domain.com' 
}
{% endhighlight %}

The next step is to construct the parameters of the query. In the last post, I discussed adding different parameters which allow us to specify what we want to request. For example, the type of action to perform (e.g., a query) and the format of the returned query (e.g., JSON). Below is an example of a query action that requests all categories available on the OSRS Wiki. This information is also stored in a Python dictionary, in this case, the dictionary is named `paramters`.

{% highlight python %}
parameters = {
    'action' = 'query'
    'list' = 'allcategories'
    'format' = 'json'
    'aclimit' = '500'
}
{% endhighlight %}

We have now finished constructing all the requirements for making the API call. The final thing we need to do is actually query the API. The following line performs the actual API request. 

{% highlight python %}
result = requests.get('https://oldschool.runescape.wiki/api.php', 
                       headers=custom_agent, 
                       params=parameters).json()
{% endhighlight %}

The `requests.get` method is specified as we want to perform an HTTP GET request... we want to _get_ data from the API! Note how we specify the base URL of the OSRS Wiki API. The second thing we include in the method call is our custom user agent, where we set the HTTP headers value (`headers`) to include our user agent dictionary variable named `custom_agent_`. The final thing we include in the method call is an inclusion of the parameters (`params`) we want to use which is in another dictionary variable named `parameters`.

One final note. We save the returned value from the HTTP GET request in an object named `result`. Since we specified (in our parameters) that we wanted JSON returned, the `results` object will be a dictionary data type (a Python dictionary is pretty much the same as JSON in Python). We can easily see the information returned from this API request by printing the `result` variable.

{% highlight python %}
print(result)
{% endhighlight %}

### Full Python Requests Example

Sometimes it can be hard to piece together code snippets. So the full Python program discussed in the previous section has been provided below:

{% highlight python %}
import requests

# Construction custom user-agent for query
custom_agent = {
    'User-Agent': 'some-agent',
    'From': 'name@domain.com' 
}

# Construct the parameters of the API query
parameters = {
    'action': 'query'
    'list': 'allcategories'
    'format': 'json'
    'aclimit': '500'
}

# Call the API using the custom user-agent and parameters
result = requests.get('https://oldschool.runescape.wiki/api.php', 
                        headers=custom_agent, 
                        params=parameters).json()

print(result)
{% endhighlight %}

## Programming with Generators and Lists

Continuing on from where we left off in the last section... we are starting with the last example API URL. We discussed that wikis are usually organized into categories and each page is tagged with specific categories. This allows a specific page, or topic, to be associated with a variety of different categories. The URL we investigated listed the first 500 categories present on the OSRS Wiki, as documented below.

{% highlight plaintext %}
https://oldschool.runescape.wiki/api.php?action=query&aclimit=500&list=allcategories&format=jsonfm&formatversion=2
{% endhighlight %}

If you paste this URL into your web browser you will see a list of 500 wiki categories in JSON format. But how can you access the next 500? Basically, if you want all the categories and not just the first 500, you will need to perform multiple queries. This is because there are more than 500 categories on the OSRS Wiki. A good method to continue the query from where it left off if to use a generator or list and loop API requests to pick up from where the last query left off. Providing an example makes this premise much easier to understand. As an example, the query performed by the extract all categories URL (listed above) will have an entry which will look like the code snippet below: 

{% highlight json %}
"continue": {
    "accontinue": "Christmas_corrupt_cluefest",
    "continue": "-||"
}
{% endhighlight %}

As you can see there is a `continue` entry which documents the next entry in the query. In this case, the `allcategories` query has an option called `accontinue` that can be used for the second API query call. It is similar to marking the page of a book you are reading. If you pick the book up at a later date, you know exactly what page you had gotten up to. It is difficult to manually continue a query, and it is recommended to use simple programs to leverage generators or lists to perform this task.

The listing below shows an example of a Python program that is specifically written to extract all of the OSRS Wiki categories without any user input. The program is listed below.

{% highlight python %}
import requests

custom_agent = {
    'User-Agent': 'some-agent',
    'From': 'name@domain.com' 
}

def query_category_items():
    for result in query_category_items_callback({'generator': 'allcategories'}):
        # Process result data
        for r in result['pages']:
            print(result['pages'][r]["title"])

def query_category_items_callback(parameters):
    parameters['action'] = 'query'
    parameters['format'] = 'json'
    parameters['list'] = 'allcategories'
    parameters['aclimit'] = '500'
    lastContinue = {}
    while True:
        # Clone original parameters
        parameters_copy = parameters.copy()
        # Modify the original parameters
        # Insert values returned in the 'continue' section
        parameters_copy.update(lastContinue)
        # Call API
        result = requests.get('https://oldschool.runescape.wiki/api.php', 
                              headers=custom_agent, 
                              params=parameters_copy).json()
        if 'error' in result:
            print(">>> ERROR!")
            break
        if 'warnings' in result:
            print(result['warnings'])
        if 'query' in result:
            yield result['query']
        if 'continue' not in result:
            break
        lastContinue = result['continue']

if __name__=="__main__":   
    # The main method, call the query method   
    query_category_items()
{% endhighlight %}

## Conclusion

This post continued on from the first post in this series about scraping or extracting, data from the OSRS Wiki API. This time we discussed how to automate the process using a simple Python program. In addition, I introduced an example of an automated script to use lists and generators - to extract data when one query is not sufficient. Like I have previously mentioned ... please adhere to the OSRS Wiki terms of use. They provide an excellent _ad free_ resource and we should not overuse their service. In the next post, I will conclude this series with an example of how to extract data from the wiki templates 

You can also check out some Python tools I have written to extract data from the OSRS Wiki for my OSRS Item Database project (osrsbox-db). They are available on my [OSRSBox GitHub database repository](https://github.com/osrsbox/osrsbox-db/tree/master/extraction_tools_wiki). Until next time... happy scaping everyone!
