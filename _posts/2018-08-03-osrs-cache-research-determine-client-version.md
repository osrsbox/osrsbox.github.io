---
layout: post
title: "OSRSBox | Blog | Determine OSRS Cache Version using RuneLite"
name: "Determine the OSRS Cache Version using RuneLite"
desc: "Scripts to Extract OSRS Cache Version using the (old) RuneLite Deobfuscator"
tags:
- Cache
- RuneLite
add_to_popular_list: false
thumbnail: runelite-coding.png
redirect_from:
  - /osrs-cache/
---

## Post Update (2018/09/04)

**This post is no longer relevant as the original RuneLite Deobfuscator has been removed from my GitHub osrsbox-cache repo. This is to allign with Jagex policies with the previously available RuneLite Deobfuscator. Sorry for any inconvenience - the post was written a long time ago (and later published) when the deobfuscator was still publically available.**

My previous post discussed [using Runelite to extract NPC and item definitions]( {% post_url 2018-07-26-osrs-cache-research-extract-cache-definitions %}). Leading on from this, I started performing more research and projects using the OSRS cache. One thing I really wanted to know was: _Which version of the client/cache was I working on?_ 

This post answers this question, and outlines methods and simple scripts to extract the cache version on both Windows and Linux operating systems. Both scripts are based on the _RuneLite cache updater_ that is actually no longer available - as the RuneLite deobfuscator tool is no longer released to the public. The full code to accompany this post is provided in the [osrsbox-cache GitHub repository](https://github.com/osrsbox/osrsbox-cache).

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

### Script Method

To provide some context and further information, both Windows and Linux scripts work in the same way. The script will download the latest OSRS cache version, the same way that any OSRS client would. The RuneLite deobfuscator tool will then be executed against the downloaded `.jar` client and the version number extracted. 

The script has two dependencies: 

- The RuneLite Deobfuscator tool
- Java

Unfortunately, the RuneLite deobfuscator tool is no longer public. I do have an old version (1.2.9) from December 2017 (approximately). My compiled version still detects the OSRS cache version without problems, and the compiled version is available from: [deob-1.2.9-SNAPSHOT-jar-with-dependencies.jar](https://github.com/osrsbox/osrsbox-cache/raw/master/determine_cache_version/deob-1.2.9-SNAPSHOT-jar-with-dependencies.jar). You could also have a look at older commits on the RuneLite GitHub repository and download a past version that has the deobfuscator in it. 

Using Git SCM (GitBash), or another git client, download the osrsbox-cache repository:

{% highlight bash %}
git clone https://github.com/osrsbox/osrsbox-cache.git
{% endhighlight %}

The `git clone` command will download the repository and put it is a folder named `osrsbox-cache`. Inside this folder is a sub-folder named `determine_cache_version`. The following files are provided:

- `deob-1.2.9-SNAPSHOT-jar-with-dependencies.jar`: A compiled version of the old RuneLite deobfuscator
- `osrs_cache_version.ps1`: A PowerShell script to download the latest OSRS client and check the version 
- `osrs_cache_version.sh`: A Bash script to download the latest OSRS client and check the version

Both scripts work by downloading the most recent version of the OSRS cache and using the RuneLite deobfuscator tool to check the version number on the downloaded `.jar` file. Both scripts have the same process, just written in different scripting languages: PowerShell for Windows, and Bash for Linux. 

The first step in each script is to download the `jav_config.ws` file from an Old School RuneScape server. This file provides the URL of the _codebase_ and the _initial_jar_ filename. This information is required to download the actual `.jar` file. An example of the contents of the `jav_config.ws` is provided below for informational purposes.

{% highlight bash %}
title=Old School RuneScape
adverturl=http://www.runescape.com/g=oldscape/bare_advert.ws
codebase=http://oldschool87.runescape.com/
cachedir=oldschool
storebase=0
initial_jar=gamepack_4515750.jar
initial_class=client.class
termsurl=http://www.jagex.com/g=oldscape/terms/terms.ws
privacyurl=http://www.jagex.com/g=oldscape/privacy/privacy.ws
viewerversion=124
win_sub_version=1
mac_sub_version=2
other_sub_version=2
browsercontrol_win_x86_jar=browsercontrol_0_-1928975093.jar
browsercontrol_win_amd64_jar=browsercontrol_1_1674545273.jar
download=1322814
window_preferredwidth=800
window_preferredheight=600
advert_height=96
applet_minwidth=765
applet_minheight=503
applet_maxwidth=5760
applet_maxheight=2160
msg=lang0=English
msg=tandc=This game is copyright 1999 - 2018 Jagex Ltd.\Use of this game is subject to our ["http://www.runescape.com/terms/terms.ws"Terms and Conditions] and ["http://www.runescape.com/privacy/privacy.ws"Privacy Policy].
msg=options=Options
msg=language=Language
msg=changes_on_restart=Your changes will take effect when you next start this program.
msg=loading_app_resources=Loading application resources
msg=err_verify_bc64=Unable to verify browsercontrol64
msg=err_verify_bc=Unable to verify browsercontrol
msg=err_load_bc=Unable to load browsercontrol
msg=loading_app=Loading application
msg=err_create_target=Unable to create target applet
msg=err_create_advertising=Unable to create advertising
msg=err_save_file=Error saving file
msg=err_downloading=Error downloading
msg=ok=OK
msg=cancel=Cancel
msg=message=Message
msg=copy_paste_url=Please copy and paste the following URL into your web browser
msg=information=Information
msg=err_get_file=Error getting file
msg=new_version=Update available! You can now launch the client directly from the OldSchool website.\nGet the new version from the link on the OldSchool homepage: http://oldschool.runescape.com/
msg=new_version_linktext=Open OldSchool Homepage
msg=new_version_link=http://oldschool.runescape.com/
param=4=1
param=2=ElZAIrq5NpKN6D3mDdihco3oPeYN2KFy2DCquj7JMmECPmLrDP3Bnw
param=6=0
param=18=true
param=13=41141
param=7=387
param=1=https://auth.jagex.com/
param=17=
param=8=5
param=14=http://www.runescape.com/g=oldscape/slr.ws?order=LPWM
param=10=true
param=11=0
param=3=0
param=15=0
param=5=.runescape.com
param=16=https://payments.jagex.com/operator/v1/
param=9=1
param=12=false
{% endhighlight %}

As outlined in the code snippet above, the values of interest are:

{% highlight bash %}
codebase=http://oldschool87.runescape.com/
initial_jar=gamepack_4515750.jar
{% endhighlight %}

If we concatenate (combine) these two values, we get a full URL to download the initial `.jar` file. In this file, we can examine the contents (using the RuneLite deobfuscator) and reveal the OSRS client version number.

Calling the deobfuscator is easy once we have all the information. Basically, we run a Java command with the deobfuscator in the classpath, and specify a specific function to run against the `.jar` file we downloaded. The function required is:

{% highlight bash %}
net.runelite.deob.clientver.ClientVersionMain
{% endhighlight %}

This section was only written to provide a basic overview of how to extract the OSRS Client version number. Further information can be obtained by reviewing the code in the scripts provided.

The following two sections outline how to determine the OSRS cache version using the two scripts available, either 1) Using Windows and PowerShell, or 2) Using Linux and Bash.

