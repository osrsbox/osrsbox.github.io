---
layout: post
title: "OSRSBox | Blog | Getting Old Versions of the OSRS Cache"
name: "Getting Old Versions of the OSRS Cache"
desc: "Where to get old (historical) versions of the Old School RuneScape cache"
tags:
- Cache
- Tool
add_to_popular_list: false
thumbnail: osrs-coding.png
---

This post discusses a variety of places to get old (historical) versions of the OldSchool RuneScape (OSRS) cache. So, why would you want an old version of the cache? I have two reasons, but there might be more! Reason 1: You want to use my ModelDumper tool but don't have an old version of the cache (PS. trying to fix this tool at the moment). Reason 2: You want to look at data in the cache at a certain point in time. One example, someone recently asked me how to get the cache from December 2017 - to get info/models about the Christmas event (which is only in a specific cache version, then was removed from the game).

Regardless of your reason, here is a bunch of options available to get old versions of the OSRS cache. Included in each option will be a summary of how long the cache goes back to, and how to get the data. These are listed from easiest to hardest!

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Option 1: RuneStats Archive

- Start date: 2018-02 (rev163)
- End date: Current (rev190)

The RuneStats website provides an archive of cache downloads as `.tar.gz` files. You simply need to visit the web site, download the file, then extract it using `tar` or something like `7zip`. Done! The website is available from:

{% highlight python %}
https://archive.runestats.com/osrs/
{% endhighlight %}

## Option 2: RuneLite Test Cache

- Start date: 2018-03 (rev165)
- End date: Only one cache version

After messing around with RuneLite a little, I noticed that the tool downloaded a specific revision of the cache to perform testing on. I haven't figured out where/how it downloads the cache version from - but hopefully will figure it out and post about it later. Anyway, when you compile the `cache` project specifically, a `cache-165` folder is created in temporary storage on your system. In my Linux-based system, the folder is located in:

```
/tmp/cache-165
```

Just some quick notes about how to get this cache version... In this example, I am using Linux and the `mvn` (Maven) command to build the project. The same thing can be done on Windows using something like IntelliJ (but no instructions are provided). If you already have the RuneLite project setup with a local development build this is easy. Try the following steps:

- Change to the `runelite/cache` folder
- `cd runelite/cache`
- Build the project and include tests
- `mvn install`
- Check out your `/tmp` folder
- `ls -lisa /tmp`
- You should see the `cache-165` folder

As a side note, and to document it here for me in the future... The [`StoreLocation.java` file](https://github.com/runelite/runelite/blob/master/cache/src/test/java/net/runelite/cache/StoreLocation.java) seems to control the cache test setup.

## Option 3: AbexTM's FlatCache Archive

- Start date: 2017-05 (rev140)
- End date: Current (rev190)

After searching far and wide for old versions of the OSRS cache... I stumbled across a repository from a user named Abex. The user had a repository called [osrs-cache](https://github.com/abextm/osrs-cache.git) - which seemed to have every version of the OSRS cache dating back to years ago! Interestingly, the file format used in the repository were `.flatcache`. Yeah... never heard of that before! After a little research and exploration, I found a related project from the same user named [osrs-flatcache](https://github.com/abextm/osrs-flatcache.git) that had the functionality to dump the cache, compress it and uncompress it. Optimal, just what was needed.

Having a look at the main program entry point in the `osrs-flatcache` project... it seems the `.flatcache` file format was made using a `FlatStorage` object. I found that the object was coming from a RuneLite class for handling the cache. Even more interesting! 

{% highlight java %}
package net.runelite.cache.fs.flat;
{% endhighlight %}

I didn't really investigate the `FlatStorage` class any further, but here is a link to the [`FlatStorage.java` file on the RuneLite repository](https://github.com/runelite/runelite/blob/master/cache/src/main/java/net/runelite/cache/fs/flat/FlatStorage.java). With a repository of historical OSRS cache versions, the next thing to do is get the original cache files from the compressed version. I performed the following steps on an Ubuntu 18.04 system, but you can perform this on any operating system that has Java and Maven installed. The following steps have the following prerequisites.

1. Install OpenJRE or OpenJDK, and make sure it is in your PATH
1. Install Maven, and make sure it is in your PATH
1. Install Git, and make sure it is in your PATH

To double-check everything, you should be able to open a BASH terminal, or PowerShell, and run `java` and `mvn` and see the default help menu. Start by making a new directory (folder) for this project, and changing to it.

{% highlight plaintext %}
mkdir osrs_cache
cd osrs_cache
{% endhighlight %}

Now, use `git` to download the `osrs-cache` and `osrs-flatcache` repositories.

{% highlight plaintext %}
git clone https://github.com/abextm/osrs-flatcache.git
git clone https://github.com/abextm/osrs-cache.git
{% endhighlight %}

The next step involves compiling the `osrs-flatcache` project so that we can run the code. It is a Java project with an accompanying `pom.xml` file that will do the heavy lifting for us. If you have Java and Maven installed, this will be straightforward.

{% highlight plaintext %}
mvn clean install -Dcheckstyle.skip=false
{% endhighlight %}

This process compiles the source code and produces a JAR file that can be run. The main entry point for this project is the `packer` executable, which can be found in `packer/target` after compilation. Check the `packer/src` directory for the actual source code. You can run the compiled program using:

{% highlight plaintext %}
cd packer/target
java -jar packer-1.6.10-shaded.jar
{% endhighlight %}

Without any useful command-line arguments this will print the programs help menu. As illustrated below.

{% highlight plaintext %}
download [old id] [flat cache directory]
pack [jagex cache directory] [flat cache directory]
unpack [flat cache directory] [jagex cache directory]
dump [type[,type]] [flat cache directory] [output directory or 7z]
dump types: all,underlays, kits, overlays, inventories, object_defs, enums, npc_defs, item_defs, sequences, var_bits, param_defs, interface_defs, models_raw, models, sprites, texture_defs, rs2asm, structs, _18, _19, _20
{% endhighlight %}

There are a bunch of options that are quite useful if you want to download, pack, unpack, or dump data from the cache. In this tutorial, we are only interested in decompressing, or `unpack`ing, the OSRS cache `.flatcache` files. This can be achieved using the following command:

{% highlight plaintext %}
java -jar packer-1.6.10-shaded.jar unpack ../../osrs-cache/ ../../cache-data
{% endhighlight %}

This command assumes a few things. 

1. That you are in the `osrs-flatpack/packer/target` directory when you run the command
1. That the `osrs-cache` repository is already downloaded in the same directory that you downloaded the `osrs-flatpack` repository

If this is confusing. The general syntax to unpack the `.flatcache` files are:

{% highlight plaintext %}
java -jar packer-1.6.10-shaded.jar unpack <dir-with-flatcache-files> <dir-to-save-decompressed-files>
{% endhighlight %}

The `osrs-cache` repository is really useful if you want to get an older version of the OSRS cache. It is also really useful if you want a version of the OSRS cache that is compatible with the `runelite/cache` tool. There is also an interesting repository, and tool, called [`nipple` from the user Abex](https://github.com/Abextm/nipple) that can process the output from the cache. I haven't tried it, but it seems useful.

## Conclusion

I hope that this short write up was useful or informative. I am starting to get back in the writing mood, so hopefully, there will be more frequent posts on this blog. I am aiming to write up one post a week - or at least just document the OSRS coding/research/development things I am doing. This is useful to me (to have documentation of stuff) and for others (hopefully!). Until next time, happy scaping everyone!
