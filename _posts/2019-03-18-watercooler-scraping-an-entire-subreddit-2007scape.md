---
layout: post
title: "OSRSBox | Blog | WaterCooler: Scraping an Entire Subreddit (/r/2007scape)"
name: "WaterCooler: Scraping an Entire Subreddit (/r/2007scape)"
desc: "Getting the data to perform a historical, statistical analysis of six years of data from the Old School RuneScape (OSRS) subreddit"
tags:
- 2007scape
- Reddit
- Python
- WaterCooler
add_to_popular_list: false
thumbnail: watercooler.png
---

Yesterday I wrote a post entitled [Data is Beautiful: A Six-Year Analysis of the OSRS Reddit (/r/2007scape)]({% post_url 2019-03-17-data-is-beautiful-6-year-analysis-of-reddit-2007scape %}). Please have a read of the post - I think it is pretty interesting and worth 15 minutes of your time! Anyway, that post discussed the analysis of six years of data extracted from /r/2007scape - a subreddit for the game Old School RuneScape (OSRS). This post is the technical accompaniment to that post! Say what?! Simply - this post summarizes how I collected 5GB of uncompressed JSON data that represented every post and comment ever submitted to the /r/2007scape subreddit.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Data Extraction from Reddit

The first step to performing an analysis of an entire subreddit is to get the data to perform the analysis. After a few days of casual researching, I found numerous solutions for parsing data from the `/r/2007scape` subreddit. These solutions were for Reddit in general - but that was fine. The primary requirements I had were:

- Functionality to extract submissions (posts) and comments from a specific subreddit
- Functionality to extract a metadata representation of the original submissions and comments
- Functionality to extract historical data (back to 2013 is preferable, as that is when /r/2007scape was created)
- Functionality to automate the extraction process

