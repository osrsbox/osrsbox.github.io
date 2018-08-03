---
layout: post
title: "OSRSBox | Blog | Determine OSRS Version using RuneLite"
name: "Determine the OSRS Version using RuneLite"
desc: "Scripts to Extract OSRS Cache Version using (old) RuneLite Deobfuscator"
tags:
- Cache
- RuneLite
add_to_popular_list: false
thumbnail: runelite-coding.png
redirect_from:
  - /osrs-cache/
---

My previous post discussed [using Runelite to extract NPC and item definitions]( {% post_url 2018-07-26-osrs-cache-research-extract-cache-definitions %}). Leading on from this, I started performing more research and projects using the OSRS cache. One thing I really wanted to know was: _Which version of the client/cache was I working on?_ 

This post answers this question, and outlines methods and simple scripts to extract the cache version on both Windows and Linux operating systems. Both scripts are based on the _RuneLite cache updater_ that is actually no longer available - as the RuneLite deobfuscator tool is not longer released to the public.

### Script Method

To provide some context and further information, both Windows and Linux scripts work in the same way. The script will download the latest OSRS cache version, the same way that any OSRS client would. The RuneLite deobfuscator tool will then be executed against the downloaded `.jar` client and the version number extracted. 

The script has two dependencies: 1) The RuneLite Deobfuscator tool; and 2) Java. You can compile your own version of the deobfuscator (by using the documentation above), or download a precompiled version of the deobfuscator tool from [here](http://osrsbox.com/osrsbox-cache/cache-1.4.11-SNAPSHOT-jar-with-dependencies.jar). Make sure the PowerShell script (`osrs_cache_version.ps1`) and the deobfuscator tool (`deob-1.4.11-SNAPSHOT-jar-with-dependencies.jar`) are in the same directory. Also, make sure you navigate to the correct directory in your terminal.

The following two sections outline how to determine the OSRS cache version using the two scripts available.

### Extract the Current OSRS Cache Version (Windows Powershell)

A simple [PowerShell script](http://osrsbox.com/osrsbox-cache/osrs_cache_version/osrs_cache_version.ps1) is provided to download the latest OSRS cache and determine the current version number. To run this script, you must allow scripts to be run in PowerShell. This is disabled by default for security reasons. To enable scripts to be run for a temporary session, execute the following command:

{% highlight bash %}
powershell –ExecutionPolicy Bypass 
{% endhighlight %}

Invoke the script using the following command:

{% highlight bash %}
./osrs_cache_version.ps1
{% endhighlight %}

The output from the script will be similar to that displayed below. The second to last line of the script output will display the current OSRS cache version.

{% highlight bash %}
PS C:\Users\phoil\Desktop> .\osrs_version.ps1
>>> Starting...
  > Downloading: jav_config.ws
  > Base URL used: http://oldschool90.runescape.com/
  > Initial JAR file for download: gamepack_3732011.jar
  > Downloading: http://oldschool90.runescape.com/gamepack_3732011.jar
  > Download successful
  > OSRS cache version: 160
>>> Finished.
{% endhighlight %}

### Extract the Current OSRS Cache Version (Linux BASH)

A simple [BASH script](http://osrsbox.com/osrsbox-cache/osrs_cache_version/osrs_cache_version.sh) is provided to download the latest OSRS cache and determine the current version number. Invoke the script using the following command:

{% highlight bash %}
./osrs_cache_version.sh
{% endhighlight %}

The output from the script will be similar to that displayed below. The second to last line of the script output will display the current OSRS cache version.

{% highlight bash %}
>>> Starting...
  > Downloading: jav_config.ws
  > Download successful.
  > Base URL used: http://oldschool90.runescape.com/
  > Initial JAR file for download: gamepack_8851460.jar
  > Downloading: http://oldschool90.runescape.com/gamepack_8851460.jar
  > Download successful.
  > OSRS version: 160
>>> Finished.
{% endhighlight %}