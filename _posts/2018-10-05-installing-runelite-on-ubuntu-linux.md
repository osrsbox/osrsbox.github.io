---
layout: post
title: "OSRSBox | Blog | Installing RuneLite on Ubuntu Linux"
name: "Installing RuneLite on Ubuntu Linux"
desc: "A tutorial covering how to correctly install RuneLite system-wide on Ubuntu Linux 18.04"
tags:
- RuneLite
- Linux
add_to_popular_list: false
thumbnail: runelite-coding.png
---

This post documents how I installed RuneLite on a fresh Ubuntu Desktop Linux version 18.04 system. The general process to install and run RuneLite on Linux is pretty simple, but there are some tweaks and configurations I made to make RuneLite available for any user (system-wide installation) and easy to run using a simple a command alias or desktop shortcut.

The RuneLite installation and configuration tutorial is divided into the following sections: Installing Java, downloading and installing RuneLite, creating shortcuts to run RuneLite and some additional system configuration tweaks and notes.

- **Update: 2019-03-17**: Updated the post to align with the most recent release of the RuneLite Launcher - version 1.6.2. Also added a small section on troubleshooting the client.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Installing Java

The different Java versions available complex and difficult to understand for someone who is not a Java developer. To keep this as short as possible, there are two primary Java versions that you can install:

- JRE (Java Runtime Environment): Used to **run** Java applications
- JDK (Java Development Kit): Used to **run** and **develop** (read program) Java applications.

To play Old School RuneScape, you can use the JRE or JDK (you can use the JDK because it contains the JRE!). In this tutorial, I installed the JRE as it has a smaller installation footprint. On Ubuntu Linux (and most other Linux-based operating systems) you have two different options for the JRE installation:

- Oracle JRE: The Oracle JRE (the people who make Java)
- Open JRE: The open source version of the Oracle JRE

