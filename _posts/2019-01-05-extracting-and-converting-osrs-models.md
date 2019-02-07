---
layout: post
title: "OSRSBox | Blog | Extracting and Converting OSRS Models"
name: "Extracting and Converting OSRS Models"
desc: "Documentation about how to extract and convert OSRS models for 3D modeling or 3D printing"
tags:
- 3D Models
- Cache
- RuneLite
- OpenRS
add_to_popular_list: true
thumbnail: jad3d.png
---

This post discusses and outlines how to extract 3D models from the OSRS cache, then convert the extracted models to a different file format to allow you to open the model files in common tools, such as Blender. From here, you can really do anything with the models... including 3D printing your favorite boss, or rigging and defining a new animation to make an NPC or object do something interesting! 

One caveat, the models are (of course) proprietary and owned by Jagex - **this documentation is purely an educational exercise**. Please do not use this information for nefarious purposes, and treat OSRS content with the love and respect it deserves! For example, please do not extract models, 3D print them and then sell them for monetary gain.

Below is an example of the infamous TzTok-Jad that has been extracted, converted and opened in Blender.

{% include figure.html path="blog/extracting-models/jad3d.png" alt="Jad 3D model in Blender" %}

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Introduction

For a while, I have been interested in 3D modeling and 3D printing. I am by no means an expert in either... and, to be honest, I have minimal experience. I started messing around with [Blender](https://www.blender.org/) to edit videos, then got the hang of some basic 3D modeling techniques. My crowning glory was a dwarf cannon I modeled from scratch in Blender. I got up to the animation stage and then lost enthusiasm! Behold my creation!

{% include figure.html path="blog/extracting-models/dwarf_cannon.png" alt="Jad 3D model in Blender" %}

It suddenly came to me that I could have probably skipped the step of designing my own dwarf cannon in Blender, and simply try to load the 3D model from the game. And here we are now. This post discusses how I extracted 3D models from the OSRS cache, converted the files, and opened them in Blender. In a future post, I will embark on printing a 3D model and hopefully get to the point of creating a 3D model of my in-game character.

### Extracting OSRS Models Research

This may seem obvious, but the first step to getting a 3D model is to actually extract the model from the game. So where exactly is this data - the OSRS cache! This process proved a little more challenging than I initially expected. There were so many tools available to parse the OSRS cache and extract different types of information and data. There we also many tools that claimed to extract, or extract and convert models. 

This was far from a simple process, and I encountered a variety of problems. Many tools I tried along the way were pretty bad! They either did not support the OSRS cache structure or just crashed with no descriptive error messages. To further the problem, the documentation was severely limited (read: non-existent). In addition, most the tools were not open source, instead, they were distributed in a single binary, which resulted in the inability to verify or extend the tool. I ran these tools in an isolated virtual machine, because who knows what malicious code was included! Anyway, I finally found a good project on GitHub called OpenRS which had the support to extract models. I recently wrote an article called [OpenRS Tutorial - Compiling and Using the OpenRS Cache Tools]({% post_url 2018-11-23-openrs-tutorial %}). Specifically, there is a subsection in the post called _Extracting Models_ which outlines how to extract an item, inventory, NPC and object models. 

On a recent extraction of models using OpenRS on the OSRS cache resulted in over 67,000 models being extracted. However, one major issue with this tool is that the models are exported as `.dat` files which are an unknown file format. This leads to the next step of converting the unknown file format.

### Converting OSRS Models Research

Most of the model extraction tools I tried resulted in the extraction of `.dat` files, which were comprised of binary data. I searched far and wide to find more information about the model file format used in OSRS but did not have much luck finding reliable information. However, along the way, I did find a variety of posts and comments about different tools and model conversion methods. I also found a variety of code, specifically Java classes, which were helpers to load the OSRS model file format. After trying a large number of tools, I was left frustrated. Again most tools were not operating correctly, and even when tools worked I was getting lots of model conversion errors. 

One of the better tools I found along the way was called `rsm2obj` which stands for _RuneScape Model to Object_. The _Wavefront .obj file_ with the `.obj` extension is a well known and commonly used 3D model file format. Most other tools I found also converted to this file format. The `rsm2obj` tool was written in C#, but had a number of errors, and failed for conversion for lots of models - from my quick review, most of the failed conversions were for newer models that had been recently added into the game.

Another tool I found in my research was called [i3DConverter](http://i3dconverter.com/). This tools worked well at converting the `.dat` files to a wide variety of other 3D model file formats. However, the tool is not free, and if using the non-licensed version you get a model without all the geometric data - models were missing vertices and were incomplete. I found it interesting that this tool could convert the models, so the OSRS model file format must be a supported/well known 3D model file format. Food for thought...

OK... you might know where this is going - especially if you read any of my other posts. I seem to write this in every article I post... It pops up in every project I do... Once again, RuneLite to the rescue! After all my research and testing model conversion (and extraction)... the best solution was right under my nose the entire time! I am not sure how Adam does it, but the guy (and his co-developers) are amazing and have a ridiculously robust code base. Sitting in the [Cache project, in the test folder](https://github.com/runelite/runelite/tree/master/cache/src/test/java/net/runelite/cache) was a bunch of useful code...

## Writing a Simple Model Extraction and Conversion Tool

So the plan had been forged. Use some existing code in the RuneLite Cache project, and adapt it to extract and convert models from the OSRS cache. I found a collection of tools/code in the RuneLite Cache project, specifically in the `test` folder. This code is available, but not implemented anywhere in the actual RuneLite cache tool. The two files of interest are:

1. [ModelDumperTest.java](https://github.com/runelite/runelite/blob/master/cache/src/test/java/net/runelite/cache/ModelDumperTest.java)
1. [ObjExporterTest.java](https://github.com/runelite/runelite/blob/master/cache/src/test/java/net/runelite/cache/models/ObjExporterTest.java)

I could tell by the name of the files what they did... it was pretty self-explanatory! _ModelDumper_, it must dump models! _ObjExporter_, it must export to the `.obj` file format! The classes were not set up to actually use in their current state, so I put together some of the code to make a program to extract and convert models.

### Development of the ModelDumper Tool

I won't go into detail here, as most people are probably not interested! For those that are, you can read the code. I tried to be nice and add comments. Most of the code in the `main` method is for attempting to find and load the OSRS cache from the default location. There are also `dump` and `convert` methods that handle the extraction and conversion of the models. If you are interested in the code, it is available in my fork of the RuneLite client, under a branch called `model-dumper`. The program is the addition of a single file into the Cache project. The full `ModelDumper.java` file is available [in my branch on GitHub](https://github.com/osrsbox/runelite/blob/model-dumper/cache/src/main/java/net/runelite/cache/ModelDumper.java).

**Caveat:** I am not a Java developer, far from it! So the code is probably a little funky and could be written better. I was an embedded programmer for a long time (pure C), and my new job is not programming heavy and I mainly prototype in Python, and script for automation using Python and Powershell. So please forgive my bad practice and hacky code!

## Using the ModelDumper Tool

This section documents the instructions to download, compile and run the ModelDumper tool. For those who have developed in RuneLite or have Java or other programming experience, it should be no problem. For those without experience, it might be difficult.

I am unsure if I should release the compiled binary (`.jar`) file for the ModelDumper tool. The are reasons for and against an executable binary release. My primary reason not to release is that I personally would not trust some random persons compiled software floating around on the Internet. So the source has been made available to demonstrate that there is nothing malicious in the program. The only reason to release a compiled executable is that running this software is not easy and requires setup and some previous knowledge. Anyway, let me know in the comments if you would like a compiled version. This is allowed under the BSD 2-Clause License used by RuneLite, as long as the [LICENSE](https://github.com/runelite/runelite/blob/master/LICENSE) is distributed with the code/program.

### Compiling the ModelDumper Tool

If you want to download and compile the ModelDumper program, the following (briefly described) instructions will hopefully help.

1. Use git to clone my fork for the RuneLite client
1. `git clone https://github.com/osrsbox/runelite.git`
1. Change to the downloaded repository directory
1. `cd runelite`
1. Check out my branch named `model-dumper` that has the ModelDumper tool
1. `git checkout model-dumper`
1. Import the `runelite` project into IntelliJ, see my post on [Setting up the Development Environment]({% post_url 2018-08-10-writing-runelite-plugins-part-1-building %}) if you need additional documentation
1. Build the entire `runelite-parent` project as per the usual RuneLite compilation instructions

### Running the ModelDumper Tool

Once you have downloaded, imported and built my modified fork of the RuneLite client, you can run the ModelDumper tool. The following instructions outline the steps I performed.

1. In IntelliJ, locate the ModelDumper tool (`runelite/cache/src/main/java/net/runelite/cache/ModelDumper.java`)
1. Run the tool by right-clicking and selecting:
1. _Run ModelDumper.Main()..._

The first time you run the ModelDumper tool, the tool will run and produce one of the following errors:

- _Invalid cache directory. Exiting._
- _Nothing to do. Exiting._

You must supply two things to make the program run correctly:

1. A command argument to tell the tool what to do (e.g., dump the models, or dump the models and convert)
1. The location of the OSRS cache if it is not in the default location (the home directory of the currently logged in user)

After running the ModelDumper tool at least once, it will automatically create a _Run Configuration_ for the ModelDumper program. This is the same place where you can edit the _RuneLite_ configuration when building and running the RuneLite client from within the IntelliJ IDE. We now need to edit the configuration to actually run the program. In IntelliJ navigate to the _Run_ menu, then select _Edit Configurations_, you should see the following dialog box but your options will look different.

{% include figure.html path="blog/extracting-models/modeldumper-program-arguments.png" alt="The IntelliJ edit configurations interface with ModelDumper program arguments" %}

We need to make a couple of small modifications here. Make sure you have _ModelDumper_ selected from the _Application_ menu on the left-side pane. Ensure this is correctly selected. When it is, the _Main class_ property should display: `net.runelite.cache.ModelDumper`. Next, add in the _Program arguments_. These are the same as writing command line arguments when running a program. The options for the ModelDumper program arguments are:

- `-cache <location-of-cache>`: Specify a location for the OSRS cache, if not provided the program will look for the cache in the default location under the current users home folder
- `-models <output_directory-for-files>`: Extract models to the specified directory, if a relative path is given the program will save files to the `runelite` folder (as shown by the _Working directory_ value in the configuration)
- `-convert`: Convert any extracted model files

The following is an example of the _Program arguments_ where no cache location is specified, and you want to extract and convert all models to the directory named `models-out`:

{% highlight plaintext %}
-models models-out -convert
{% endhighlight %}

You can also provide a hard-coded cache location. The following example is the same as above, but you specify the cache location on a Linux-based system:

{% highlight plaintext %}
-cache /home/ph01l/jagexcache/oldschool/LIVE/ -models models-out -convert
{% endhighlight %}

The following example is the same as above, but you specify the cache location on a Windows-based system:

{% highlight plaintext %}
-cache C:\Users\ph01l\jagexcache\oldschool\LIVE\ -models models-out -convert
{% endhighlight %}

Below is an example output from the ModelDumper tool when run. In this example, the cache location was not provided and was automatically determined. The options specified to extract and convert all models, and a total of 72,278 model files were successfully extracted and converted. This output information can be seen in the _Run_ output windows at the bottom of the IntelliJ IDE.

{% highlight plaintext %}
>>> Starting ModelDumper...
  > Parsing command line arguments...
>>> Locating cache...
  > Cache location not provided... Attempting automatic location...
  > /home/ph01l/jagexcache/oldschool/LIVE/
>>> Checking cache directory contents...
  > SUCCESS: Cache found and validated...
>>> Loading cache...
>>> Dumping models to models-out
>>> Starting model dumper...
  > Dumping models...
>>> Dumped models:72278
  > Converting extracted models...
>>> Model dumper finished!
{% endhighlight %}

Please note that you may get an error when running the ModelDumper tool (as seen below). This error does not seem to affect the program.

{% highlight plaintext %}
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
{% endhighlight %}

### Output from the ModelDumper Tool

The ModelDumper tool will by default output every model file from the OSRS cache, there is currently no option to only process one model or a selection of models. The output files are numbered using the model ID number, as this is a unique number for every model. The ModelDumper tool will output a number of different file formats. The list below documents these formats.

- `.model`: The binary model file extracted from the OSRS cache sometimes referred to, and stored as, `.dat` files by other tools
- `.obj`: A converted model file saved in the `.obj` extension and file format that contains the geometric data of the model
- `.mtl`: The texture model file for the converted `.obj` file that contains the material (surface shading) for the model

Below is a visual example of the output files. You can see for each model ID number there are the 3 files as described above.

{% include figure.html path="blog/extracting-models/modeldumper-program-output.png" alt="Example output from the ModelDumper program in the Thunar file manager" %}

## Deciphering Model ID Numbers

So far we have discussed how to extract and convert models from the OSRS cache. Nice! However, we ended up with over 36,000 models which are only identified by the model ID number. When researching more about model ID numbers I came up short of finding a decent up-to-date list that mapped model number to some type of name. There were a bunch of old lists floating around the Internet, but most only included just items... or just npcs. I wanted a list with all items, npcs, and objects - as we have models for all of these categories. So what to do?! I thought I would take matters into my own hands and create an up-to-date list and also provide it via a web application. This section discusses this process, however, if you only want to use the list... here is a link to the [Model ID Search tool]({{ site.url }}/tools/model-search/).

### Item, Npc and Object Definitions

All model ID numbers are stored in the ObjectDefinition, ItemDefinition, and NpcDefinition data files that provide metadata about objects, items, and NPCs. There are many OSRS cache tools that can extract this information and the structure is very well known. Basically, you can run a tool against the OSRS cache and extract the metadata, usually in JSON format, about all objects, items, and NPCs. This section documents the structure of different definitions and documents the key name that links to the model of a specific object, item or NPC.

The listing below displays a snippet of an ObjectDefinition for the _Fire of Domination_ model. Note how the models are provided as a list under the `objectModels` key. Additionally, you can view the entire NpcDefinition for this Object in the [33318.json]({{ site.url }}/assets/img/blog/extracting-models/33318.json) file.

{% highlight json %}
{
  "id": 33318,
  "name": "Fire of Domination",
  "objectModels": [
    35937,
    35935,
    35938
  ]
}
{% endhighlight %}

The listing below displays a snippet of a NpcDefinition for the _Greater abyssal demon_ model. Note how the models are provided as a list under the `models` key. Additionally, you can view the entire NpcDefinition for this NPC in the [7410.json]({{ site.url }}/assets/img/blog/extracting-models/7410.json) file.

{% highlight json %}
{
  "id": 7410,
  "name": "Greater abyssal demon",
  "models": [
    32921
  ]
}
{% endhighlight %}

The listing below displays a snippet of an ItemDefinition for the _Abyssal dagger_ model. Note how the models are provided as a single entry under the `inventoryModel` key. Additionally, you can view the entire ItemDefinition for this NPC in the [13265.json]({{ site.url }}/assets/img/blog/extracting-models/13265.json) file.

{% highlight json %}
{
  "id": 13265,
  "name": "Abyssal dagger",
  "inventoryModel": 29598
}
{% endhighlight %}

### Extracting Model IDs using RuneLite

The RuneLite client has a great cache tool that I have written about before. Although there are many other tools that claim to dump definitions for items, npcs, and objects - the RuneLite Cache tool has the built-in functionality to dump definitions from the OSRS cache without modification. Worth a mention is the OpenRS tool which also has the ability to dump type definitions. See my [OpenRS Tutorial - Compiling and Using the OpenRS Cache Tools]({% post_url 2018-11-23-openrs-tutorial %}) if you want more information - specifically the subsection in the post called _Extracting Definition Information_. 

So how can you dump definitions for objects, npcs, and items? I wrote a post a while ago called [Parsing the OSRS Cache using RuneLite]({% post_url 2018-07-26-osrs-cache-research-extract-cache-definitions %}) which covers the general process. But that was using the NetBeans IDE. You can do pretty much the same thing in IntelliJ, and the key part is adding the _Program arguments_.

{% highlight plaintext %}
-cache /home/ph01l/jagexcache/oldschool/LIVE/ -items /home/ph01l/Desktop/items/
{% endhighlight %}

After extracting all the ObjectDefinition, ItemDefinition and NpcDefinition data files for every single in-game object, item and NPC I wanted to automate the parsing of all files to get a sleek list of all model ID numbers and an associated name. I whipped up a quick Python script to do this, and output a complete JSON file with all model numbers. The [Python script is available on my osrsbox-db GitHub repository](https://github.com/osrsbox/osrsbox-db/tree/master/extraction_tools_cache). I also added the resultant JSON file to my publicly available [osrsbox-db](https://github.com/osrsbox/osrsbox-db/tree/master/docs), specifically, the `models_summary.json` file. 

With all this being said, the best and easiest method to lookup object, npc or item model numbers is to use my [Model ID Search tool]({{ site.url }}/tools/model-search/).

## Using Converted .obj Models in Blender

So far we have investigated how to extract and convert OSRS models. Then we investigated how to identify models by the model ID number. Now we will actually put this data together and open a 3D model in the Blender program. However, you could use any other program that supports the `.obj` file format. The model I am using is for the **TzTok-Jad** NPC, with the model ID number of `9319`. Remember, you can find the model ID number using my web application called [Model ID Search tool]({{ site.url }}/tools/model-search/). You can search object, npc or item ID numbers or simply used the in-game name. 

Open Blender, then right-click the cube that is in the scene by default. We want to delete it because it gets in the way. You can delete it by pressing the _Delete_ key after selecting it. See the image below for a visual example.

{% include figure.html path="blog/extracting-models/blender-1-delete-cube.png" alt="" %}

Now we want to import our `.obj` file. Specifically, we are going to import the **TzTok-Jad** model, where the file name is `9319.obj`. To accomplish this, use the _File_ menu to _Import_ our model data file. Select the _Wavefrount (.obj)_ option, then browse for the output folder containing your extracted and converted models. Then select the `9319.obj` file. You do not need to select the `.mtl` file, this is loaded by default if it is in the same directory (it should be by default). Below is a visual example of the process.

{% include figure.html path="blog/extracting-models/blender-2-open-obj-file.png" alt="" %}

Finally, we have a model displayed in Blender. Behold! Below is a Jad that has been successfully imported. 

{% include figure.html path="blog/extracting-models/blender-3-jad.png" alt="" %}

To edit the model, press the `Tab` key. You will now see the vertices of the model and be able to edit or manipulate it.

{% include figure.html path="blog/extracting-models/blender-4-jad-vertices.png" alt="" %}

You can also export the model file in the following formats:

- Collada with the `.dae` file extension
- 3D Studio with the `.3ds` file extension
- FBX with the `.fbx` file extension
- X3D Extensible 3D with the `.x3d` file extension
- Stl with the `.stl` file extension

The Stl file format is very popular with 3D printing. However, this will be a topic for a future post!

## Conclusion

Writing this post included a lengthy research endeavor, authoring a tool to extract and convert OSRS models and finally writing a web application (tool) to determine OSRS model ID numbers! It took me a lot of time and effort, and I really hope that this documentation and the tools created are of use to someone! I understand that this documentation may be too technical for some readers, and if you are interested in a precompiled ModelDumper tools with a _simpler_ set of instructions, please let me know in the comments below.

If you have any feedback or questions please leave a comment below. I always get super excited if someone comments, so please feel free to. Also, it would be great if you could let me know if you encounter any issues, or find any bugs in any of the tools. Until next time, happy scaping everyone!