### Extract the Current OSRS Cache Version (Windows Powershell)

A simple [PowerShell script](https://github.com/osrsbox/osrsbox-cache/blob/master/determine_cache_version/osrs_cache_version.ps1) is provided to download the latest OSRS cache and determine the current version number. The easiest method to run this code is to clone the entire repository. If you are using PowerShell on Windows, I would recommend using [Git SCM](https://git-scm.com/downloads) for a robust git client for Windows, however, you can use any git client.

Using Git SCM (GitBash), or another git client, download the osrsbox-cache repository:

{% highlight bash %}
git clone https://github.com/osrsbox/osrsbox-cache.git
{% endhighlight %}

Open PowerShell and navigate to the directory that you cloned the osrsbox-cache repository into. 

To run this script, you must first allow scripts to be run in PowerShell. This is disabled by default for security reasons. To enable scripts to be run for a temporary session, execute the following command:

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

As you can see, there is a line that specifies the _OSRS cache version_.

### Extract the Current OSRS Cache Version (Linux BASH)

A simple [BASH script](https://github.com/osrsbox/osrsbox-cache/blob/master/determine_cache_version/osrs_cache_version.sh) is provided to download the latest OSRS cache and determine the current version number. The easiest method to run this code is to clone the entire repository. If you are using a Debian-based Linux distribution, for example Ubuntu, I would recommend installing `git` from the distribution repositories using `apt`. The following command will achieve this:

{% highlight bash %}
sudo apt install git
{% endhighlight %}

Now download the osrsbox-cache repository:

{% highlight bash %}
git clone https://github.com/osrsbox/osrsbox-cache.git
{% endhighlight %}

If you don't already have Java, the easiest option for installing Java on a Debian-based Linux distribution is installing the version packaged with the distribution repositories using `apt`. Specifically, this will install OpenJDK 8 on Ubuntu Linux, using the most recent and recommended version.

{% highlight bash %}
sudo apt-get install default-jdk
{% endhighlight %}

Make sure you are in the osrsbox-cache directory, and `determine_cache_version` sub-folder. Now invoke the script using the following command:

{% highlight bash %}
./osrs_cache_version.sh
{% endhighlight %}

The output from the script will be similar to that displayed below. The second to last line of the script output will display the current OSRS cache version.

{% highlight bash %}
>>> Starting...
  > Downloading: jav_config.ws
  > Download sucessful.
  > Base URL used: http://oldschool87.runescape.com/
  > Initial JAR file for download: gamepack_6150845.jar
  > Downloading: http://oldschool87.runescape.com/gamepack_6150845.jar
  > Download sucessful.
  > OSRS version: 172
{% endhighlight %}

As you can see, there is a line that specifies the _OSRS cache version_.

## Conclusion

I hoped this tutorial helped you find the OSRS Client cache version. Please note: This code and the associated resources should not be used maliciously. This information is provided only for learning purposes. Stay legitimate and keep OSRS safe! I only use this information for placing a specific OSRS client version on my OSRSBox Database project. If you have any comments, feedback or notice any errors please post a comment below. Thanks!