I was mainly looking for a solution to scrape data from a specific subreddit. A quick search revealed [PRAW](https://pypi.org/project/praw/) - short for _Python Reddit API Wrapper_. A wrapper in Python was excellent, as Python is my preferred language. Unfortunately, after looking for a PRAW solution to extract data from a specific subreddit I found that recently (in 2018), the Reddit developers [updated the Search API](https://www.reddit.com/r/changelog/comments/7tus5f/update_to_search_api/). Looking further into the situation, [PRAW removed the `Subreddit.submissions` function](https://praw.readthedocs.io/en/v6.0.0/package_info/change_log.html) as the Reddit API no longer supported parsing submissions by date. Basically, the Reddit API changed so that you could no longer query the API for submissions between a specific date range. 

Along the way, I discovered one exceptionally interesting project dubbed the [PushShift project](https://github.com/pushshift), created and maintained by Jason Michael Baumgartner. The PushShift project provides [Reddit files](https://files.pushshift.io/reddit/) - basically a directory of data extracted from Reddit. More interestingly (for my problem), the [PushShift API](https://github.com/pushshift/api) provides enhanced functionality and search capabilities for searching Reddit comments and submissions. Basically, the PushShift API provides the ability to extract submissions and comments from a subreddit using their API. They provide the ability to extract submissions or comments for a specific subreddit between a specified date range - this was the functionality removed from the official Reddit API. Success! This was the solution I was looking for.

## Using the PushShift API

So I started performing some more research about using the PushShift API to extract data from a specific subreddit. One of the first articles I found provided an example of how to do this. I modified the API query for the /r/2007scape subreddit, and entered in the date ranges I was interested in. I ended up with the following API query below.

{% highlight plaintext %}
https://api.pushshift.io/reddit/search/submission/?subreddit=2007scape&sort=asc&ort_type=created_utc&after=1538352000&before=1541030399&size=1000
{% endhighlight %}

Try visiting the URL above it in your browser to get an idea of the data returned. I have included a screenshot below to provide an example of the JSON data structure returned by the API.

{% include figure_lightbox.html path="blog/reddit-analysis/pushshift-api-query-result.png" alt="Example output from the PushShift API query." %}

This data was excellent. It had a wide variety of metadata about the submission - everything (and more) for the project I was working on. I think it is important to further discuss the API query that leads to this data. Below is the expanded version of the same API query for better readability:

{% highlight plaintext %}
https://api.pushshift.io/reddit/search/submission/
?subreddit=2007scape
&sort=asc
&sort_type=created_utc
&after=1538352000
&before=1541030399
&size=1000
{% endhighlight %}

The first part of the API query is the API endpoint. In this case, we use `submission` are we want to search for submissions (posts). But this could easily be changed to `comment` if we wanted to query the API for comments.

- `?subreddit=2007scape`: Specify the subreddit to query, in this case: `2007scape`
- `sort=asc`: Sort all API results in ascending order
- `sort_type=created_utc`: Sort all API results using the `created_utc` property. This is the time of the submission in the UTC time zone.
- `after=1538352000`: Specify to search the API for submissions `after` the epoch timestamp of `1538352000`. This epoch value converts to Monday, October 1, 2018 12:00:00 AM.
- `before=1541030399`: Specify to search the API for submissions `before` the epoch timestamp of `1541030399`. This epoch value converts to Wednesday, October 31, 2018 11:59:59 PM.
- `size=1000`: Ask the API to return 1,000 results - this is the maximum that the PushShift API returns

This is a great API query. We could specify the subreddit to scrape data from, and specify the sort method (`sort`), the type of data to sort on (`sort_type`) and the date range (`after` and `before`). However, one caveat is the number of entries returned by a single query... in this case, the maximum for PushShift is 1000 (`size`). This means we need a program with a recursive function that can continue querying data. Based on the API and the data we want, the recursive program should iterate using the date. Specifically, each returned JSON structure has the `created_utc` timestamp in epoch format.

If you have never seen the Epoch timestamp you have been missing out! Epoch is also known as Unix time or POSIX time - [Wikipedia](https://en.wikipedia.org/wiki/Unix_time) has a good article on it. Basically, the epoch value is the number of seconds that have elapsed since 00:00:00 Thursday, 1 January 1970. You can easily convert epoch time to a human-readable date/time using an [epoch timestamp converter from FreeFormatter](https://www.freeformatter.com/epoch-timestamp-to-date-converter.html), or you will most likely find a built-in function in your favorite programming language. For example, using Python you can convert an epoch timestamp using the `datetime` module.

{% highlight plaintext %}
python3.5
{% endhighlight %}

Then run the following commands:

{% highlight plaintext %}
>>> import datetime
>>> date = datetime.datetime.fromtimestamp(1538352000)
>>> date
datetime.datetime(2018, 10, 1, 13, 0)
>>> date.strftime("%Y-%m-%d")
'2018-10-01'
{% endhighlight %}

## Scraping an Entire Subreddit

Luckily for us, well me... and you if you want to do a similar thing - I found a sample program from the PushShift project. Specifically, the original code I based my solution on was taken from [Stuck_In_the_Matrix](https://www.reddit.com/r/pushshift/comments/89pxra/pushshift_api_with_large_amounts_of_data/dwuqgf6), who posted:

<blockquote class="blockquote">
  <p class="mb-0">Generally if you are trying to scrape data from the API over a specific time period, it's better to just use the exact epoch times for the after and before parameters to get the data (responding to OP). Here is a quick script I wrote to scrape data using the API</p>
  <footer class="blockquote-footer">Stuck_In_the_Matrix, <cite title="Source Title">Genius</cite></footer>
</blockquote>

This was exactly what was needed. To extract data from a specific subreddit for a specified date period. After reviewing the original Python code from Stuck_In_the_Matrix, I made a couple of small changes but mainly put in some comments while I was reading the code... trying to get the main logic of the program. The full Python script is listed below.

{% highlight python %}
import requests
import json
import re
import time

PUSHSHIFT_REDDIT_URL = "http://api.pushshift.io/reddit"

def fetchObjects(**kwargs):
    # Default paramaters for API query
    params = {
        "sort_type":"created_utc",
        "sort":"asc",
        "size":1000
        }

    # Add additional paramters based on function arguments
    for key,value in kwargs.items():
        params[key] = value

    # Print API query paramaters
    print(params)

    # Set the type variable based on function input
    # The type can be "comment" or "submission", default is "comment"
    type = "comment"
    if 'type' in kwargs and kwargs['type'].lower() == "submission":
        type = "submission"
    
    # Perform an API request
    r = requests.get(PUSHSHIFT_REDDIT_URL + "/" + type + "/search/", params=params, timeout=30)

    # Check the status code, if successful, process the data
    if r.status_code == 200:
        response = json.loads(r.text)
        data = response['data']
        sorted_data_by_id = sorted(data, key=lambda x: int(x['id'],36))
        return sorted_data_by_id

def extract_reddit_data(**kwargs):
    # Speficify the start timestamp
    max_created_utc = 1356998400  # 01/01/2013 @ 12:00am (UTC)
    max_id = 0

    # Open a file for JSON output
    file = open("submissions.json","a")

    # While loop for recursive function
    while 1:
        nothing_processed = True
        # Call the recursive function
        objects = fetchObjects(**kwargs,after=max_created_utc)
        
        # Loop the returned data, ordered by date
        for object in objects:
            id = int(object['id'],36)
            if id > max_id:
                nothing_processed = False
                created_utc = object['created_utc']
                max_id = id
                if created_utc > max_created_utc: max_created_utc = created_utc
                # Output JSON data to the opened file
                print(json.dumps(object,sort_keys=True,ensure_ascii=True),file=file)
        
        # Exit if nothing happened
        if nothing_processed: return
        max_created_utc -= 1

        # Sleep a little before the next recursive function call
        time.sleep(.5)

# Start program by calling function with:
# 1) Subreddit specified
# 2) The type of data required (comment or submission)
extract_reddit_data(subreddit="2007scape",type="submission")
{% endhighlight %}

The last line of the script provides the entry point into the program. The script specifies how to extract submission data, not comments. If you wanted to query the API for comments, just change the last line to:

{% highlight plaintext %}
extract_reddit_data(subreddit="2007scape",type="comment")
{% endhighlight %}

It might also be useful to change the name of the output file from `submissions.json` to `comments.json` so the data is saved to the correct location. 

The way I save the data in the output files is a unique approach. It would make sense to save the output as a JSON object - well, a JSON object full of JSON objects. However, since the dataset was so large I adopted the approach of dumping one JSON object on a single line in a JSON file. That way, each line was processed and output to a file at a time and did not need to be stored in memory. It also made reading the resultant file (4GB) much simpler - as the entire JSON object did not need to be read in at once, rather each line was processed at a time.

There are a couple of small things that I think would have been useful to add:

- Add a `before` API parameter, to stop the script when a specific end date was reached. I manually did this by writing a simple Python script to discard entries after a specific date. But you could easily add a hard-coded variable into the dictionary that defines the API parameters, as displayed below:

{% highlight plaintext %}
params = {
    "sort_type": "created_utc",
    "sort": "asc",
    "size": 1000,
    "before": 1550188799
    }
{% endhighlight %}

- A little more error checking would be nice, especially on the API request. There were a lot of times that the script crashed due to too many API requests. It would be useful to handle these correctly by wrapping a `try, except` for the `request.get()` function.

When I did get an error when the script crashed, I simply reviewed the output so far. For example:

{% highlight plaintext %}
tail submissions.json
{% endhighlight %}

Found the last processed entry in the file, the updated the `max_created_utc` variable in the script, as seen below:

{% highlight python %}
def process(**kwargs):
    max_created_utc = 1356998400  # Manually pdate this value
{% endhighlight %}

- In case of errors encountered, it might have been useful to print out the `created_utc` value of the last processed submission. 

While I am writing this I am thinking that I should update my script to add this functionality - but I am not sure I will ever use it again. But if you are interested in a more robust script, please leave a comment and I will have a look back at this project.

## Conclusion

This was just a quick post that summarized how I dumped data from the /r/2007scape subreddit. The purpose was to outline how I managed to extract the data for my post entitled [Data is Beautiful: A Six-Year Analysis of the OSRS Reddit (/r/2007scape)]({% post_url 2019-03-17-data-is-beautiful-6-year-analysis-of-reddit-2007scape %}). I hope this post was of interest to you, and please leave any questions or feedback in the comments section below. Until next time - happy scaping! 
