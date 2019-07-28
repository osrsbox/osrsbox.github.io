---
layout: post
title: "OSRSBox | Blog | Building RuneLite on the Terminal using Maven"
name: "Building RuneLite on the Terminal using Maven"
desc: "A tutorial of how to build and run the RuneLite client on Ubuntu Linux using the mvn command."
tags:
- Client
- RuneLite
- Linux
add_to_popular_list: false
thumbnail: osrs-coding.png
---

For a while now, I have been casually working with the [RuneLite project](https://github.com/runelite/runelite). Mostly I write plugins for extracting or gathering data from Old School RuneScape (OSRS). Some examples are extracting item information, dumping information about other players equipment, and extracting NPC world location information. If you have read any of my other blog posts, you have probably noticed how much I like gathering and analyzing data!

{% include figure_lightbox.html path="blog/runelite-maven/runelite-maven.png" alt="Building/Compiling RuneLite using Maven." %}

Along the way I have done lots of part-time researching, reading and gaining knowledge about Java. I had never really programmed in Java or had much experience with general best practices, project structure, and building projects. I just went headfirst trying RuneLite development using the IntelliJ IDE, because that's what the [RuneLite Wiki](https://github.com/runelite/runelite/wiki/Building-with-IntelliJ-IDEA) suggested. This has worked fine for a long time, but I have just moved city, am traveling and living out of a suitcase. This means that I no longer have a powerful Desktop computer... so I have been starting to change my development workflow. Enter a new need: how to easily compile RuneLite and have access to my compiled version on my very-minimum-specs laptop. This post outlines how I compile and run the RuneLite client development version using Maven (the `mvn` command specifically) and run the client from the terminal.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Setting up a New Development Environment

I set up my new development environment on a laptop installed with Ubuntu 18.04.2. However, you can probably follow this tutorial on other Linux-based operating systems, and the instructions should be highly similar. I have never done a similar setup on a Windows-based machine or OS X, so there is no information covering these systems in this tutorial. 

We are going to start with the usual updating of the database of `apt` packages:

{% highlight plaintext %}
sudo apt update
{% endhighlight %}

Lucky for us... in this setup we can use software versions that are available directly using `apt`. Run the following command to install the `openjdk-8-jdk` package as it is the recommended Java version to build RuneLite, the `maven` package used to build RuneLite, as well as the `git` package to download the RuneLite source code.

{% highlight python %}
sudo apt install openjdk-8-jdk maven git
{% endhighlight %}

It is important to check that Java is installed correctly and that you are using the correct version when executing the `java` command. First, check the Java versions that are installed on your system by running: `sudo update-java-alternatives -l`. My output is provided below as a reference:

{% highlight plaintext %}
ph01l@vegas ~ $ sudo update-java-alternatives -l
java-1.11.0-openjdk-amd64      1111       /usr/lib/jvm/java-1.11.0-openjdk-amd64
java-1.8.0-openjdk-amd64       1081       /usr/lib/jvm/java-1.8.0-openjdk-amd64
{% endhighlight %}

As you can see I have two Java versions (JDK) installed. Java version 11 and Java version 8. You might only see `java-1.8.0-openjdk-amd64`. If you have two versions like me, you can use `sudo update-java-alternatives -s java-1.8.0-openjdk-amd64` to make sure Java version 8 is used by default. When ready, it is preferable to check the version used when running the `java` command by executing `java -version`. Example output is provided below:

{% highlight plaintext %}
ph01l@vegas ~ $ java -version
openjdk version "1.8.0_212"
OpenJDK Runtime Environment (build 1.8.0_212-8u212-b03-0ubuntu1.18.04.1-b03)
OpenJDK 64-Bit Server VM (build 25.212-b03, mixed mode)
{% endhighlight %}

## Download and Build the RuneLite Project

Now that we have Java ready we can download the RuneLite source code and compile the client. You should have `git` installed, as we did this in the previous step. Clone the RuneLite client repository using the following command:

{% highlight plaintext %}
git clone https://github.com/runelite/runelite.git
{% endhighlight %}

To compile the project we can use the Maven command-line tool or the `mvn` command. I had never really used Maven before, but I knew there must be some command-line tool for managing/building a Maven project. If you are new to Maven, I found [the official Apache Maven in 5 Minutes tutorial](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html) to be brief, yet sufficient documentation to get an idea of how to use it. You can use the `mvn` command to execute different Maven lifecycles such as `compile`, `test`, and `install`. These are the same lifecycles available in IntelliJ when building RuneLite.

To compile the RuneLite project, and the client, start by making sure you are in the freshly downloaded RuneLite repository. Then run the following `mvn` command:

{% highlight plaintext %}
mvn install -DskipTests
{% endhighlight %}

As a quick summary:

1. `mvn`: Is the Maven command-line tool
1. `install` is the lifecycle option which automatically compiles the source code and packages it into a JAR file
1. `-Dskiptests`: As it sounds, skip the unit tests to speed up the build time.

So what does this do?! It compiles the entire RuneLite project and creates a JAR so we can run the client. Since we are running this in the root project directory, it will build the entire project - not just the client. Maven even tells you this when you run the command above:

{% highlight plaintext %}
ph01l@vegas ~/runelite $ mvn install -DskipTests 
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] RuneLite                                                           [pom]
[INFO] Web API                                                            [jar]
[INFO] Cache                                                              [jar]
[INFO] RuneLite API                                                       [jar]
[INFO] Protocol API                                                       [jar]
[INFO] Protocol                                                           [jar]
[INFO] Cache Client                                                       [jar]
[INFO] Cache Updater                                                      [jar]
[INFO] Script Assembler Plugin                                   [maven-plugin]
[INFO] RuneLite Client                                                    [jar]
[INFO] Web Service                                                        [war]
{% endhighlight %}

