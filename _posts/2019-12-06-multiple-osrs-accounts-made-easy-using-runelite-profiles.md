---
layout: post
title: "OSRSBox | Blog | Multiple OSRS Accounts Made Easy using RuneLite Profiles"
name: "Multiple OSRS Accounts Made Easy using RuneLite Profiles"
desc: "Tutorial on how to easily have multiple OSRS accounts for the RuneLite client with separate configurations"
tags:
- RuneLite
- Linux
add_to_popular_list: true
thumbnail: osrs-coding.png
---

This post covers how to **setup RuneLite to run multiple accounts without the need to type in your username** over and over again, and to also **keep RuneLite configuration separate between multiple OSRS accounts**. I usually play two accounts at once, my main and my ironman, and I get tired of having to enter in my username/email address ever time I boot up my laptop and launch two RuneLite client instances. I also want multiple RuneLite configurations (e.g., specific plugins configured a specific way on the different accounts). This tutorial presents three potential solutions to try and meet both of these requirements. This tutorial primarily focusses on the RuneLite client, but some of these techniques can be used on the official client as well.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Issues Running Multiple OSRS Accounts

OSRS players are well known to play multiple accounts at once. Many skills are quite AFK and playing two (or more) accounts at once... can be _efficient_! From my experience and research, the two problems associated with running multiple OSRS accounts on the same operating system are:

1. Having to delete the username field and enter in a different account username/email address
1. Inability to keep RuneLite configuration separate between multiple accounts

My main problem is that entering in the _username_ field is somewhat inefficient. You can `Shift` + `Tab` from the password field to the username field, but cannot delete the username field with a hotkey. Instead, we mash the `Backspace` button. Alas! There must be a more efficient method! Additionally, many players would like to keep separate RuneLite configurations for each account they play. For example, I want different item ground marker configurations on my main compared to my Ultimate Ironman. 

