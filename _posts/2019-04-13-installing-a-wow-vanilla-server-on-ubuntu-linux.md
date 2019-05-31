---
layout: post
title: "OSRSBox | Blog | Installing a cMaNGOS WoW Vanilla Private Server on Ubuntu Linux"
name: "Installing a cMaNGOS WoW Vanilla Private Server on Ubuntu Linux"
desc: "An in-depth tutorial on how to install cMaNGOS (mangos-classic) on Ubuntu Linux Server 16.04"
tags:
- Linux
- World of Warcraft
- cMaNGOS
add_to_popular_list: false
thumbnail: wow.png
---

This post provides an in-depth tutorial on how to install and configure a Vanilla, or Classic, World of Warcraft server. Yeah, I know... this is not exactly an Old School RuneScape (OSRS) topic, but I think that it may be interesting to readers who are excited about the prospect of WoW Classic. I personally started playing WoW sometime in mid-2005. Shortly after the release of the Hunter skill in RS2, I jumped ship from RuneScape 2 - as I was unhappy with the direction of the game. This was 6 months or so before the Burning Crusade launched. I didn't come back to RuneScape until OSRS was released - although I didn't even know it was released until 2016!

I embarked on creating my own WoW Vanilla server because I wanted some in-game practice before the official Blizzard servers launched. This gave me the opportunity to try every class from both fractions! Having your own server also allows you to use GM commands to change things like your level, talents, skills, and gold - so the possibilities are endless! This allowed me to try different classes, skills and various talent builds. I also used it to practice solo farming dungeons. Overall, it was much better for _"training"_ than other private servers. However, it really feels like an empty world as you will be the only one in it! And it does require quite a lot of skill to get a server running - but hopefully, this tutorial will help.

{% include figure_lightbox.html path="blog/wow-server/wow-client-hello-world.png" alt="WoW client hello world!" %}