My usual workflow is to just build the entire project. You could also be specific and only build the client if you are continually making changes and don't want to compile and package the entire project. To achieve this, just change into the `runelite-client` directory and run the same command: `mvn install -DskipTests`. You can also add a `-o` to use the libraries from the local repository (on your system) instead of re-downloading them again.

This build method is excellent as it is fast! A very informal test on my laptop for building the entire project:

1. Build from IntelliJ: 300 seconds
1. Build using `mvn`: 15 seconds

These tests were performed using the same build method: `install -DskipTests` and I took a guestimated average from multiple builds, and always made sure I built the project once before testing. My laptop struggles to run the IntelliJ IDE efficiently, it sounds like my laptop is a rocket trying to launch to Mars. Even on my old desktop, it was slow at loading on startup, and slow compiling the project. In comparison, the `mvn` command is fast and generally seems less resource heavy. So far, it has been working well when developing on my new minimal-specs set up.

## Running the RuneLite Client

Now that we have compiled and packaged the client, we want to run it! I mean, that was the entire point. You can find the JAR file for the RuneLite client in the `runelite/runelite-client/target` folder. This is similar to the other projects in the root `runelite` folder, each will have a `target` sub-folder with the compiled JAR file.

{% highlight plaintext %}
ph01l@vegas ~/runelite/ $ cd runelite-client
ph01l@vegas ~/runelite/runelite-client $ ll 
-rw-r--r-- 1 ph01l ph01l  3271397 Jul 28 10:59 client-1.5.30-SNAPSHOT.jar
-rw-r--r-- 1 ph01l ph01l 19246489 Jul 28 10:59 client-1.5.30-SNAPSHOT-shaded.jar
{% endhighlight %}

