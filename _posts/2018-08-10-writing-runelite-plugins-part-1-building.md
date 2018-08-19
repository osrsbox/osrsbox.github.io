---
layout: post
title: "OSRSBox | Blog | Writing RuneLite Pulgins - Part 1 - Setting up the Development Environment"
name: "Writing RuneLite Pulgins - Part 1"
desc: "Setting up the RuneLite Development Environment"
tags:
- Plugin
- RuneLite
add_to_popular_list: true
thumbnail: runelite-coding.png
redirect_from:
  - /blog/2018/08/10/writing-runelite-plugins-part-1/
---

This post is the first in a series that documents my journey of writing plugins for the popular open-source RuneLite client for Old School RuneScape. This first post covers how I setup the build environment for RuneLite.

This tutorial is very similar to the official [Building with IntelliJ IDEA](https://github.com/runelite/runelite/wiki/Building-with-IntelliJ-IDEA) documentation provided on the [RuneLite GitHub Wiki](https://github.com/runelite/runelite/wiki). However, this post includes additional discussion on setting up the development environment for those who are new to the project. Rather than a quick start style tutorial (like on the RuneLite Wiki), this post covers topics more deeply and document some things I learnt along the way. The post is targeted to those who have programming experience, but might not be Java experts and those who have not had previous experience with the RuneLite project.

This tutorial is performed on Microsoft Windows 10, but should be adaptable to OS X or Linux, or different Windows versions.

## Installing the Recommended RuneLite Development Environment

The RuneLite authors recommend using IntelliJ IDEA as the IDE (Integrate Development Environment) of choice. Additionally, they state that the Java Development Kit (JDK) version 8 (or above). The following sections outline where to download and how to install each required component.

#### Downloading and Installing Java Development Kit (JDK)

The Java Development Kit, or JDK for short, is the Java environment required to develop and also run Java applications. To play Old School RuneScape, you most likely already have Java installed, however, it is most likely the Java Runtime Environment, or JRE for short. The JDK and JRE are not the same. The JRE is only for _running_ Java applications, while the JDK is for _developing_ or _making_ Java Applications. Therefore, you must install the JDK to build and develop the RuneLite project.

This tutorial used the Java SE Development Kit version 8u181. The download is available from the official [Java SE Development Kit 8 Downloads](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) page. Navigate to the provided URL, and download the installer for your specific operating system.

{% include figure.html path="blog/runelite-part1/jdk-download.png" alt="Download page for the JDK version 8" %}

Since I am using Windows 10, I downloaded the _Windows x64_ download option. Make sure you check the _Accept License Agreement_ button to download. The file downloaded was named: `jdk-8u181-windows-x64.exe`. The setup is simple, just install using default options.

#### Downloading and Installing IntelliJ IDEA

The [Download IntelliJ IDEA](https://www.jetbrains.com/idea/download/) website has packages for Windows, OS X and Linux. There are two version available, the _Ultimate_ and the _Community_ editions. The _Ultimate_ edition is a commercial product which requires payment but does net you extra features. We do not need these, and the RuneLite developers state that the _Community_ edition is sufficient. The _Community_ edition is released under the Apache 2.0 license, so it open source and completely free.

{% include figure.html path="blog/runelite-part1/intellij-download.png" alt="Download page for IntelliJ IDEA" %}

Download the _Community_ edition for your specific platform. Since I am using Windows 10,, I selected the **Windows (.exe)** download, to install IntelliJ IDEA on a Windows 10 system. The file downloaded was named: `ideaIC-2018.2.exe`. The setup is simple, just install using default options.

## Configuring IntelliJ and the RuneLite Development Environment

The RuneLite authors recommend using IntelliJ, and specify a number of customizations to configure the build environment after installation. After you complete the IntelliJ installation and run the IDE for the first time, you will be prompted to perform some customizations of the software. None of these are critical, but can be useful.

Firstly, there is an option to import previous settings. If you have never used IntelliJ, just select _Do not import settings_. Accept the _JetBrains Privacy Policy_. You can select whether or not to send _Usage Statistics_.

Secondly, you will be prompted to perform basic customizations, including the theme (light or dark) then install plugins. You can skip this and perform these tasks in the actual IDE itself.

{% include figure.html path="blog/runelite-part1/intellij-customize.png" alt="IntelliJ IDEA Customization" %}

IntelliJ will now start and present you with the normal _Welcome Screen_. A good option here is to download and setup the RuneLite project. This is easily achieved using the _Check out from Version Control_ and then select _Git_ from the drop down menu.

{% include figure.html path="blog/runelite-part1/intellij-welcome.png" alt="IntelliJ IDEA Welcome Screen" %}

You will be presented with a _Clone Repository_ dialog box where you can enter the URL of the RuneLite Git repository. The URL required is:

{% highlight bash %}
https://github.com/runelite/runelite.git
{% endhighlight %}

You simply need to enter the provided URL into the `URL` box. Make sure you take note of the `Directory` value. This is where the project will be downloaded to. When you are happy to proceed, click the _Clone_ button.

{% include figure.html path="blog/runelite-part1/intellij-git-checkout.png" alt="IntelliJ IDEA Clone RuneLite Git Repository" %}

If you are prompted to _create an IntelliJ IDEA project_ select _Yes_. If you are new to IDEs, a project is simply a _container_ to store all the source code of RuneLite and allows you to set specific configurations for building (compiling) and running the software.

{% include figure.html path="blog/runelite-part1/intellij-create-project.png" alt="IntelliJ IDEA create RuneLite project" %}

Next, you will be prompted to select a type of project to use. RuneLite developers have already provided a _Maven_ project structure. Maven is a tool to automate building (compiling) software written in Java. Maven helps in two main areas: Firstly, Maven describes how the source code is built (compiled); and secondly, it describes the dependencies on the source code (other software required to build RuneLite). Select _Maven_ when creating the project, as seen in the image below.

{% include figure.html path="blog/runelite-part1/intellij-maven-project.png" alt="IntelliJ IDEA create Maven project for RuneLite" %}

After selecting _Maven_ as the project, you will be presented with multiple _Import Project_ dialog boxes. These will configure the Maven project for RuneLite development. The first _Import Project_ dialog box provides a large variety of options. Although there are potential configuration options we could tweak here, just accept the defaults by clicking _Next_.

{% include figure.html path="blog/runelite-part1/intellij-project-settings.png" alt="IntelliJ IDEA create Maven project for RuneLite" %}

The IntelliJ IDE will scan the RuneLite repository we just downloaded with git and attempt to find the RuneLite _parent_ project. The outcome should be a Maven project to import named `net.runelite.runelite-parent` following by a specific RuneLite version number.

{% include figure.html path="blog/runelite-part1/intellij-import-runelite.png" alt="IntelliJ IDEA import RuneLite parent to Maven project" %}

The next step in importing RuneLite is to associate a JDK version with the project. You can see in the image below that I selected the `JDK` when adding a new `SDK`. You can get this value by left-clicking on the plus (`+`) icon, then selecting `JDK`. After selecting `JDK` you must find the location of the JDK installation on your system. This is achieved using the _Browse_ button icon. In my case, I used the default JDK installation directory on Microsoft Windows 

{% highlight bash %}
C:\Program Files\Java\jdk.1.8.0_181
{% endhighlight %}

Your installation path may vary, depending on the configuration options you selected when install the Java Development Kit (JDK). Nevertheless, when you load the correct JDK location, you should see JDK libraries load in the panel.

{% include figure.html path="blog/runelite-part1/intellij-import-jdk.png" alt="IntelliJ IDEA import RuneLite with specific JDK version" %}

The final project configuration step... You need to create the actual IntelliJ project. Simply keep the default name of _runelite_ with the default location. Keep note of the location of the project, this is where the RuneLite source code is located. Usually, by default, it is in the _IdeaProjects_ folder in your home directory. In my system, and other Windows-based systems it will be located in:

{% highlight bash %}
C:\Users\<username>\IdeaProjects\<projectname>
{% endhighlight %}

{% include figure.html path="blog/runelite-part1/intellij-import-project-name.png" alt="IntelliJ IDEA import RuneLite with specific project name" %}

That was the last step for importing the RuneLite project. You should now be presented with the actual IntelliJ IDE interface. The RuneLite project may take a little to load when first opening. You should see the RuneLite project folder structure of the left panel. 

{% include figure.html path="blog/runelite-part1/intellij-loaded-project.png" alt="IntelliJ IDEA loaded RuneLite project" %}

#### Installing the Lombok Plugin

The RuneLite developers recommend installing the Lombok plugin in IntelliJ. They state that if you are getting a _Cannot resolve symbol 'log'_ error, this is due to not having the Lombok plugin. This plugin has some advanced options, but from my investigation it is primarily used by RuneLite for debugging - that is, using print statements for debugging code when modifying the original RuneLite source code. This is exceptionally useful! See the image below for an example of this error when using the `log.debug()` statement.

{% include figure.html path="blog/runelite-part1/runelite-lombok-error.png" alt="IntelliJ IDEA error with log.debug and Lombok plugin missing" %}

Luckily for us, it a straightforward process to install the Lombok plugin. Use the following list of instructions:

- Navigate to the _File_ menu
- Select _Settings..._ (in OS X it will be called _Preferences_)
- A new dialog box will appear
- Select _Plugins_ from the left-side menu
- Select the _Browse Repositories_ button on the bottom of the right-side panel

You should be prompted with a new dialog box that looks like the image below.

{% include figure.html path="blog/runelite-part1/runelite-lombok-install.png" alt="IntelliJ IDEA Lombok plugin installation method" %}

From here use the following steps:

- In the search box, enter _lombok_
- Find the _Lombok Plugin_ in the search results and highlight it (single left-click)
- Use the green _Install_ button to install the plugin
- IntelliJ will install the plugin and ask to restart the IDE

These steps should solve any _Cannot resolve symbol_ or _Cannot resolve method_ errors for any `log.debug()` statements.

#### Creating a New Maven Project

The configuration of the RuneLite project provides an _Application_ to run the RuneLite client. Basically, our setup of RuneLite so far has only provided an _Application_ to execute the RuneLite client - this is similar to running any type of application. However, we now want to add a Maven project and configure the build, or compilation, environment. This will allow us to actual make changes to the source code, then compile the source code. The following steps outline how to accomplish this:

- Navigate to the _Run_ menu
- Select _Edit Configurations..._
- A new dialog box will appear
- Left-click on the plus sign in the top left corner to add a new configuration
- From the drop-down menu, select _Maven_

{% include figure.html path="blog/runelite-part1/maven-create-configuration.png" alt="RuneLite configuration adding a Maven build configuration" %}

This process will create a new configuration for your IntelliJ project. In this new configuration we need to set a few configuration options:

- Set the _Name_ of the new configuration. I would recommend using a descriptive name that summarizes the purpose of the configuration, so I named this configuration `Build` - as it builds, or compiles, the RuneLite source code
- Set the _Working directory_ to be the RuneLite folder. This is easily achieved by left-clicking the _Folder icon_ at the end of the input box and selecting `runelite-parent`
- Set the _Command Line_ option to skip tests while building (this will save a lot of time during project building). The value to set is:

{% highlight bash %}
install -DskipTests -U
{% endhighlight %}

When finished, your configuration should look like the image below. Make sure to save the configuration by using the _Apply_ button.

{% include figure.html path="blog/runelite-part1/maven-create-configuration-build.png" alt="RuneLite configuration adding a Maven build configuration" %}

The output of this process is a new Maven project for **building RuneLite**. This adds to the existing project that is for **running RuneLite**. You can see a summary of the two configurations in the image below. The image on the left is the IntelliJ project configurations dialog box, one called RuneLite and one called Build (the one we just made!). On the right is the fast access configurations menu provided in the IntelliJ IDE window. This allows for fast switching between configurations. Notice again we have RuneLite and Build configurations to select from.

{% include figure.html path="blog/runelite-part1/maven-both-configurations.png" alt="RuneLite configurations" %}

This part of the process confused me a little the first time I was setting up the RuneLite development environment. I didn't quite get why we were creating a new Maven project when RuneLite was already shipped with one. However, I learnt that each project has a different purpose:

- _RuneLite_: This configuration is for running RuneLite. So basically, we build the source code then run it using this configuration
- _Build_: This is the configuration we created. Like the name _Build_ (that we gave it) suggests, it is for building, or compiling, the RuneLite project. Simply, building all the source code into an executable file.

After figuring this out, the entire process made a lot more sense! As a summary, when I am developing I use the following process:

- Select _Build_ configuration
- Edit source code, modify plugins, add debugging statement etc.
- Run the _Build_ configuration to compile the source code
- Switch to the _RuneLite_ configuration
- Run the _RuneLite_ configuration to actually run RuneLite (launch the RuneLite client that was just modified)

More information about building and running RuneLite is discussed below in dedicated sections.

#### Enabling the Client Developer Tools

Last configuration! It is highly recommended that you enable the RuneLite Developer Tools. This part was a mystery to me, as there is limited documentation on the developer tools. Not complaining at all, the RuneLite developers do a fantastic job - and it is very hard to maintain thorough and comprehensive documentation for such a fast moving, popular project. Their new JavaDocs documentation for the API is amazing! We will discuss this is a later post...

Anyway, the RuneLite Developer Tools are pretty much what the named would suggest. A set of tools to help developers write code for the RuneLite project. The image below displays the Panel menu for the developer tools to give you an idea of what is provided.

{% include figure.html path="blog/runelite-part1/runelite-dev-tools.png" alt="RuneLite developer tools panel" %}

As you can see, the developer tools have a Panel menu, similar to other RuneLite plugins. From the names used on the different buttons you can probably get a good idea of the different functionality provided by these tools. After writing some plugins for RuneLite, I thoroughly recommend using these tools. They are excellent!

The image below shows a simple example of the developer tools in action. Notice how the _Players_ tool has been enabled - the button in the Panel has turned green (enabled) and the tool highlights all players in your characters immediate environment. I think I was making cannonballs just before taking this screenshot!

{% include figure.html path="blog/runelite-part1/runelite-dev-tools-example.png" alt="RuneLite developer tools example" %}

To enable the developer tools, we need to edit the _RuneLite_ configuration. This is a similar process to what we just performed when creating the _Build_ configuration. However, this time we need to edit the _RuneLite_ configuration. The following steps will help achieve this:

- Navigate to the _Run_ menu
- Select _Edit Configurations..._
- A new dialog box will appear
- Expand the _Application_ drop-down box (using the little arrow icon)
- From the drop-down menu, highlight _RuneLite_
- The right-side of the panel will change
- We need to edit the _VM options_ and _Program Arguments_ to include the developed tools
- The _VM options_ require the following option added:

{% highlight bash %}
-ea
{% endhighlight %}

- The _Program Arguments_ require the following options added:

{% highlight bash %}
--developer-mode
{% endhighlight %}

At this stage, it is also recommended to add debugging support to your _RuneLite_ configuration. This will allow the use of `log.debug()` print statements, which is really useful when developing. To enable this, the following option needs to also be added to the _Program Arguments_:

{% highlight bash %}
--debug
{% endhighlight %}

The final configuration should look like the image below. Make sure you are editing the _RuneLite_ configuration, and not the _Build_ configuration!

{% include figure.html path="blog/runelite-part1/runelite-enable-developer-mode.png" alt="RuneLite developer tools enabling" %}

Done! We have finished configuring IntelliJ and the RuneLite project and are ready to actually build the project and run it!

## Building RuneLite

After finishing the configuration of IntelliJ and RuneLite, the building of the project is relatively straightforward. This is because we have already made all the required configurations. 

The key thing here: make sure you are on the _Build_ configuration. This can be selected using the configuration drop down menu in the IntelliJ IDE. This can be found in the top menu bar, and has a cog icon next to it (check the image below for an example).

After selecting the _Build_ configuration, we need to just _Run_ the build process specified by the Maven project. You can use a variety of methods achieve this:

- Left-click the green arrow icon next to the configuration menu
- Navigate to _Run_, then select _Run 'Build'_
- Or simple use the shortcut hot keys `Shift` + `F10`

{% include figure.html path="blog/runelite-part1/building-runelite.png" alt="Building RuneLite" %}

**NOTE:** As documented on the RuneLite Wiki: _Many users have reported issues where RuneLite fails to run after the next step. Running the Maven build a second time should make it work._ I did not experience this issue, but it is better to be thorough in case someone reading this post encounters the same problem.

## Running RuneLite

Once the RuneLite project has been built, we can finally run RuneLite that we have compiled by ourselves! The first step in development!

Like all IDEs, IntelliJ has a bunch of options to achieve this (similar to the build process that can be accomplished many ways). The RuneLite Wiki recommend finding the `RuneLite.class` in the `runelite-client` folder, and running the project from the _Run RuneLite.main()_ content menu entry. This is a little cumbersome, and I would recommend using the _RuneLite_ configuration we have made, and running it like we did the build process.

The key thing here: make sure you are on the _RuneLite_ configuration. This can be selected using the configuration drop down menu in the IntelliJ IDE. This can be found in the top menu bar, and has a cog icon next to it (check the image below for an example).

After selecting the _RuneLite_ configuration, we need to just _Run_ the build process specified by the Maven project. You can use a variety of methods achieve this:

- Left-click the green arrow icon next to the configuration menu
- Navigate to _Run_, then select _Run 'Build'_
- Or simple use the shortcut hot keys `Shift` + `F10`

{% include figure.html path="blog/runelite-part1/running-runelite.png" alt="Running RuneLite" %}

**NOTE:** As documented on the RuneLite Wiki: _If the client fails to boot or if the applet does not appear, try to rebuild the project by running the Maven builder again. If that also doesn't work, feel free to ask for help in the discord server._ Again, I did not experience any issue here, but this might be useful for readers of this post.

## Conclusion

Success! I hope you have made it this far and got a RuneLite development environment configured and have compiled and run the client. After looking back at this post, it is quite lengthy. But I hope that the descriptive nature helped you - and if not, you can be proud that you already have a great understanding of the RuneLite project and programming in IntelliJ and Java.

I learnt a lot from this process, and feel I always learn more when trying to convey useful information to others. Keep a lookout for a new post soon that covers Part 2 of this series, where we look at the fundamentals of authoring a RuneLite plugin including the basic plugin structure and useful methods in the RuneLite API. 

Finally, if you have any questions, feedback or discovered any issues with this documentation please leave a comment below. I am happy to help if I can (for the love of OSRS!). Also, make sure to check out the official RuneLite discord, they are really helpful. Thanks!