There are many projects available for implementing a Vanilla WoW server. I decided to use [Continued MaNGOS](https://github.com/cmangos/) (cMaNGOS for short) as my solution to build a server. After a little research, I decided this was the most suitable option for me - as it is well documented and stable. The [cMaNGOS GitHub](https://github.com/cmangos) has great installation instructions and excellent general documentation. This tutorial follows the [cMaNGOS Installation Intructions](https://github.com/cmangos/issues/wiki/Installation-Instructions) but tailors it to Ubuntu Linux, and adds additional discussion and bits of information I learned along the way.

This post is a part one of a two-part series:

- **Part 1:** [Installing a WoW Vanilla Private Server on Ubuntu Linux]({% post_url 2019-04-13-installing-a-wow-vanilla-server-on-ubuntu-linux %}) is this post, which covers server installation.
- **Part 2:** [Configuring a WoW Vanilla Private Server on Ubuntu Linux]({% post_url 2019-04-14-configuring-a-wow-vanilla-server-on-ubuntu-linux %}) is the next post, which covers server configuration and management.  

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Prerequisites

I am assuming you have a Linux install somewhere. I used an old machine I had laying around to run the server. However, I have also installed the cMaNGOS server in a virtualized environment (on VMWare Workstation) which ran pretty well. The server has pretty modest requirements, and doesn't need much grunt if you are the only one using the server. The following list documents the setup and configuration information you need for this tutorial:

- A fresh install of Ubuntu Server 16.04.6
- An Internet connection
- General Linux knowledge and experience in the terminal

## Preparing Ubuntu

To start, make sure you update the system packages to get the newest versions available.

{% highlight plaintext %}
sudo apt update && sudo apt upgrade
{% endhighlight %}

The next thing to do is install all the required packages to build cMaNGOS. These are documented on the cMaNGOS GitHub wiki and I have tested them on Ubuntu Server 16.04. Execute the following command to install all required packages.

{% highlight plaintext %}
sudo apt install build-essential gcc g++ automake git-core autoconf make patch libmysql++-dev mysql-server libtool libssl-dev grep binutils zlibc libc6 libbz2-dev cmake subversion libboost-all-dev
{% endhighlight %}

During installation you should be prompted to set a password for the MySQL server for the `root` account, however, this varies between Ubuntu and MySQL versions. If a dialog box for setting the password is not displayed, you will need to manually run the `mysql_secure_installation` tool after the packages have finished installing (make sure to use `sudo` when running the command). Instead of providing lengthy instructions here, I would recommend reading the [official `mysql_secure_installation` documentation in the MySQL Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/mysql-secure-installation.html). Make sure you set a MySQL root password, as during the cMaNGOS installation you will need this password. 

This concludes configuring your Ubuntu Server system for the WoW Vanilla installation.

## Building and Installing cMaNGOS

To start, I recommend creating a base directory to store all files and data for your WoW Vanilla server. I have set up a dedicated directory called `wow` that resides in my users home directory. The remainder of this tutorial uses this structure, and I recommend following it if you are not comfortable changing the file system paths specified in this tutorial. To be specific, my server install is in the following directory: `/home/manager/wow/`. This location can also be called using: `~/wow/`. This is because the tilde character (`~`) refers to the home directory of the logged in user - so if your username is `batman` and you make a directory called `wow` in your home folder, the notation of `~/wow` will be the same for your user as it is for mine. The remainder of this tutorial provides commands that use the `~/wow` location, so you will need to update these commands if you want to install the server elsewhere.

Start by making sure you are in your home directory, then create a folder for all server content called `wow`. This is achieved using the following commands:

{% highlight plaintext %}
cd ~        # Change to home directory
mkdir wow   # Create folder named wow
cd wow      # Change to the wow directory
{% endhighlight %}

After creating the base directory for all content, we are going to download the cMaNGOS server code and data from their GitHub repository. This is the source code required to power the server and link together the art assets (player models, npc models, environment models etc.) and database code (item information, npc information etc.). First, download the core Vanilla (Classic) core code using the following command:

{% highlight plaintext %}
git clone git://github.com/cmangos/mangos-classic.git
{% endhighlight %}

Now, download the Vanilla (Classic) database. As briefly mentioned, this repository contains all the data about the Vanilla server including item information (e.g., item bonuses) and npc information (e.g., hit points).

{% highlight plaintext %}
git clone git://github.com/cmangos/classic-db.git
{% endhighlight %}

If you list the current directory you are in, you should see the following folders storing the data from the git repositories that we downloaded:

{% highlight plaintext %}
manager@ubuntu:~/wow$ ls -la
total 16
drwxr-xr-x  4 manager manager 4096 Jan  7 09:44 .
drwxr-xr-x 39 manager manager 4096 Jan  7 09:41 ..
drwxr-xr-x  3 manager manager 4096 Jan  7 09:44 classic-db
drwxr-xr-x  9 manager manager 4096 Jan  7 09:44 mangos-classic
{% endhighlight %}

Next, we want to prepare the core source code (`mangos-classic`) to be built (compiled) and installed on our Ubuntu Server system. Start by changing into the core source code directory and creating a new directory called `build`. The following commands will get this done.

{% highlight plaintext %}
cd mangos-classic # Change to the mangos-classic directory
mkdir build       # Make a new directory in mangos-classic called build
cd build          # Change to the newly created directory called build
{% endhighlight %}

At this point, we can make a selection of unique configurations for the cMaNGOS server we are going to build. To set the build configurations we use the `cmake` tool, the same tool we use to actually build (compile) the core server code. Below is a summary of the options that are available.

{% highlight plaintext %}
  Options that can be used in order to configure the process:
    CMAKE_INSTALL_PREFIX    Path where the server should be installed to
    PCH                     Use precompiled headers
    DEBUG                   Include additional debug-code in core
    WARNINGS                Show all warnings during compile
    DEBUG                   Include additional debug-code in core
    POSTGRESQL              Use PostgreSQL instead of mysql
    BUILD_GAME_SERVER       Build game server (core server)
    BUILD_LOGIN_SERVER      Build login server (auth server)
    BUILD_EXTRACTORS        Build map/dbc/vmap/mmap extractor
    BUILD_SCRIPTDEV         Build scriptdev. (Disable it to speedup build in dev mode by not including scripts)
    BUILD_PLAYERBOT         Build Playerbot mod
{% endhighlight %}

Some of these options are really important, and some of these are enabled by default. The basic things we require are `BUILD_GAME_SERVER` and `BUILD_LOGIN_SERVER` to power our server and allow the game to run and players to log on (these are enabled by default). We should also set `BUILD_EXTRACTORS` to be on, so we can build the extraction tools to extract art assets from the game client (discussed later). We should also set the `CMAKE_INSTALL_PREFIX` so that we install the server to a specific file system location. Finally, I like to enable `BUILD_PLAYERBOT` so that I can _spawn_ some bots to play with (where you might require an additional player that is controlled by the computer, such as a dungeon when you are solo playing on your own server). If you want the same configurations as me, run the following `cmake` command.

{% highlight plaintext %}
cmake .. -DCMAKE_INSTALL_PREFIX=\../run -DBUILD_EXTRACTORS=ON -DPCH=1 -DDEBUG=0 -DBUILD_PLAYERBOT=ON
{% endhighlight %}

As a quick summary:

- `-DCMAKE_INSTALL_PREFIX=\../run`: Install the server to the `run` directory. In this tutorial, it will be in the `~/wow/cmangos-classic/run/` directory.
- `-DBUILD_EXTRACTORS=ON`: Include tools to extract data from the client (art assets including maps and player/npc models)
- `-DPCH=1`: Build using precompiled headers
- `-DDEBUG=0`: Set debug level to 0 during the build, this means debugging is off. If you have problems during the build phase set this to 1
- `-DBUILD_PLAYERBOT=ON`: Include player bot support

If you do not want player bots, just remove that part of the command. Same with the extraction tools if you do not need them (this means that you have the art assets from a previous server build).

When you are happy with your configuration, run the full `cmake` command with the required arguments. You should get some output similar to the example snippet provided below. Make sure you check this for any errors or warnings. It will provide a summary at the bottom of what is going to be built.

{% highlight plaintext %}
manager@ubuntu:~/wow/mangos-classic/build$ cmake .. -DCMAKE_INSTALL_PREFIX=\../run -DBUILD_EXTRACTORS=ON -DPCH=1 -DDEBUG=0 -DBUILD_PLAYERBOT=ON

-- Detected 64-bit platform
-- UNIX: Configuring uninstall target
-- UNIX: Created uninstall target
-- UNIX: Detected compiler: /usr/bin/cc
-- GCC: SFMT enabled, SSE2 flags forced
-- cotire 1.7.9 loaded.
-- Boost version: 1.58.0
-- Found the following Boost libraries:
--   system
--   program_options
--   thread
--   regex
--   chrono
--   date_time
--   atomic
-- Using mysql-config: /usr/bin/mysql_config
-- Found MySQL library: /usr/lib/x86_64-linux-gnu/libmysqlclient.so
-- Found MySQL headers: /usr/include/mysql
-- CMaNGOS-Core revision : c60db72179967a66de06d5b88f14c2bde54dc765
-- Revision time stamp   : "2018-11-09T12:41:21+03:00"
-- Install server to     : /home/manager/wow/mangos-classic/run
-- Use PCH               : Yes (default)
-- Build in debug-mode   : No  (default)
-- Build game server     : Yes (default)
-- Build login server    : Yes (default)
-- Build ScriptDev       : Yes (default)
-- Build Playerbot       : Yes
-- Build extractors      : Yes

-- Configuring done
-- Generating done
-- Build files have been written to: /home/manager/wow/mangos-classic/build
{% endhighlight %}

When you are ready to proceed, run the `make` command with no arguments, as specified below:

{% highlight plaintext %}
make
{% endhighlight %}

Depending on the capabilities of your system, this process might take a while. When writing this tutorial I built cMaNGOS on a Virtual Machine with 1 CPU and 2GB RAM and it took about 45 mins. On my physical server that has a 4 Core i5 processor and 16GB RAM, the build process took about 15 minutes. Regardless, find something to do for a while and come back later - it gets pretty boring looking a progress bar for any more than 5 minutes!

During the build process, you will see a variety of output when the core server code is being compiled. The output should be similar to the example below.

{% highlight plaintext %}
[ 53%] Building CXX object src/game/CMakeFiles/game.dir/AI/ScriptDevAI/scripts/kalimdor/ashenvale.cpp.o
[ 53%] Building CXX object src/game/CMakeFiles/game.dir/AI/ScriptDevAI/scripts/kalimdor/darkshore.cpp.o
[ 53%] Building CXX object src/game/CMakeFiles/game.dir/AI/ScriptDevAI/scripts/kalimdor/feralas.cpp.o
[ 54%] Building CXX object src/game/CMakeFiles/game.dir/AI/ScriptDevAI/scripts/kalimdor/winterspring.cpp.o
[ 54%] Building CXX object src/game/CMakeFiles/game.dir/AI/ScriptDevAI/scripts/kalimdor/ungoro_crater.cpp.o
[ 54%] Building CXX object src/game/CMakeFiles/game.dir/AI/ScriptDevAI/scripts/kalimdor/dustwallow_marsh.cpp.o
{% endhighlight %}

When done, we need to actually _install_ the compiled code to the `~/wow/mangos-classic/run/` directory. This is easily achieved using the following command.

{% highlight plaintext %}
make install
{% endhighlight %}

For your information, the `make install` command usually requires `sudo` or elevated system privilege, but we are installing to our own home directory which we own and have unrestricted access to, so we do not require elevated permissions.

To be thorough, I have included the output of the `make install` command below.

{% highlight plaintext %}
manager@ubuntu:~/wow/mangos-classic/build$ make install
[  2%] Built target detour
[  4%] Built target recast
[  5%] Built target gsoap
[ 13%] Built target g3dlite
[ 14%] Built target mpqlib
[ 14%] Built target framework
[ 19%] Built target shared
[ 89%] Built target game
[ 91%] Built target mangosd
[ 92%] Built target realmd
[ 93%] Built target ad
[ 95%] Built target vmap_extractor
[ 96%] Built target vmap_assembler
[ 98%] Built target vmaplib
[100%] Built target MoveMapGen
Install the project...
-- Install configuration: "Release"
-- Installing: /home/manager/wow/mangos-classic/run/etc/playerbot.conf.dist
-- Installing: /home/manager/wow/mangos-classic/run/bin/run-mangosd
-- Installing: /home/manager/wow/mangos-classic/run/bin/mangosd
-- Set runtime path of "/home/manager/wow/mangos-classic/run/bin/mangosd" to "../lib"
-- Installing: /home/manager/wow/mangos-classic/run/etc/mangosd.conf.dist
-- Installing: /home/manager/wow/mangos-classic/run/bin/realmd
-- Set runtime path of "/home/manager/wow/mangos-classic/run/bin/realmd" to "../lib"
-- Installing: /home/manager/wow/mangos-classic/run/etc/realmd.conf.dist
-- Installing: /home/manager/wow/mangos-classic/run/bin/tools/ad
-- Set runtime path of "/home/manager/wow/mangos-classic/run/bin/tools/ad" to "../lib"
-- Installing: /home/manager/wow/mangos-classic/run/bin/tools/vmap_extractor
-- Set runtime path of "/home/manager/wow/mangos-classic/run/bin/tools/vmap_extractor" to "../lib"
-- Installing: /home/manager/wow/mangos-classic/run/bin/tools/vmap_assembler
-- Set runtime path of "/home/manager/wow/mangos-classic/run/bin/tools/vmap_assembler" to "../lib"
-- Installing: /home/manager/wow/mangos-classic/run/bin/tools/MoveMapGen
-- Set runtime path of "/home/manager/wow/mangos-classic/run/bin/tools/MoveMapGen" to "../lib"
{% endhighlight %}

## Setting Up cMaNGOS

So far we have only built (compiled) and installed the core server code. We still need to perform some server configurations and link together the database and server. To start with we will load the database data and then make some slight server configurations.

### Seting Up the cMaNGOS Database

Setting up the database is relatively easy as there are a collection of scripts that just need to be run. To start, make sure you are in the root directory of `mangos-classic` using the following command.

{% highlight plaintext %}
cd ~/wow/mangos-classic
{% endhighlight %}

We will start by importing the contents from the `db_create_mysql.sql` file into our own MySQL server database. This `.sql` file is relatively simple, it creates the following three databases:

- `mangos`: to store game/server information
- `characters`: to store player character information
- `realmd`: to store information and settings for our server realm (world)

To set up these databases require importing a few `.sql` files. The first is `db_create_mysql.sql` which creates the databases and sets the permissions. When importing this SQL file, it also creates a user called `mangos` that is used to log in to the database and make changes or check database information. There is also a default password of `mangos` set for the `mangos` user. You can leave this password as the default, but I would recommend changing it. If you want to change the username or password, find the following line in the `~/wow/mangos-classic/sql/create/db_create_mysql.sql` file:

{% highlight plaintext %}
CREATE USER 'mangos'@'localhost' IDENTIFIED BY 'mangos';
{% endhighlight %}

You can change the password by changing the `IDENTIFIED BY` value. For example, in the example below, I changed the default `mangos` password to `sneakfeetpanda`. Obviously, this is not my actual password.

{% highlight plaintext %}
CREATE USER 'mangos'@'localhost' IDENTIFIED BY 'sneakfeetpanda';
{% endhighlight %}

If you make this change, you will need to make additional changes later in this tutorial, so make sure you read the later sections carefully. If you also change the default username of `mangos`, you will need to change the `'mangos'@'localhost'` values in this file, and other `.sql` files. I don't recommend changing the default `mangos` username, as you will have to make a lot of other changes later. I did make this change for my server, and it was a bit of a hassle changing additional values.

Now we will import the database file using the following command. Note: you will be required to enter the `root` password for the MySQL server that you set at the start of this tutorial. This is not the `mangos` password that you just set! We are using the `root` password, not the `mangos` password! Also, you will be prompted for the password of your user as well, as you are executing this command using `sudo`. Make sure you get the passwords entered in the correct order (as asked by the system).

{% highlight plaintext %}
sudo mysql -uroot -p < ~/wow/mangos-classic/sql/create/db_create_mysql.sql
{% endhighlight %}

Now we are going to initialize the main MaNGOS database and load all default content. Enter the following command to achieve this. Once again you will have to enter the password for the `root` account for the MySQL server.

{% highlight plaintext %}
sudo mysql -uroot -p --database=classicmangos < ~/wow/mangos-classic/sql/base/mangos.sql
{% endhighlight %}

Still not done! We now need to import the original data for the server. The following command will require you to enter the `root` MySQL password three times, as the `for` loop loads three SQL files.

{% highlight plaintext %}
for sql_file in ls ~/wow/mangos-classic/sql/base/dbc/original_data/*.sql; do sudo mysql -uroot -p --database=classicmangos < $sql_file ; done
{% endhighlight %}

We also need to load any fixes that have been specified by the cMaNGOS development team.

{% highlight plaintext %}
for sql_file in ls ~/wow/mangos-classic/sql/base/dbc/cmangos_fixes/*.sql; do sudo mysql -uroot -p --database=classicmangos < $sql_file ; done
{% endhighlight %}

Only one thing left to do. Import the characters and realmd database files using the following two commands:

{% highlight plaintext %}
sudo mysql -uroot -p classiccharacters < ~/wow/mangos-classic/sql/base/characters.sql
sudo mysql -uroot -p classicrealmd < ~/wow/mangos-classic/sql/base/realmd.sql
{% endhighlight %}

Excellent, we have fully initialized the database. Later in this tutorial, we will discuss how to log in to the database and how to view information or edit information that we might want to change.

### Setting Up Your Vanilla WoW Server

Now that we have installed the server and initialized the database we will start configuring our cMaNGOS installation. In this section, we will perform some basic customizations such as database connections for the server, realm name, and realm types.

To start, make sure you are in the run directory. 

{% highlight plaintext %}
cd ~/wow/mangos-classic/run
{% endhighlight %}

This directory contains a `bin` directory with binaries (executables) to start the server and an `etc` directory with configuration files.

In the `etc` directory, rename the configuration (`.conf`) files so that they can be used when starting the server. The configuration files are shipped with a `.conf.dist` file extension, but will not work unless you have a file that only ends in `.conf`. So we will just make a copy of the files and remove the `.dist` extension in the copying process. This is a good method as it keeps the original `.conf.dist` files as a backup.

{% highlight plaintext %}
cp ~/wow/mangos-classic/run/etc/mangosd.conf.dist ~/wow/mangos-classic/run/etc/mangosd.conf
cp ~/wow/mangos-classic/run/etc/realmd.conf.dist ~/wow/mangos-classic/run/etc/realmd.conf
cp ~/wow/mangos-classic/run/etc/playerbot.conf.dist ~/wow/mangos-classic/run/etc/playerbot.conf
{% endhighlight %}

After this process, you should end of with a total of 6 files in the `run/etc/` directory. You can check that the files actually exist using the folloiwng command:

{% highlight plaintext %}
manager@ubuntu:~/wow/mangos-classic/run$ ls -la ~/wow/mangos-classic/run/etc/
total 200
drwxrwxr-x 2 manager manager  4096 Mar 24 12:24 .
drwxrwxr-x 4 manager manager  4096 Mar 24 12:12 ..
-rw-r--r-- 1 manager manager 58718 Mar 24 12:24 mangosd.conf
-rw-r--r-- 1 manager manager 58718 Mar 24 11:51 mangosd.conf.dist
-rw-r--r-- 1 manager manager  3249 Mar 24 12:24 playerbot.conf
-rw-r--r-- 1 manager manager  3249 Mar 24 11:50 playerbot.conf.dist
-rw-r--r-- 1 manager manager  4757 Mar 24 12:24 realmd.conf
-rw-r--r-- 1 manager manager  4757 Mar 24 11:50 realmd.conf.dist
{% endhighlight %}

Before starting on the next step, we will make a specific directory for the server logs. I prefer to keep this in the `run/logs` directory - but you could essentially put them anywhere. If you want to keep the exact method specified in this tutorial, run the following command to create a directory for the server log files.

{% highlight plaintext %}
mkdir ~/wow/mangos-classic/run/logs
{% endhighlight %}

Now we want to edit the _realm_ configuration file and set some useful configuration options. The `realm.conf` file contains some basic configuration options. There are comments (lines starting with the `#` symbol, which explain the options in detail). I use the `vim` editor, but you can also open the text file using `nano`. Open the `realmd.conf` file using the following command:

{% highlight plaintext %}
vim ~/wow/mangos-classic/run/etc/realmd.conf
{% endhighlight %}

The first change we will make is to change the database login information. If you made any modifications to the database when importing (e.g., change the username or password), you will need to change the line named `LoginDatabaseInfo`. The default example is provided below.

{% highlight plaintext %}
LoginDatabaseInfo = "127.0.0.1;3306;mangos;mangos;classicrealmd"
{% endhighlight %}

The only change I have made was the `mangos` password. So my database login line is:

{% highlight plaintext %}
LoginDatabaseInfo = "127.0.0.1;3306;mangos;sneakfeetpanda;classicrealmd"
{% endhighlight %}

When you are finished, save and exit the file.

The next file we will edit is more important. The `mangosd.conf` file is over 1500 lines long and has lots of configuration options for your WOW Vanilla server. The documentation embedded in the file is really useful to make sure you understand the options available. I will only discuss some of the more important configurations, but there are much more available. Open the file to edit.

{% highlight plaintext %}
vim ~/wow/mangos-classic/run/etc/mangosd.conf
{% endhighlight %}

Set the data directory, and make sure to replace the `<username>` part with the username of your user. If you are unsure of your username, run the `whoami` command on another terminal.

{% highlight plaintext %}
DataDir = "/home/<username>/wow/mangos-classic/run"
{% endhighlight %}

Below is an example of my user (which is named `manager`) and the setting I put for my `DataDir` value.

{% highlight plaintext %}
DataDir = "/home/manager/wow/mangos-classic/run"
{% endhighlight %}

Next, we will set the logs directory. This will require you make the logs directory first (as specified above). You need to perform a similar configuration change, putting in the absolute path to your specified log file directory. The example of the value I specified for my user is documented below.

{% highlight plaintext %}
LogsDir = "/home/manager/wow/mangos-classic/run/logs"
{% endhighlight %}

You also need to set the database connection information in this file. There are a total of three lines, one for each of the required databases that we initialized earlier.

{% highlight plaintext %}
LoginDatabaseInfo     = "127.0.0.1;3306;mangos;sneakfeetpanda;classicrealmd"
WorldDatabaseInfo     = "127.0.0.1;3306;mangos;sneakfeetpanda;classicmangos"
CharacterDatabaseInfo = "127.0.0.1;3306;mangos;sneakfeetpanda;classiccharacters"
{% endhighlight %}

OK... everything should be set up and ready. However, before we move on we are going to edit one more server configuration option. We are going to set the server type (e.g., Normal, PVP). This is specified by the `GameType` option. If you are going to solo play on your server this is not a big deal, but out of habit I always set it to PVP (value of `2`), as shown below:

{% highlight plaintext %}
GameType = 2        # For PVP server
{% endhighlight %}

You can change a lot of other server defaults here including player naming conventions, start money for characters, flight paths configuration, server performance settings, logging configuration etc. I would recommend having a good read over the file to see in there are any configurations you want to set. Remember, you can always come back later and modify this file. Make sure you save and exit the file.

### Populate the World Database with mangos-classic-db

OK! So far we have compiled, installed and configured our WoW Vanilla server. We initialized the database, but we did not actually populate the database with any information - such as NPCs and quest information. We will do this now. Start by changing into the directory of the `classic-db` repository that we downloaded right at the start of the tutorial.

{% highlight plaintext %}
cd ~/wow/classic-db
{% endhighlight %}

Run the installation script. On the first run, the script creates a configuration file (called `InstallFullDB.config`) that we must edit before running the script again.

{% highlight plaintext %}
./InstallFullDB.sh
{% endhighlight %}

Open the automatically generated configuration file.

{% highlight plaintext %}
vim ~/wow/classic-db/InstallFullDB.config
{% endhighlight %}

In the generated configuration file we must edit the password if you used something other than the default `mangos` password. For example, using the fictional password I previously used in the tutorial, set the password value to match.

{% highlight plaintext %}
PASSWORD="sneakfeetpanda"
{% endhighlight %}

Run the script again. It will use the configuration file this time to load the database provided.

{% highlight plaintext %}
./InstallFullDB.sh
{% endhighlight %}

This was pretty much the last step for any database configuration.

### Extract Game Data from the Vanilla Client

Now we are going to extract the client game data from the official WoW 1.12 client. This client is not included in the cMaNGOS GitHub repository as it is copyrighted by Blizzard. I own a version of the original game, so I use my previously installed copy. However, there are a variety of clients floating around the Internet, for example, the [Kronos WoW](http://www.kronos-wow.com/) server... but really, you should own your own copy! But I wouldn't feel too bad about it... if you have previously bought a copy of the original WoW release. Also, this step is not required if you have previously extracted client data!. 

In the following instructions, `~/wow-client` is the directory that contains the install 1.12 WoW client. Below is an example listing of the contents of my `~/wow-client` directory.

{% highlight plaintext %}
manager@ubuntu:~$ ls -la ~/wow-client/
drwxrwxr-x 10 manager manager    4096 .
drwxr-xr-x 40 manager manager    4096 ..
-rwxrwxrwx  1 manager manager  762116 BackgroundDownloader.exe
-rwxrwxrwx  1 manager manager  294912 BNUpdate.exe
drwxrwxr-x  3 manager manager    4096 Data
-rwxrwxrwx  1 manager manager 1038848 dbghelp.dll
-rwxrwxrwx  1 manager manager  413696 DivxDecoder.dll
drwxrwxr-x  7 manager manager    4096 Documentation
drwxrwxr-x  2 manager manager    4096 Errors
-rwxrwxrwx  1 manager manager  162816 fmod.dll
drwxrwxr-x  2 manager manager    4096 Fonts
-rwxrwxrwx  1 manager manager  372736 ijl15.dll
drwxrwxr-x  3 manager manager    4096 Interface
-rwxrwxrwx  1 manager manager 1196292 Launcher.exe
drwxrwxr-x  2 manager manager    4096 Logs
-rwxrwxrwx  1 manager manager      36 realmlist.bku
-rwxrwxrwx  1 manager manager      24 realmlist.wtf
-rwxrwxrwx  1 manager manager  720896 Repair.exe
-rwxrwxrwx  1 manager manager   46852 Scan.dll
-rwxrwxrwx  1 manager manager  245408 unicows.dll
drwxrwxr-x  2 manager manager    4096 WDB
-rwxrwxrwx  1 manager manager 4775986 WoW.exe
drwxrwxr-x  3 manager manager    4096 WTF
{% endhighlight %}

Start by copying the extractor scripts to the client folder.

{% highlight plaintext %}
cp ~/wow/mangos-classic/contrib/extractor_scripts/* ~/wow-client
{% endhighlight %}

Next, we will copy the extractor tools to the client folder.

{% highlight plaintext %}
cp ~/wow/mangos-classic/run/bin/tools/* ~/wow-client
{% endhighlight %}

Move into client folder, and change permissions on extractor scirpt:

{% highlight plaintext %}
cd ~/wow-client
chmod u+x ExtractResources.sh
{% endhighlight %}

Run the extractor script:

{% highlight plaintext %}
./ExtractResources.sh
{% endhighlight %}

Follow the prompts for the ExtractResources script. Basically, you need to select `y` to extract everything, `N` for the number of processors (I choose `4` as my system has 4 cores), and `Enter` to not delay mmap extraction (unless you want to). Make sure you press `Enter` at the end to start the process when the following information is presented.

{% highlight plaintext %}
Current Settings: Extract DBCs/maps: 1, Extract vmaps: 1, Extract mmaps: 1 on 4 processes

If you don't like this settings, interrupt with CTRL+C
{% endhighlight %}

If you do not press `Enter` after this line, the extraction process will not start! You can tell it starts are it provides detailed progress of what the script is doing. As a side note, it is recommended to extract `mmaps`, but it takes a while (read: it takes forever!). If you are interested in `mmaps`, and their importance, the following reference clearly describes their use:

<blockquote class="blockquote">
  <p class="mb-0">Mmaps are similar (to vmaps) overlays that tell the server where to route creatures and NPCs so that they don't run over top of rocks and fence posts. They aren't technically necessary but they greatly enhance the game experience and there isn't really a good reason not to use them.</p>
  <footer class="blockquote-footer">cMaNGOS developers, <cite title="Source Title">Beginners Guide What Everything Is</cite></footer>
</blockquote>

Extracting all the client data took 40 minutes on my system - but about 2 hours on my other virtual machine setup. The long time is due to extracting the mmaps - but they are definitely worth it! 

When finished, we need to copy all created directories and data from the client extraction scripts to the `~/wow/mangos-classic/run` directory. The following command will do this for each of the four (4) extracted types of client data.

{% highlight plaintext %}
cp -R ~/wow-client/dbc ~/wow/mangos-classic/run
cp -R ~/wow-client/maps ~/wow/mangos-classic/run
cp -R ~/wow-client/vmaps ~/wow/mangos-classic/run
cp -R ~/wow-client/mmaps ~/wow/mangos-classic/run
{% endhighlight %}

As an optional step, you can backup all files extracted from the client for future use. I created a compressed tarball of all the files using the following commands.

{% highlight plaintext %}
cd ~/wow-client
tar -czf ~/1.12.1-extracted-client-data.tar.gz dbc maps vmaps mmaps
{% endhighlight %}

This command will create a tarball archive of all the extracted data, and save it in a file called `1.12.1-extracted-client-data.tar.gz` in the `~/wow-client` directory. Make sure to save it if you ever want to repeat this process again.

DONE! We can pretty much run the game server now. But there are a large number of additional configuration steps available to make managing and running the server much easier! The steps are too long to include in this post, so I have written a second post called [Configuring a WoW Vanilla Private Server on Ubuntu Linux]({% post_url 2019-04-14-configuring-a-wow-vanilla-server-on-ubuntu-linux %}). 

## Conclusion

This post discussed and outlined how to install a WoW Vanilla server on Ubuntu Linux 16.04. The end result is a private server that you host on a Linux system and connect to using the normal WoW 1.12 client. I personally installed a private server on my Linux box on my home network and practiced solo dungeons and tried out the various classes. Basically, I used it to get myself ready for the release of WoW Classic.

The next post in the series continues the journey of creating your own private WoW Vanilla server. Next time we perform various configurations of our server installation such as setting up methods to run the server easily, adding a firewall using `iptables`, creating accounts, and adding then using game moderator status and the associated gm commands.