The client has two different versions that are compiled and packaged into JAR files, both called `client-<version-number>` and one with a suffix of `shaded`. I had no idea why this version was such a big file size, and why it was called `shaded`. After reading the `pom.xml` file for the client, I realized the [`maven-shade-plugin`](https://maven.apache.org/plugins/maven-shade-plugin/) is used to create an _uber-jar file_ with all dependencies included in the single file, which has the `shaded` suffix. So there are two options: run the non-shaded JAR and include all the dependency JAR files, or run the single, shaded JAR file. The second seems much simpler, and saves us from entering in a large number of dependencies in the classpath.

Unfortunately, the command needed is not the simple `java -jar RuneLite.jar` command that can be used to run the installed RuneLite with the launcher. This is because the launcher takes care of many details behind-the-scenes. To run the client, we will need to specify a collection of important arguments. The full command I use is:

{% highlight plaintext %}
java -ea -cp net.runelite.client.RuneLite -jar client-1.5.30-SNAPSHOT-shaded.jar --debug --developer-mode
{% endhighlight %}

As a quick summary:

1. `java`: Run the client using Java
1. `-ea`: Enable assertions
1. `-cp net.runelite.client.RuneLite`: Set the classpath to specify where the `main` method for the JAR file is loctaed
1. `-jar client-1.5.30-SNAPSHOT-shaded.jar`: Specify the JAR file to run, and use the shaded JAR file (you will need to change the version number to match the updated client)
1. `--debug`: Turn on debugging messages, which is optional but useful
1. `--developer-mode`: Turn on developer tools, which is optional but useful

This command is a bit of a nightmare to run, so I like to create a command alias to get this done. You can put the following code in your `~/.bash_aliases` or `~/.bashrc` file to start the client using an easier method:

{% highlight plaintext %}
runeliteversion=$(ls -d ~/runelite/runelite-client/target/* | grep 'shaded.jar')
alias runelite-dev="java -ea -cp net.runelite.client.RuneLite -jar $runeliteversion --debug --developer-mode"
{% endhighlight %}

With this command, you set the file path for the compiled RuneLite client version, then create an alias named `runelite-dev` to start the client. I find this a nice method, but there are probably other options available.

## Running the RuneLite Cache tool

When I read a tutorial, I like multiple examples. I find them useful. So I thought I would include an example of how to run the RuneLite Cache tool after compiling the RuneLite project using the `mvn` command.

{% highlight plaintext %}
ph01l@vegas ~/runelite/ $ cd cache
ph01l@vegas ~/runelite/cache $ ll 
-rw-r--r-- 1 ph01l ph01l  369762 Jul 28 10:59 cache-1.5.30-SNAPSHOT.jar
-rw-r--r-- 1 ph01l ph01l 5546136 Jul 28 10:59 cache-1.5.30-SNAPSHOT-jar-with-dependencies.jar
-rw-r--r-- 1 ph01l ph01l   86670 Jul 28 10:59 cache-1.5.30-SNAPSHOT-tests.jar
{% endhighlight %}

The cache tool does not have the same `shaded` version. Instead, there is a JAR file that has the `jar-with-dependencies` suffix. This tool can be run using a very similar method to what we did for the client. The command I use has been listed below for reference:

{% highlight plaintext %}
java -cp cache-1.5.30-SNAPSHOT-jar-with-dependencies.jar net.runelite.cache.Cache \
-cache ~/jagexcache/oldschool/LIVE \
-items ~/items-json
{% endhighlight %}

As a quick summary:

1. `java`: Run the cache tool using Java
1. `-cp cache-1.5.30-SNAPSHOT-jar-with-dependencies.jar net.runelite.cache.Cache`: Set the classpath and JAR file
1. `-cache ~/jagexcache/oldschool/LIVE`: Tell the cache tool where the cache is
1. `-items ~/items-json`: Dump the Item Definitions into the `~/items-json` folder

This command will run the Cache tool and dump all the Item Definition data to a folder. Then you can review the item information that is extracted directly from the game cache and stored in JSON files. 

## Conclusion

I hope you have made it this far and got an idea about how to compile RuneLite using Maven and get away from that resource-hungry IntelliJ IDE... jokes! I quite like the IntelliJ IDE, and find the syntax highlighting and other built-in features nice for helping development - expecially for a Java noob like me. But I have never been an IDE fan. Some of this tutorial may be simple if you are a Java/Maven expert, but for me, it was a learning curve and something that I could not find documented elsewhere specifically for RuneLite. So I really hope it is helpful.

If you have any questions, feedback or discovered any issues with this documentation please leave a comment below. I am happy to help if I can. And as usual, happy scaping everyone.
