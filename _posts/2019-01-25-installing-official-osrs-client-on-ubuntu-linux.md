---
layout: post
title: "OSRSBox | Blog | Installing the Official OSRS Client on Ubuntu Linux"
name: "Installing the Official OSRS Client on Ubuntu Linux"
desc: "A tutorial covering how to download, run and install the Official OSRS Client on Ubuntu Linux 18.04"
tags:
- Client
- Linux
add_to_popular_list: false
thumbnail: osrs-coding.png
---

This post documents how I downloaded, installed and run the official OSRS client on a fresh Ubuntu Desktop Linux version 18.04 system. I generally use the [RuneLite](https://github.com/runelite/runelite) client, but I was messing around the other day and tried installing the official OldSchool client on Ubuntu, and this post outlines how I got it working... and some interesting stuff I discovered along the way.

The general process to install and run the official client on Linux is not straight-forward as there is no multi-platform installer. But there are work-arounds to get the official client running on any Linux distribution. There are a variety of approaches to installing and running the official client on Linux - but they all invovle downloading or extracting JaGeX Applet Viewer (`jagexappletviewer.jar`) and running it using Java and specific command line options. In this post I document the most desirable method to get the JaGeX Applet Viewer, outline the various command line options and when to use them, provide a summary of how to install the client system-wide for any user, and finally how to easily run the client using a command alias or launcher.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## OSRS Client and Linux: Background

Linux and gaming do not generally go hand-in-hand. Even desktop Linux operating systems are somewhat lacking. I am a diehard Linux user, but I just don't like any desktop Linux distributions/environments. On the other hand - Linux as a headless server is to die for! Anyway, the point I am making is that like most games, in Old School RuneScape (OSRS) Linux support takes a major backseat. Basically, this means that there is no _official_ support for running the OSRS client on a Linux system. If you navigate to the [OSRS client downloads page](https://www.runescape.com/oldschool/download) you will only see options for Windows, OS X (Mac) and Mobile.

{% include figure.html path="blog/offical-client-linux/official-osrs-client-downloads.png" alt="The official OSRS client download options" class="mx-auto" %}

Most people will say... _Just use RuneLite on Linux_. And they are right, it does have a Java executable (`.jar`) file that can easily be run on all platforms, Linux included. 

{% include figure.html path="blog/offical-client-linux/runelite-allplatforms-download.png" alt="The RuneLite client download options" class="mx-auto" %}

Before RuneLite was around, people said the same about OSBuddy. _Just use OSBuddy on Linux_. Ahhhh... those were the days! And not because I like OSBuddy - I didn't even use it. Back then I played OSRS in Ubuntu Linux using Mozilla Firefox and the [IcedTea-Web plugin](https://icedtea.classpath.org/wiki/IcedTea-Web)! Yes, playing RuneScape in a web browser just like in 2005. I am not sure if this is still possible. I'm getting nostalgic, back to business!

So what are the current options for the official OSRS client on Linux? Believe it or not, there are a couple of good options around. And some good documentation and tutorials too. The official [RuneScape Support page has information on Linux Native Clients](https://support.runescape.com/hc/en-gb/articles/206659489-Linux-Native-Clients) - providing advice to use the official client using WINE (a kind of Windows emulator that is not really an emulator!), or using the RuneScape Unix Client. I tried the [RuneScape Unix/Linux Client (rsu-client)](https://github.com/rsu-client/rsu-client) a while ago. I remember having problems installing it, but cannot remember the details - it was a couple of years ago. But the project does have excellent documentation. However, the developer HikariKnight posted in December 2017 that [the client will no longer be updated due to real life commitments](https://github.com/rsu-client/rsu-client/issues/135). Nevertheless, there still seems to be commits to the project by HikariKnight. Another option is using the documentation provided on the (new) [OSRS Wiki called Linux game installation guide](https://oldschool.runescape.wiki/w/Linux_game_installation_guide). The instructions are really good, but the way that it is written is kind of confusing. They provided multiple options in the tutorial and could get too complex for anyone that is new to Linux. But the information provided is excellent and worked well for me. It is very similar to the method I used to first play OSRS when I had given up on the IcedTea plugin method.

So what is the plan? Basically, this post discusses how to download the official Windows client and extract the JaGeX Applet Viewer to play the game. The JaGeX Applet Viewer is an executable Java file (`.jar`), so it is easy to get running on Linux... well kind of!

## System Configuration: Installing Java and the MSITools

So, to play Old School RuneScape, you need Java. You can use the JRE or JDK (you can use the JDK because it contains the JRE!). In this tutorial, I installed the JRE as it has a smaller installation footprint. I choose the open source version (Open JRE). As always on Linux, make sure you update the Ubuntu package repositories:

{% highlight bash %}
sudo apt-get update
{% endhighlight %}

Now we want to install the JRE, or Java Runtime Environment, using the following command: 

{% highlight bash %}
sudo apt-get install default-jre
{% endhighlight %}

I have written about installing Java for OSRS when [Installing RuneLite on Ubuntu Linux]({% post_url 2018-10-05-installing-runelite-on-ubuntu-linux %}#installing-java). Have a look at the linked blog post if you want more information than provided here.

The next thing we need to download is the [msitools](https://wiki.gnome.org/msitools) package. We want to extract the JaGeX Applet Viewer from the official Windows installer - and we need a specialized tool to achieve this. The Windows Installer is a _helper_ (well, really an API) that aids software install, maintenance and removal - you might have seen the `.msi` extension for Windows software installers. Well, the `msitools` project is a set of Linux command line tools to inspect, build, and extract `.msi` files. We will use it to extract files from the OSRS client Windows installer file. Install the `msitools` package using `apt` and the following command.

{% highlight bash %}
sudo apt install msitools
{% endhighlight %}

Please note that you can extract files from MSI installers using a variety of tools. The [OSRS Wiki Linux game installation guide](https://oldschool.runescape.wiki/w/Linux_game_installation_guide) use 7zip - but I prefer the `msitools` method.

## Getting the JaGeX Applet Viewer

Simply put, the JaGeX Applet Viewer is the simple program that displays the OSRS game in a frame (window). Technically, it is a _Java applet_, designed for use in a web browser. The official client provides a kind-of wrapper around the JaGeX Applet Viewer to display it in a native Windows application. Anyway, we can execute the JaGeX Applet Viewer in Linux and get the official client running.

There are a variety of small differences in the way you can go about running the JaGeX Applet Viewer on Linux. I picked what I thought was the best and will not provide instructions on other methods (but will mention them). The main thing to point out: when running the JaGeX Applet Viewer you might see an ugly copyright bar at the bottom of the official client, as well as a _Language_ bar at the top of the client. To give you an idea of what this is, below is a screenshot of the official client with the copyright bar visible.

{% include figure.html path="blog/offical-client-linux/official-osrs-client-copyright.png" alt="The official client with copyright details and language bar" class="mx-auto" %}

This may seem like a small thing, but that copyright bar is sooooo annoying when playing. You can resize the window to not see it, but I feel that gets annoying everytime you open the game. This tutorial would be much simpler if we could live with the copyright bar, as you can download the [JaGeX Applet Viewer](http://oldschool.runescape.com/downloads/jagexappletviewer.jar) directly from the official website and run the `jagexappletviewer.jar` using Java. Alas! We will use a different method to download the Windows installer, extract the JaGeX Applet Viewer, so we get a version of the viewer that does not display the copyright bar.

### Downloading and Extracting the JaGeX Applet Viewer

The JaGeX Applet Viewer, or `jagexappletviewer.jar` file, is packaged in the official Windows installer for the OSRS client. You can download the [OldSchool.msi Windows installer from the official OSRS website](http://www.runescape.com/downloads/oldschool.msi). Do not download using this link, instead, we will download the `OldSchool.msi` file using the `wget` tool. This is a better method because we can script the entire process - which is useful for updates to the game client. Before we download the client installer, we will make a temporary location to download the file - as the download and extraction get a bit messy and we want to remove the un-needed files after we have the JaGeX Applet Viewer. Execute the command below to create a folder named `osrs` in the `/tmp` directory.

{% highlight bash %}
mkdir /tmp/osrs     # Make a folder named osrs
cd /tmp/osrs        # Move into the new folder
{% endhighlight %}

Now we will download the `OldSchool.msi` installer. In the same terminal enter the command listed below.

{% highlight bash %}
wget -O /tmp/osrs/OldSchool.msi http://www.runescape.com/downloads/oldschool.msi
{% endhighlight %}

Basically, we are downloading the `OldSchool.msi` file, and saving it to the `/tmp/osrs` folder. The `OldSchool.msi` file is kind of like an archive (e.g., ZIP file), as it contains a bunch of files. We want to extract the `jagexappletviewer.jar` file. To do so, we have to extract all of the contents of the `OldSchool.msi` file then find the file we are interested in. I think the `msiextract` tool is better than using 7-zip (as discussed on the OSRS Wiki) as it extracts all files in a single step. To run the `msiextract` tool execute the following command (make sure you are still in the `/tmp/osrs/` folder).

{% highlight bash %}
msiextract OldSchool.msi
{% endhighlight %}

After you run this command, a new folder will be created. The absolute path is shown below.

{% highlight bash %}
/tmp/osrs/jagexlauncher/
{% endhighlight %}

This folder contains the contents of the `OldSchool.msi` file that have been extracted. If you have a browse around this folder and the contents you will find the `jagexappletviewer.jar` file. To be specific, it is in the following location.

{% highlight bash %}
/tmp/osrs/jagexlauncher/jagexlauncher/bin/jagexappletviewer.jar
{% endhighlight %}

### Installing the JaGeX Applet Viewer

At the end of the last section, we managed to successfully download the OSRS client installer, then extract the `jagexappletviewer.jar` file - the file needed to run the official OSRS client. Now we want to install the client so that it is readily available on our system. We are going to install the client system-wide - this means that any user can run the OSRS client. It is a good method for software installation in Linux. If you have read my post on [Installing RuneLite on Ubuntu Linux]({% post_url 2018-10-05-installing-runelite-on-ubuntu-linux %}), we are using the same method as outlined there.

The best location to store binary files in Linux is using the `/usr/local/bin` directory. According to the [Filesystem Hierarchy Standard](http://refspecs.linuxfoundation.org/FHS_2.3/fhs-2.3.html#USRLOCALLOCALHIERARCHY), the `/usr/local/` directory is for use by the system administrator when installing software locally that is not from a package repository. You could technically store and run the `jagexappletviewer.jar` file anywhere, but we should adhere to best Linux practices. Therefore, the best location to store the executable is `/usr/local/bin`. The following command will move our extracted `jagexappletviewer.jar` file to the `/usr/local/bin/` folder.

{% highlight bash %}
sudo cp /tmp/osrs/jagexlauncher/jagexlauncher/bin/jagexappletviewer.jar /usr/local/bin/jagexappletviewer.jar
{% endhighlight %}

One more step - because we are thorough! We will also copy the icon for the client. This means that when we run the client, a nice OSRS icon will appear on the taskbar. We will copy the icon file (a `.png` file) to a similar location, this time the `/usr/local/share` directory - used to store additional resources. The following command will move the extracted `jagexappletviewer.png` file to the `/usr/local/share/` folder.

{% highlight bash %}
sudo cp /tmp/osrs/jagexlauncher/jagexlauncher/oldschool/jagexappletviewer.png /usr/local/share/jagexappletviewer.png
{% endhighlight %}

Next, we need to adjust the permissions on the JaGex Applet Viewer file. The file should be owned by the `root` user already (because we used `sudo` permissions when copying the file). However, we need to make sure that any _other_ user should have the appropriate permissions to execute the program. The following command will set _read_ and _execute_ permissions for _other_ users, while matching the usual permissions you would set for the user and group for executable binaries:

{% highlight bash %}
sudo chmod 755 /usr/local/bin/jagexappletviewer.jar
{% endhighlight %} 

Lastly, we are going to clean up our `/tmp` folder. It doesn't make sense to keep the `OldSchool.msi` file, or the files extracted from it. The following command will remove (`rm` command) the folder we created (named `/tmp/osrs/`) and all the files in it (recursively using `-r`).

{% highlight bash %}
rm -rf /tmp/osrs/
{% endhighlight %}

## Running the JaGeX Applet Viewer: Commands

This section discusses the method used and commands to run the official OSRS client. Running the JaGeX Applet Viewer can get complex due to the required command line options. In this section I will discuss the method in-depth, and also outline and describe some useful command options that are quite useful.

### Running the jagexappletviewer Jar File

No matter where you download and save the `jagexappletviewer.jar` file, it can be run with Java by specifying a command with Java options and arguments. The following example is the minimal command needed to run the client - you cannot use the usual `java -jar file-name.jar` syntax when running this client!

{% highlight plaintext %}
java -Duser.home=$HOME -Djava.class.path=/usr/local/bin/jagexappletviewer.jar -Dcom.jagex.config=http://oldschool.runescape.com/jav_config.ws jagexappletviewer /usr/local/share/
{% endhighlight %}

Whew! I know - it's kind of ridiculous. I have not seen a good tutorial that breaks down this command and the options/arguments, so I will provide a detailed explanation. Firstly, like most commands - each argument is separated by a space. This leaves us with the list outlined below. As a side note - any argument with a `-D` used to set a system property value for Java. Basically, it allows us to add properties to be set for the Java virtual machine when we run the client. 

- `java`: Call the Java executable
- `-Duser.home=$HOME`: Set the directory to store the required client files, including the preferences and the cache. In this example, we used the Linux system environment variable called `$HOME` to save the files in your user's home directory. For example, this will expand to be `/home/ph01l/` for my user that is named `ph01l`. If this is not set, the current working directory from where the client was run is used. I would recommend using the `$HOME` value. Also, the `$HOME` value will not work if enclosed by speech marks, for example: `'$HOME'`. Speech marks should only be used when white space is present in the argument. You could also use an absolute path here, for example `/home/ph01l/` would also work.
- `-Djava.class.path=/usr/local/bin/jagexappletviewer.jar`: The name and location of the class/program we want to run. In this case, it is the `jagexappletviewer.jar` file we extracted and stored in the `/usr/local/bin` directory.
- `-Dcom.jagex.config=http://oldschool.runescape.com/jav_config.ws`: To run the client we MUST specify the config file. The client will not run without this argument. You can load the URL up in a web browser to see the contents of this file - it is pretty interesting!
- `jagexappletviewer`: The name of the class that we are requesting to load when starting the client. This must be set to `jagexapplexviewer`, or the client will not run.
- `/usr/local/share/`: Specify a folder for the client to look for an icon with the file name of `jagexappletviewer.png`. Since the client looks for a specific file name, we just need to set the directory to look for the icon (we saved the icon file in the `/usr/local/share/` folder in the previous section).

That list took me a while to document, as I couldn't find much information on these settings. So I just tried running the client with all sorts of arguments! Along with doing some research to determine the functionality. It was pretty fun, and it is really useful to know what each argument actually does. Below is a summary of the general structure of the command we outlined above.

{% highlight plaintext %}
java <options> <class-name> <arguments>
{% endhighlight %}

To be thorough, the `-D` options are used as input to the Java program - the `options`. The `class-name` is always going to be `jagexappletviewer`. The arguments to the client are last, and the only argument I am aware of is the location of the icon file.

When you run the client from the terminal you will see some program output. This can be useful to review the command you entered. An example of the output I get when running the client is provided below for reference. There are a couple of warnings, but these do not seem to affect the client - and I have got the same errors for a couple of years!

{% highlight bash %}
ph01l@ubuntu:~$ java -Duser.home=$HOME -Djava.class.path=/usr/local/bin/jagexappletviewer.jar -Dcom.jagex.config=http://oldschool.runescape.com/jav_config.ws jagexappletviewer /usr/local/share/
Trying to load icon file: /usr/local/share/jagexappletviewer.png
Loader init
Init 1
Init 2
Init 3
Init 4
Init 5
Init 6
Init 7
Init 8
Loader show
Loader set message
Config url:http://oldschool.runescape.com/jav_config.ws
Config URL is http://oldschool.runescape.com/jav_config.ws
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by app.u (file:/usr/local/bin/jagexappletviewer.jar) to field java.lang.ClassLoader.scl
WARNING: Please consider reporting this to the maintainers of app.u
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
{% endhighlight %}

### Additional Command Line Options

We looked at the most basic command line options in the previous section - that is, the bare minimum needed to run the client. In this section, we will investigate a selection of other options that I have seen floating around on the Internet. 

#### Set a Custom Location for Cache Files

{% highlight plaintext %}
-Duser.home=/any/path/you/want
{% endhighlight %}

Hey! What the heck?! Yes, this one was seen in the last section. However, there is something else very useful about this command line options. What happens if you would like to play OSRS on a computer without _installing_ the client. This could be a useful option to set the `user.home` to a USB flash drive so that no files would be created on the computer...

#### Enable Hardware Acceleration

{% highlight plaintext %}
-Dsun.java2d.opengl=true
-Dsun.java2d.opengl=True
{% endhighlight %}

The two examples above are used to enable the OpenGL-based pipeline to provide hardware acceleration. The difference between the two? The value `true` just enables OpenGL, while the value `True` with a capital `T` provide _verbose_ output (like debugging). More information is available in the [System Properties for Java 2D - opengl](https://docs.oracle.com/javase/8/docs/technotes/guides/2d/flags.html#opengl). The [OSRS Wiki article on Linux client installation](https://oldschool.runescape.wiki/w/Linux_game_installation_guide#cite_ref-2) notes that this option may cause rendering issues with Intel-based graphics cards.

#### Improved Graphics Performance

{% highlight plaintext %}
-Dsun.java2d.xrender=True
{% endhighlight %}

This option enables the XRender pipeline that is applicable on modern X11 desktops (most new Linux-based systems have this). Basically, you can get improved graphics performance using this flag. More information is available in the [System Properties for Java 2D - xrender](https://docs.oracle.com/javase/8/docs/technotes/guides/2d/flags.html#xrender).

#### Increase UI Scale

{% highlight plaintext %}
-Dsun.java2d.uiScale=1
-Dsun.java2d.uiScale=2
{% endhighlight %}

This one is really interesting! You can use the `uiScale` option to increase the scale, or size, of the OSRS client. Basically, you can set the value higher, for example, to 2, to get a client that is twice the size of the normal client! I was going to include a screenshot - but it was difficult to see the size difference. Maybe try this one to see it in action - especially if you have a massive screen! I read that you could input a float value (e.g., 1.5), but this did not work - only integers worked for me (e.g., 1, 2, 3).

#### Set HTTPS Protocol Version

{% highlight plaintext %}
-Dhttps.protocols=TLSv1.2
{% endhighlight %}

This option adds the ability to specify the HTTPS protocol version used when running the program. The example above forces the client to use version 1.2 of Transport Layer Security (TLS). However, according to a [Oracle blog (makers of Java)](https://blogs.oracle.com/java-platform-group/diagnosing-tls,-ssl,-and-https) TLS version 1.2 is used by default in JDK 8, but not in JDK 7. Although released in 2011, JDK 7 is still supported and used - so this flag might be useful depending on the Java version you have installed.

#### Set Memory Allocation

{% highlight plaintext %}
-Xmx512m
{% endhighlight %}

According to the [official Java documentation](https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html), the `Xmx` command specifies the maximum size of memory allocated to the Java program. The value must be greater than 2MB and a multiple of 1024. The system chooses a default value at runtime - so this option offers the ability to force a memory size. I selected 512MB as the rsu-client (discussed earlier) specifies the same in their [`oldschool.prm` file](https://github.com/rsu-client/rsu-client/blob/master/runescape/share/prms/oldschool.prm).

#### Set Thread Stack Size

{% highlight plaintext %}
-Xss2m
{% endhighlight %}

This option sets a 2MB thread stack size. The internal workings of the Java Virtual Machine (JVM) are a little over my head - but the value of 2MB was selected as the rsu-client (discussed earlier) specifies the same in their [`oldschool.prm` file](https://github.com/rsu-client/rsu-client/blob/master/runescape/share/prms/oldschool.prm). 

## Running the JaGeX Applet Viewer: Command Alias

So... in the last section, we discussed the base command to get the official OSRS client running in Linux. However, the command to run the client is ridiculously long and complex! I thought the command to run the RuneLite JAR file was a pain (`java -jar /path/to/RuneLite.jar`)... Well, the command we just used was intense! Especially if you include additional command line options!

We have two solutions here. One is we could use a command line alias. The second (discussed in the next section) is to make a launcher with a nice icon that you can just click to run. 

If you have never used aliases, don't worry, they are quite simple. Basically, you can specify a new _keyword_ that will create a command that will actually run another command. For example, instead of typing out the long command, you could create an alias named `osrs` which runs the full command. If you want to know more about command line aliases in Linux, Computer Hope has an excellent article called [How to use aliases in Linux shell commands](https://www.computerworld.com/article/2598087/linux/how-to-use-aliases-in-linux-shell-commands.html).

The specific command we want to use to run the client is:

{% highlight bash %}
java -Duser.home=$HOME -Xss2m -Xmx512m -Dsun.java2d.opengl=true -Djava.class.path=/usr/local/bin/jagexappletviewer.jar -Dcom.jagex.config=http://oldschool.runescape.com/jav_config.ws jagexappletviewer /usr/local/share/
{% endhighlight %}

This is the full command I use for running the official OSRS client. It sets the home directory, sets the thread stack size, sets the allocated memory higher, enables OpenGL and specifies the correct class and configuration file. This is my go-to command. Skipping all the intracacies of command line alias, the example below is a simple one liner that creates a new command line alias called `osrs` that executes the command listed above. In summary, the following command will _append_ the alias command to the `/etc/bash.bashrc` file. This file is run every time any user starts a bash terminal session - so the `osrs` will be availble to all users. If you would like to restrict the command alias to only one specific user, you could redirect the alias to the `~/.bashrc` file instead which is user-specific.

{% highlight bash %}
echo 'alias osrs="java -Duser.home=$HOME -Xss2m -Xmx512m -Dsun.java2d.opengl=true -Djava.class.path=/usr/local/bin/jagexappletviewer.jar -Dcom.jagex.config=http://oldschool.runescape.com/jav_config.ws jagexappletviewer /usr/local/share/"' | sudo tee --append /etc/bash.bashrc
{% endhighlight %}

Make sure to restart your bash terminal session so that the alias can load - this is only needs to be done once! You can `exit` the bash terminal, or simply close and reopen the bash terminal for the alias to load. You can now run the `osrs` command at the terminal to start the official OSRS client.

## Running the JaGeX Applet Viewer: Launcher

The second method to run the official OSRS client is probably the most desirable by most. We will now create a _launcher_ for the client that creates an entry in the _Applications_ menu - this is pretty much the Linux equivalent of the Windows Start Menu. We want to create a file that creates an applications menu entry. Again, we are using a shared location. Create and open the following file:

{% highlight bash %}
/usr/share/applications/jagexappletviewer.desktop
{% endhighlight %}

I prefer to use the `vim` editor, but you can use `gedit` or `nano` if you prefer. Just prepend the desired editor to the start of the path... make sure to include `sudo` as this location of the file requires superuser privileges. As an example, here is the command required to create and open the required file using the `gedit` editor (a GUI editor in Ubuntu - but might not be available in other Linux operating systems):

{% highlight bash %}
sudo gedit /usr/share/applications/jagexappletviewer.desktop
{% endhighlight %}

Copy and paste the following text into the file:

{% highlight plaintext %}
[Desktop Entry]
Encoding=UTF-8
Type=Application
Exec=java -Duser.home=$HOME -Xss2m -Xmx512m -Dsun.java2d.opengl=true -Djava.class.path=/usr/local/bin/jagexappletviewer.jar -Dcom.jagex.config=http://oldschool.runescape.com/jav_config.ws jagexappletviewer /usr/local/share/
Name=Official OSRS Client
Comment=Official OSRS Client launcher
Icon=/usr/local/share/jagexappletviewer.png
Categories=Game
{% endhighlight %}

The entries in this file are pretty self-explanatory. We set various properties for the application launcher. For example, the `Exec` entry specifies what command to run when the launcher is executed. In our case, it is the same command we have previously used. The application launcher should appear in your launcher. I tested on Gnome in Ubuntu 18.04 and also the XFCE desktop environment. 

Below is a screenshot of the official OSRS client running on Ubuntu Linux. Notice the nice icon for the client in the taskbar. You might also notice the copyright notice - this will appear when first loading the client, but will be removed after logging in.

{% include figure.html path="blog/offical-client-linux/official-osrs-client-running-on-ubuntu-linux.png" alt="The official OSRS client running on Ubuntu Linux" class="mx-auto" %}

## Updating the JaGeX Applet Viewer

Ok... so we got this far. However, when a game update is pushed, you might need to update the JaGeX Applet Viewer. I have only just started using the official OSRS client again - so I am unsure how often they roll out updates. I have not needed to update my client yet. Nevertheless, this process is not the same when using RuneLite, which updates itself when launching the client. Instead, we will have to manually update the client. The steps to install the official client can get a bit tedious if you are running them a lot - and it is easy to forget a step. The script below will perform the exact set of steps I outlined in the installation phase of this tutorial. Just copy and paste the code into a text file, save it with the preferred bash script extension (`.sh`), and run it if the client needs to be updated.

{% highlight bash %}
#!/bin/bash
# Create folder structure in /tmp
cd /tmp
mkdir osrs
cd osrs
# Download the official Windows installer for the OSRS client
wget -O OldSchool.msi http://www.runescape.com/downloads/OldSchool.msi
# Extract the files from the installer
msiextract OldSchool.msi
# Copy JAR and PNG files to /usr/local directories
sudo cp /tmp/osrs/jagexlauncher/jagexlauncher/bin/jagexappletviewer.jar /usr/local/bin/jagexappletviewer.jar
sudo cp /tmp/osrs/jagexlauncher/jagexlauncher/oldschool/jagexappletviewer.png /usr/local/share/jagexappletviewer.png
# Set permission on the copied JAR file
sudo chmod 755 /usr/local/bin/jagexappletviewer.jar
# Clean up files in the /tmp folder we made
rm -rf /tmp/osrs
{% endhighlight %}

Remember, to run the script you will need execution rights and `sudo` rights to copy the JAR and PNG files to the correct directory. There is a simple way to achieve this without using `chmod` to modify permissions. Take the following scenario: I create a normal text file in my home directory and paste in the script contents. Then I save it with the filename `update_osrs_client.sh`. You can run the script using:

{% highlight plaintext %}
sudo bash update_osrs_client.sh
{% endhighlight %}

## Uninstalling the JaGeX Applet Viewer

In this tutorial we made a couple of changes to our Linux system, therefore it is prudent to discuss how to remove them - this is similar to uninstalling a program. As a summary we only added three files:

- `/usr/local/bin/jagexapplerviewer.jar`: The official OSRS client launcher
- `/usr/local/share/jagexapplerviewer.png`: The OSRS client icon
- `/usr/share/applications/jagexappletviewer.desktop`: The applications launcher for the official OSRS client

If you directly followed this tutorial you will have exactly the same files. You can easily remove these files using the following commands:

{% highlight plaintext %}
sudo rm /usr/local/bin/jagexapplerviewer.jar
sudo rm /usr/local/share/jagexapplerviewer.png
sudo rm /usr/share/applications/jagexappletviewer.desktop
{% endhighlight %}

## Conclusion

This post covered a method to download, extract, install and run the official OSRS client on Ubuntu Linux version 18.04. The approach I have documented attempts to align with best practices in Linux operating system environments and should be the next best thing after using a package manager (such as `apt`). I hope you have found this post useful and informative. The most interesting part for me was the command options used when running the client - I had used these before but had just taken peoples word that they were good! And never really knew what they were doing, or how the options worked. Now I actually understand their purpose.

If you have any questions, feedback or clarifications please submit a comment below - I am always open to feedback! Until next time, happy scaping!