For the sake of this post, there is very little difference between the two versions - apart from one is open source. For a more detailed discussion, there is a good article called [Oracle JDK builds vs. OpenJDK builds](https://jaxenter.com/oracle-jdk-builds-openjdk-builds-difference-149318.html). The general instructions I followed for installation were sourced from a [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04) - who have excellent tutorials on Linux system administration topics.

The OpenJRE is very easy to install as it is available in the default Ubuntu package repositories (where software is downloaded from). To start, make sure you update the Ubuntu package repositories to the latest version using the following command:

{% highlight plaintext %}
sudo apt-get update
{% endhighlight %}

Since we are using the `sudo` command, you will be prompted to enter your password. Wait until the package repository list is updated. Now we want to install the JRE, or Java Runtime Environment, using the following command: 

{% highlight plaintext %}
sudo apt-get install default-jre
{% endhighlight %}

You should be presented with output similar to the listing below:

{% highlight plaintext %}
ph01l@ubuntu-laptop:~/Downloads$ sudo apt-get install default-jre
[sudo] password for ph01l: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  ca-certificates-java default-jre-headless fonts-dejavu-extra java-common libatk-wrapper-java
  libatk-wrapper-java-jni libgif7 openjdk-11-jre openjdk-11-jre-headless
Suggested packages:
  default-java-plugin fonts-ipafont-gothic fonts-ipafont-mincho fonts-wqy-microhei | fonts-wqy-zenhei
The following NEW packages will be installed:
  ca-certificates-java default-jre default-jre-headless fonts-dejavu-extra java-common libatk-wrapper-java
  libatk-wrapper-java-jni libgif7 openjdk-11-jre openjdk-11-jre-headless
0 upgraded, 10 newly installed, 0 to remove and 0 not upgraded.
Need to get 41.6 MB of archives.
After this operation, 191 MB of additional disk space will be used.
Do you want to continue? [Y/n]
{% endhighlight %}

Make sure you press the `y` key, or just hit enter to continue. Then the packages will start to install. It is worth noting briefly that you can have multiple versions of Java installed. You can configure them using the following command:

{% highlight plaintext %}
sudo update-alternatives --config java
{% endhighlight %}

However, you probably don't have multiple Java versions, so this command is not needed - but it is good to know.

## Downloading RuneLite Launcher

In order to install RuneLite, we need to download and run the **RuneLite Launcher**. The launcher is available for multiple operating system types including Microsoft Windows (`.exe`), OS X (`.dmg`) and any other platforms (`.jar`). Since we are on Linux, we need the `.jar` version. You can download the launcher from the [Official RuneLite website](https://runelite.net/) or from the [RuneLite Launcher releases page](https://github.com/runelite/launcher/releases) which is hosted on GitHub. I prefer to use the GitHub page. The official RuneLite website points to the RuneLite launcher repository anyway - so no matter what, you will download the launcher from the same place. When I wrote this post, the version of the RuneLite launcher was 1.6.2. You can view and download the latest RuneLite launcher from:

{% highlight plaintext %}
https://github.com/runelite/launcher/releases
{% endhighlight %}

You can download the version using the hyperlink provided on the releases page, or right-click and _Copy the link location_ and download using the `wget` tool.

The best location to save binary files in Linux is using the `/usr/local/bin` directory. According to the [Filesystem Hierarchy Standard](http://refspecs.linuxfoundation.org/FHS_2.3/fhs-2.3.html#USRLOCALLOCALHIERARCHY), the `/usr/local/` directory is for use by the system administrator when installing software locally that is not from a package repository. You could technically save and run the `RuneLite.jar` file anywhere, but we should adhere to best Linux practices. Therefore, the best location to save the executable is `/usr/local/bin`. The following command will download version 1.6.2 of the launcher to the `/usr/local/bin/` folder using the following command:

{% highlight plaintext %}
sudo wget -O /usr/local/bin/RuneLite.jar https://github.com/runelite/launcher/releases/download/1.6.2/RuneLite.jar
{% endhighlight %}

Just to summarize the command. The `-O /usr/local/bin/RuneLite.jar` option forces `wget` to download the file to a specific location. In this case save the file to the folder `/usr/local/bin/`, with the file name of `RuneLite.jar`. If you want to download a different (newer) version of the RuneLite launcher just update the trailing URL at the end of the `wget` command.

The [RuneLite Launcher releases page](https://github.com/runelite/launcher/releases) page provides a SHA-256 hash value for all downloads. This hash value can be used to check the integrity of the downloaded file. The hash value for version 1.6.2 of the `RuneLite.jar` file is:

{% highlight plaintext %}
1f8e54d902f06e7d16dc1c49f920a7c42971e8b7e8a558204edbd2304a02c92a *RuneLite.jar
{% endhighlight %}

The simplest method to check the SHA 256 hash value is to run the `sha256sum` tool using the `RuneLite.jar` file as input, then manually check the hash values are the same. For example, you can run the following command 
You can check

{% highlight plaintext %}
sha256sum /usr/local/bin/RuneLite.jar
{% endhighlight %}

The output should be similar to the listing below:

{% highlight plaintext %}
ph01l@ubuntu-laptop:~$ sha256sum /usr/local/bin/RuneLite.jar 
1f8e54d902f06e7d16dc1c49f920a7c42971e8b7e8a558204edbd2304a02c92a RuneLite.jar
{% endhighlight %}

Now we have downloaded and verified the hash value of the `RuneLite.jar` file. Next, we need to adjust the permissions on the RuneLite launcher. The file should be owned by the `root` user already (because we downloaded using `sudo` permissions), so we need to make sure that any _other_ user should have the appropriate permissions to execute the program. The following command will set _read_ and _execute_ permissions for _other_ users, while matching the usual permissions you would set for the user and group for executable binaries:

{% highlight plaintext %}
sudo chmod 755 /usr/local/bin/RuneLite.jar
{% endhighlight %}

## Running the RuneLite Client

This section discusses a selection of different methods to run the RuneLite client including calling Java to execute the `.jar` file directly, setting a command line alias, and creating an application launcher with a sleek RuneLite icon.

### Running the RuneLite Jar File

No matter where you download and save the `RuneLite.jar` file, it can be run with the following command.

{% highlight plaintext %}
java -jar /path/to/RuneLite.jar
{% endhighlight %}

Note, you must change the `/path/to` value with the actual file system path. So, if you have followed this tutorial, the following command will execute the `RuneLite.jar` file and load up the RuneLite client:

{% highlight plaintext %}
java -jar /usr/local/bin/RuneLite.jar
{% endhighlight %}

When you run the command, you will see some output including verification of a collection of `.jar` files that the client uses. Every time you want to run RuneLite you will have to execute the command specified above, which is not exactly convenient!

### Creating a Command Alias

As just discussed, the command to run the RuneLite launcher is not exactly elegant! I find it a pain to type the long command every time I want to play OSRS. The solution, use a command line alias!

If you have never used aliases, don't worry, they are quite simple. Basically, you can specify a new _keyword_ that will create a command that will actually run another command. For example, instead of typing `java -jar RuneLite.jar`, you could create an alias named `runelite` which runs the full command. Simply put, when you type in `runelite` on the terminal, it actually runs `java -jar RuneLite.jar` command behind the scenes. If you want to know more about command line aliases in Linux, Computer Hope has an excellent article called [How to use aliases in Linux shell commands](https://www.computerworld.com/article/2598087/linux/how-to-use-aliases-in-linux-shell-commands.html).

The specific alias we want to use is:

{% highlight plaintext %}
alias runelite="java -jar /usr/local/bin/RuneLite.jar"
{% endhighlight %}

By looking at the above alias, you can see how the process works. However, we cannot simply run this command - as it will only persist during one session. If we exit bash (the terminal), our alias will be lost too! So we need to put it into a specific file so that it is loaded every time we start the bash shell. There are various files to put aliases in, but we want ours in a system-wide file so that any user can run RuneLite. The following command will _append_ the alias command to the `/etc/bash.bashrc` file. This file is run every time any user starts a bash terminal session. 

{% highlight plaintext %}
echo 'alias runelite="java -jar /usr/local/bin/RuneLite.jar"' | sudo tee --append /etc/bash.bashrc
{% endhighlight %}

Make sure to restart your bash terminal session so that the alias can load - this is only needed to be done once! You can `exit` the bash terminal, or simply close and reopen the bash terminal for the alias to load. You can now run the `runelite` command at the terminal to start the RuneLite client.

### Creating an Application Launcher

The final method to run the RuneLite launcher is probably the most desirable by most (but I prefer the command line alias!). We will now create a _launcher_ for RuneLite that creates an entry in the _Applications_ menu - this is pretty much the Linux equivalent of the Windows Start Menu. 

Start by downloading the RuneLite icon from the Runelite GitHub repository. We are doing this so we have a sleek icon for the application launcher. Similar to the method we used to download the RuneLite launcher, we will use `wget` to download the image file. Execute the command specified below:

{% highlight plaintext %}
sudo wget -O /usr/local/share/RuneLite.png https://github.com/runelite/runelite/raw/master/runelite-client/src/main/resources/runelite.png
{% endhighlight %}

This command will save the `RuneLite.png` file to the `/usr/local/share/` directory, similar to the location we downloaded the RuneLite launcher. Remember, the primary reason for using this location is to make the icon image accessible to all users, not just your user.

Now we want to create a file that creates an applications menu entry. Again, we are using a shared location. Create and open the following file:

{% highlight plaintext %}
/usr/share/applications/runelite.desktop
{% endhighlight %}

I prefer to use the `vim` editor, but you can use `gedit` or `nano` if you prefer. Just prepend the desired editor to the start of the path... make sure to include `sudo` as this location of the file requires superuser privileges. As an example, here is the command required to create and open the required file using the `gedit` editor (a GUI editor in Ubuntu - but might not be available in other Linux operating systems):

{% highlight plaintext %}
sudo gedit /usr/share/applications/runelite.desktop
{% endhighlight %}

Copy and paste the following text into the file:

{% highlight plaintext %}
[Desktop Entry]
Encoding=UTF-8
Type=Application
Exec=java -jar /usr/local/bin/RuneLite.jar
Name=RuneLite
Comment=RuneLite launcher
Icon=/usr/local/share/RuneLite.png
Categories=Game
{% endhighlight %}

The entries in this file are pretty self-explanatory. We set various properties for the application launcher. For example, the `Exec` entry specifies what command to run when the launcher is executed. In our case, it runs the RuneLite launcher using Java. 

Below is an example of the contents of the launcher file contents (on the left) and an example of the actual application menu entry (on the right). This example is taken from the XFCE desktop environment so may look somewhat different on different Linux desktop environments (e.g., Gnome or KDE).

{% include figure.html path="blog/runelite-install/runelite-menu-entry.png" alt="Example of the RuneLite lanucher" class="mx-auto" %}

## Uninstalling RuneLite

In this tutorial we made a couple of changes to our Linux system, therefore it is prudent to discuss how to remove them - this is similar to uninstalling RuneLite. As a summary we only added three files:

- `/usr/local/bin/RuneLite.jar`: The RuneLite launcher
- `/usr/local/share/RuneLite.png`: The RuneLite icon
- `/usr/share/applications/runelite.desktop`: The RuneLite applications launcher

If you directly followed this tutorial you will have exactly the same files. You can easily remove these files using the following commands:

{% highlight plaintext %}
sudo rm /usr/local/bin/RuneLite.jar
sudo rm /usr/local/share/RuneLite.png
sudo rm /usr/share/applications/runelite.desktop
{% endhighlight %}

## Troubleshooting

The RuneLite client runs really well on Linux, so this troubleshooting section is pretty minimal. The primary problem people seem to face is graphical issues. This is easily resolved by [disabling hardware acceleration as documented on the RuneLite wiki](https://github.com/runelite/runelite/wiki/Disable-Hardware-Acceleration). Basically, you just add `--mode=OFF` to the end of the command to run RuneLite. This method works for running from the command line, making a command alias or running the client using an application launcher. Below is an example of the modified command required:

{% highlight plaintext %}
java -jar /usr/local/bin/RuneLite.jar --mode=OFF
{% endhighlight %}

## Conclusion

This post covered a robust method to install the RuneLite OSRS client on Ubuntu Linux version 18.04 operating system. The approach I have documented attempts to align with best practices in Linux operating system environments and should be the next best thing after using a package manager (such as `apt`). I hope you have found this post useful and informative. If you have any questions, feedback or clarifications please submit a comment below - I am always open to feedback! Until next time, happy scaping!