It seems that this problem is not isolated to just me. If you [Let me Google that for you](https://lmgtfy.com/?q=runelite+multiple+accounts), other people have been asking the same question - for both RuneLite and the official OSRS client. After having a quick browse in the [RuneLite GitHub Issues Board](https://github.com/runelite/runelite/issues) I read some comments from the RuneLite devs and other contributors who responded to a bunch of players asking for a better solution:

- [Runelite settings for multiple accounts #5899](https://github.com/runelite/runelite/issues/5899)
- [Multiple plugin setting profiles #2220](https://github.com/runelite/runelite/issues/2220)
- [Multiple "profiles" for RuneLite #3709](https://github.com/runelite/runelite/issues/3709)

After reading through these posted issues, and mainly the comments, I got some good ideas about how to remove the necessity for entering the username, as well as storing RuneLite configuration independently for each account. I had some ideas of my own - but the more I researched, the more information I found. The following sections outline three different techniques. For each of the techniques I will outline the technical solution. Additionally, I will specify if this solution will work on the RuneLite client, on the Official client, applicability of operating system type (Linux, OS X, Windows support), and if the solution will provide independent configuration - the ability to store independent client configuration (plugin configurations, window position etc.) for different alt accounts.

## Technique One: Modify the RuneLite `settings.properties` On-The-Fly

- Works on RuneLite: Yes
- Works on Official client: No
- Operating system: Linux (possible on OS X and Windows)
- Provides independent configuration: No
- Difficulty: Complex if you are new to the command line

This is the simplest, quickest and dirtiest (read: hacky) solution. I have used this solution in the past as I run Linux, and I previously had the same RuneLite configuration for my main and alt accounts. This solution centres on the potential to change the `settings.properties` file that stores all RuneLite configuration... including the desired username property. This is possible on all operating system platforms (Linux, OS X and Windows) but I provide explicit instructions for Linux in this post.

For those who don't know, the RuneLite client stores all client configuration in the user's home directory - in a folder called `.runelite`. Note the dot before the name, which indicates a hidden folder (so it might not be visible by default in your file browser). Regardless, in that specific folder, there is plaintext file named `settings.properties` which holds all the RuneLite client preferences. If you toggle a plugin (turn off or on), or toggle a specific plugin setting, the value will be stored in this file. In this file there is a property named: `loginscreen.username` which stores the username field to be used when the client launches. We can modify this value to change the value that appears in the username field...

Below is an example of an entry from the RuneLite `settings.properties` file for the username field:

```
loginscreen.username=my-main-email@domain.com
```

This email (`my-main-email@domain.com`) is fictitious, and if you inspected your file, you should see your actual email address for your OSRS account. Anyway, we can change this value, then launch the RuneLite client and the value we set will be seen in the client. One method we could use for changing the file is the `sed` command available in Linux. The command can find a line in a text file and replace it with something else. For example, if we wanted to replace the original email with `my-alt-email@domain.com`, we could run the following command:

```
sed -i 's/.*loginscreen.username.*/loginscreen.username=my-alt-email@domain.com/' ~/.runelite/settings.properties
```

Yes, this command is a little messy and difficult to understand if you have not used `sed` before. So I have provided a brief summary of the important parts of the command:

- `sed -i`: Tell `sed` to use in-place mode, which will edit the file and save the modifications. Without this `-i` option, `sed` will just print the file contents to the terminal window.
- `'s/.*<to-find>.*/<to-replace>'`: The search used to find and replace. In this case we can use `.*` to find anything before or after the `<to-find>` keyword. This will find the existing username property. The `<to-replace>` part will replace the entire line with what we put here.
- `~/.runelite/settings.properties`: The file we are performing the search and replace on. The tilde (`~`) character represents the home directory. In my case it will resolve to `/home/phoil/`.

The essence is that we are finding a line in a file and replacing it with the desired email address. This is exactly like when using search and replace in Notepad or Microsoft Word. The beauty of this solution: it is a command and is completely automated. One last thing remains: How can we change the line and then launch the RuneLite client all at once?

I like to launch the RuneLite client using a command alias. So when I type:

```
runelite
```

It actually runs another command (alias). The other command is:

```
java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF
```

Note that you may have the `RuneLite.jar` folder in another location, so you might need to adjust it. Anyway, we can simply stich these the `sed` and `runelite` commands together and create a new command line alias that:

1. Changes the `loginscreen.username` property in the `settings.properties` file
1. Launches RuneLite

The full solution (command line alias) would look like:

```
alias runelite-alt="sed -i 's/.*loginscreen.username.*/ \
                    loginscreen.username=my-alt-email@domain.com/' \
                    ~/.runelite/settings.properties \
                    && java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF"
```

You would need to put this line in your `~/.bashrc` or `~/.bash_aliases` file. Then reload the terminal using `exec $BASH` - or you could close and reopen the terminal. Note that the alias above is split into multiple lines to provide readability using the backslash character. You could put it in one line if you desired - actually, I would recommend using only one line. You would also need two command line aliases - one for your main, and one for your alt account. I have the following two aliases:

- `runelite-main`: Opens a client with my main email address
- `runelite-alt`: Opens a client with my Ultimate Ironman email address

Finally, to provide a complete example... I have listed my two command line aliases below:

```
alias runelite-amin="sed -i 's/.*loginscreen.username.*/ loginscreen.username=my-main-email@domain.com/' ~/.runelite/settings.properties && java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF"

alias runelite-alt="sed -i 's/.*loginscreen.username.*/ loginscreen.username=my-alt-email@domain.com/' ~/.runelite/settings.properties && java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF"
```

## Technique Two: Create a Jail for your Runelite/OSRS Client

- Works on RuneLite: Yes
- Works on Official client: Yes
- Operating system: Linux (possibly OS X and Windows)
- Provides independent configuration: Yes
- Difficulty: Moderate if you are new to the command line

The second technique was proposed by [AverageHumanoid on a RuneLite Issue post](https://github.com/runelite/runelite/issues/2220#issuecomment-541343711). The idea was to use the `firejail` program to create an isolated sandbox and save all RuneLite client and OSRS cache data in a designated folder, instead of the users home directory. If you want further information on the `firejail` tool see the [Arch Linux Wiki page on Firejail](https://wiki.archlinux.org/index.php/Firejail) or the [Firejail Usage documentation](https://firejail.wordpress.com/documentation-2/basic-usage/#private).

This solution is actually quite simple, and involves three steps:

1. Install the `firejail` program
1. Create a folder to store all RuneLite client and OSRS cache data
1. Run `firejail` to launch RuneLite in a isolated sandbox (a specific folder)

First we should install the `firejail` program. On Ubuntu 18.04 this is pretty easy:

```
sudo apt install firejail
```

This program is not available for Microsoft Windows - but you might have some luck with the `Sandboxie` program (I have not used this program, or tested it).

Next we will make a folder to store data and replicate a user's home directory. I simply made two folders in my actual home directory called `runelite-main` and `runelite-alt`. One folder for my main account and the other folder for my Ultimate Ironman account. I created these using the following two commands:

```
cd ~
mkdir runelite-main
mkdir runelite-alt
```

With these two folders added, we can use `firejail` to launch the RuneLite client and specify that we want to store all data in either of the folders we created. The general command syntax is:

```
firejail --private=<folder-name> <command>
```

We are telling `firejail` to use a specific folder, indicated by `<folder-name>`. And the `<command>` would be the normal `java -jar RuneLite.jar` command. So if I wanted to create a specific isolated sandbox environment for my main account I would use the following command:

```
firejail --private=~/runelite-main/ java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF
```

Remember, you might need to change the `RuneLite.jar` file location to the path you have it saved in your system. If you run the above command, it should launch a fresh, un-configured RuneLite client. If we inspect the `runelite-main` folder you will see all the files required for the RuneLite client, as illustrated below:

```
phoil@t1000 ~ $ ls -lisa ~/runelite-main/
total 40
drwxr-xr-x  7 phoil phoil 4096 Dec  2 06:31 ./
drwxr-xr-x 41 phoil phoil 4096 Dec  2 06:30 ../
-rw-r--r--  1 phoil phoil 3771 Dec  2 06:30 .bashrc
drwxr-xr-x  3 phoil phoil 4096 Dec  2 06:31 .config/
drwxr-xr-x  3 phoil phoil 4096 Dec  2 06:31 jagexcache/
-rw-r--r--  1 phoil phoil   42 Dec  2 06:31 jagex_cl_oldschool_LIVE.dat
drwxr-xr-x  3 phoil phoil 4096 Dec  2 06:30 .java/
drwxr-xr-x  3 phoil phoil 4096 Dec  2 06:31 .local/
-rw-r--r--  1 phoil phoil    1 Dec  2 06:31 random.dat
drwxr-xr-x  7 phoil phoil 4096 Dec  2 06:31 .runelite/
```

So how can we turn this into a single command to launch RuneLite? The same solution as used in technique one, where we create a command line alias. I made the following two command line aliases:

```
alias runelite-main="firejail --private=~/runelite-main/ java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF"

alias runelite-alt="firejail --private=~/runelite-alt/ java -jar /usr/local/bin/runelite/RuneLite.jar --mode=OFF"
```

So when I run `runelite-main` and `runelite-alt` I get two different RuneLite environments. Any RuneLite client configurations I make, will be saved for each _independent_ client! Success! What is even better, you could get this to also work for the Official OSRS client.

## Technique Three: Use Two Different Operating System User Accounts

- Works on RuneLite: Yes
- Works on Official client: Yes
- Operating system: Linux (possibly OS X and Windows)
- Provides independent configuration: Yes
- Difficulty: Complex if you are new to the command line

The third and final technique I outline in this post uses multiple operating system user accounts to store RuneLite configuration and run each client. This technique is suitable for Linux-based operating systems, and potentially OS X... It should also be possible on Windows. I initially got the inspiration for this method from a Reddit post by [u/janzzze who wrote a post entitled Keep RuneLite settings separate between accounts on Windows](https://www.reddit.com/r/2007scape/comments/948w7q/keep_runelite_settings_separate_between_accounts/). So have a look at that post if you are interested in a Windows solution.

So how does this method work? It is very similar to the `firejail` solution used in technique two - but it does not need a specific program. Instead, we create two new user accounts to store our RuneLite clients and configuration. I started by creating two new user accounts:

```
sudo useradd -d /home/runelite-main -m -b /bash/bash runelite-main
sudo useradd -d /home/runelite-alt -m -b /bash/bash runelite-alt
```

You should also add (strong) passwords to each account:

```
sudo passwd runelite-main
sudo passwd runelite-alt
```

This solution may seem counter-intuitive at the moment! Wouldn't we have to switch user accounts to run each RuneLite, or Official, client? Luckily, no! We can leverage the `su` or `sudo` commands to run an application as a different user. So the `.runelite` configuration directory will be stored in the home directory of each user, while the client is run in the current user's desktop environment. Pretty neat!

To start we should make sure we are logged in to your actual user account, not one of the accounts we just made. We need to _share_ the current user's X Window session (the Desktop graphical environment) with other users. This means other users (like the ones we just created) are able to run a graphical application in the current user's desktop environment. This is pretty simple in Linux, we can leverage the `xhost` command to share the desktop:

```
xhost +SI:localuser:<username>
```

I have some security concerns with sharing the X Desktop environment - as it allows other users to connect to the desktop environment. I have a very strict command, allowing only a specific user to connect. So just replace the `<username>` part with the value of your actual user. If you want to disable this, you can run `xhost -` at any time.

Next, we can easily leverage the `sudo` command to run the RuneLite client as a different user. This will be a similar outcome to the `firejail` technique. The `.runelite` folder will be stored in the users home directory (e.g., `/home/runelite-main` or `/home/runelite-alt`). The OSRS cache will also be stored in that users home directory. You can start the RuneLite client as another user by executing:

```
sudo -u <username> java -jar /usr/local/bin/runelite/RuneLite.jar
```

Note that you will need to replace `<username>` with the actual name of your user account. Additionally, you may need to change the location of your `RuneLite.jar` file. Below is an example of running the `RuneLite.jar` launcher as the operating system user account named `runelite-main`:

```
sudo -u runelite-main java -jar /usr/local/bin/runelite/RuneLite.jar
```

In this example, the user who is executing the command is named: `runelite-main`. This highlights another interesting point... In a previous post I wrote about [Installing RuneLite on Ubuntu Linux]({% post_url 2018-10-05-installing-runelite-on-ubuntu-linux %}) I wrote a specific section about storing the `RuneLite.jar` executable in the `/usr/local/bin` directory. This allows other users, not just your primary operating system user account, to access and run the `RuneLite.jar` file. This is a great example of when this can be useful.

Finally, as you have probably gathered (if you read the rest of this post), you can easily create a command line alias to run this long command. For example:

```
alias runelite-main="sudo -u runelite-main java -jar /usr/local/bin/runelite/RuneLite.jar"

alias runelite-alt="sudo -u runelite-alt java -jar /usr/local/bin/runelite/RuneLite.jar"
```

## Conclusion

I hope that you enjoyed, or at least learned something from, this blog post. I had fun investigating the different methods to run the RuneLite client for multiple OSRS accounts with most efficiency and flexibility. I personally use the technique using `firejail` - and very much enjoy have a streamlines login method and independent client configuration between accounts. Until next time... Happy scaping everyone!
