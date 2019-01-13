---
layout: post
title: "OSRSBox | Blog | Extracting and Converting OSRS Models (Easy Method)"
name: "Extracting and Converting OSRS Models (Easy Method)"
desc: "The easy method to extract and convert OSRS models"
tags:
- 3D Models
- Cache
- RuneLite
- OpenRS
add_to_popular_list: true
thumbnail: jad3d.png
---

A few days ago I wrote a post about [Extracting and Converting OSRS Models]({% post_url 2019-01-05-extracting-and-converting-osrs-models %}). The post went into detail including the background research, overview of a new tool I hacked together called _ModelDumper_ using RuneLite's Cache project, how to compile and run the tool, and how to map model ID numbers to items, NPCs and objects from the game. 

Even in the few days since I wrote the post I have received a few emails and comments on the post asking for the compiled version of the _ModelDumper_ tool. This post provides a link to the compiled version of the tool, as well as a summary of how to use it. The instructions provided are targeted for the Microsoft Windows 10 operating system, but the program is multiplatform and instructions should be adaptable for other operating systems.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Quick Start

If you are comfortable with running JAR (`.jar`) files, have previous command line experience, have a copy of the OSRS cache, and have Java (JRE) installed... these quick instructions will probably be all you need:

- Download [ModelDumper.zip]({{ site.url }}/assets/other/ModelDumper.zip)
- Optional - Check hash value matches the following SHA-256 value: 

{% highlight plaintext %}
597B44CBA1272276E6EA30302A35EE7272C5E728B90B65D44734A1690E2FBF4D
{% endhighlight %}

- Extract contents of the `ModelDumper.zip` archive to get the `ModelDumper.jar` and `LICENSE` files
- Run the _ModelDumper_ tool to extract and convert all models. The `-models` argument needs to be followed by the name of the output directory to use. If a relative path is given, it will extract models into the current working directory. The `-convert` option specifies to convert models to `.obj` files, if the `-convert` argument is not given the model will be extracted but not converted. Example below:

{% highlight plaintext %}
java.exe -jar .\ModelDumper.jar -models models-out -convert
{% endhighlight %}

- If your OSRS cache is not in your current users home folder, you may need to specify the cache location on the command line using the `-cache` option, followed by the file system location. Example below:

{% highlight plaintext %}
java.exe -jar .\ModelDumper.jar -cache C:\Users\PH01L\jagexcache\oldschool\LIVE\ -models models-out -convert
{% endhighlight %}

NOTE: The dot slash (`.\`) preceeding files names in the above examples is a PowerShell quirk, indicating a file in the current directory. This is not needed if you are using Windows Command Pompt.

## Downloading the ModelDumper Tool

As documented in my previous post, the _ModelDumper_ source code can be found in my forked version of RuneLite, in a branch named [model-dumper](https://github.com/osrsbox/runelite/tree/model-dumper). The program is the addition of a single file into the Cache project. The file, named [`ModelDumper.java`, is available in my branch on GitHub](https://github.com/osrsbox/runelite/blob/model-dumper/cache/src/main/java/net/runelite/cache/ModelDumper.java) if you would like to review the source code.

Anyway, the point of this post is to provide the _easy method_ to using the tool. I have provided a compiled version of the _ModelDumper_ tool (in a `.jar` file). This makes the program easy to run. I have bundled the tool in a ZIP (`.zip`) archive, which is available for download in the following location:

- [https://www.osrsbox.com/assets/other/ModelDumper.zip]({{ site.url }}/assets/other/ModelDumper.zip)

Inside the ZIP archive are the following two files:

1. `ModelDumper.jar`: The _ModelDumper_ tool in an executable JAR (`.jar`) file
1. `LICENSE`: The RuneLite BSD 2-Clause License

## Checking the ModelDumper Tool Integrity

Checking the integrity of downloaded files is important to ensure you have downloaded a valid file and that it is the same as the distributor published. If you are unsure of what the purpose of [File verification](https://en.wikipedia.org/wiki/File_verification) is, read the linked Wikipedia article. I have provided the SHA256 hash value for the download ZIP archive, as well as the archive contants below:

{% highlight plaintext %}
ModelDumper.zip: 597B44CBA1272276E6EA30302A35EE7272C5E728B90B65D44734A1690E2FBF4D
ModelDumper.jar: 6FD485A3AB9E4E82D138A34706604C95CC1CB13EEAB4FFC0C196A63C135F59D2
LICENSE: DD35829A586785621651857262168BD91374A84669592D2DB28520648B55A519
{% endhighlight %}

If you are on Microsoft Windows you can use the `Get-FileHash` module in PowerShell to calculate hash values for files, and on Linux you can use `sha256sum`. There are also many third-party tools available to calculate file hashes. I recommend using PowerShell as it is built-into modern Windows operating systems and easy to use. To open PowerShell in the same folder, navigate to where you downloaded the `ModelDumper.zip` file in Windows Explorer (most likely your _Downloads_ folder). Right-click in any white-space and select _Open PowerShell window here_. A visual example is provided below.

{% include figure.html path="blog/extracting-models/open-windows-powershell-hashing.png" alt="Open Windows PowerShell for file hashing" %}

You can then run the following command. This command calculates the SHA-256 hash value for the `ModelDumper.zip` file.

{% highlight plaintext %}
Get-FileHash -Algorithm SHA256 .\ModelDumper.zip | Format-List
{% endhighlight %}

An example of the expected output is listed below.

{% highlight plaintext %}
PS C:\Users\PH01L\Downloads> Get-FileHash -Algorithm SHA256 .\ModelDumper.zip | Format-List

Algorithm : SHA256
Hash      : 597B44CBA1272276E6EA30302A35EE7272C5E728B90B65D44734A1690E2FBF4D
Path      : C:\Users\PH01L\Downloads\ModelDumper.zip
{% endhighlight %}

Make sure you check that the calculated hash value is the same as the hash value provided at the start of this section. You can also calculate the hash values on the files inside the archive if you want to be thorough (after extracting the archive).

## Meeting the ModelDumper Dependencies

The _ModelDumper_ tool has two dependencies:

1. Java (JRE) installed
1. Copy of the OSRS cache

The tool requires Java to run - specifically the Java Runtime Environment, or JRE for short. If you play OSRS you most likely have this installed already - as you cannot play OSRS without the JRE installed. Given that, I am not going to go into depth on the install. One thing - if you do not have Java in your environment variable path, you will need to run the `java.exe` executable from the folder where it is installed. To check if you have the Java executable in your path, just type in `java.exe` into the PowerShell console, or Command Prompt, and press enter. If you have Java in your path, the options menu for the `java.exe` program will be displayed.

The tool also requires a copy of the OSRS cache. This makes sense, as the models are located in the cache! If you play OSRS you most likely have the cache available in the home folder of your normal user account. The OSRS cache is located in the following file system path (on a Windows 10 system):

{% highlight plaintext %}
C:\Users\<username>\jagexcache\oldschool\LIVE
{% endhighlight %}

You can check this directory in Windows Explorer. It should have approximately 20 files... most of them starting with the file name: `main_file_cache`.

## Running the ModelDumper Tool

Once you have downloaded and `ModelDumper.zip` archive, and extracted the actual `ModelDumper.jar` program, you can run the ModelDumper tool. Start by opening a PowerShell terminal or Windows Command Prompt in the same directory are the ModelDumper executable.

### Command Line Arguments

You must supply two command line arguments to make the program run correctly:

1. A command argument to tell the tool what to do (e.g., dump the models, or dump the models and convert)
1. The location of the OSRS cache if it is not in the default location (the home directory of the currently logged in user)

The options for the ModelDumper program arguments are:

- `-cache <location-of-cache>`: Specify a location for the OSRS cache, if not provided the program will look for the cache in the default location under the current users home folder
- `-models <output-directory-for-files>`: Extract models to the specified directory, if a relative path is given the program will save files to the present working directory
- `-convert`: Convert any extracted model files, without this option no `.obj` or `.mtl` files will be created

The following is an example of the _Program arguments_ where no cache location is specified, and you want to extract and convert all models to the directory named `models-out`:

{% highlight plaintext %}
java.exe -jar .\ModelDumper.jar -models models-out -convert
{% endhighlight %}

You can also provide a hard-coded cache location. The following example is the same as above, but you specify the cache location on a Windows-based system:

{% highlight plaintext %}
java.exe -jar .\ModelDumper.jar -cache C:\Users\PH01L\jagexcache\oldschool\LIVE\ -models models-out -convert
{% endhighlight %}

### Example of Running the Model Dumper Tool

Below is an example output from the ModelDumper tool when run. In this example, the cache location was not provided and was automatically determined. The options specified to extract and convert all models, and a total of 72,278 model files were successfully extracted and converted. This output information can be seen in the _Run_ output windows at the bottom of the IntelliJ IDE.

{% highlight plaintext %}
>>> Starting ModelDumper...
  > Parsing command line arguments...
>>> Locating cache...
  > Cache location not provided...
  > Attempting automatic location...
  > Checking for cache in following location:
  > C:\Users\PH01L\jagexcache\oldschool\LIVE\
>>> Verifying cache directory contents...
  > SUCCESS: Cache found and validated...
>>> Loading cache...
>>> Dumping models to models-out
>>> Starting model dumper...
  > Dumping models...
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

Below is a visual example of the output files in Windows Explorer. You can see for each model ID number there are the 3 files as described above.

{% include figure.html path="blog/extracting-models/modeldumper-program-output-windows.png" alt="Example output from the ModelDumper program in the Windows Explorer file manager" %}

## Match ID Numbers to Game Models

So far we have discussed how to extract and convert models from the OSRS cache. Nice! However, this results in over 36,000 models which are only identified by the model ID number. If you want to lookup an item, NPC or object using the name used in-game - try my [Model ID Search tool]({{ site.url }}/tools/model-search/).

## Conclusion

If you are interested in other aspects of creating the _ModelDumper_ tool and the process behind creating the tool and matching model ID number to actual items, NPCs and object, feel free to have a read of the original post called [Extracting and Converting OSRS Models]({% post_url 2019-01-05-extracting-and-converting-osrs-models %}). 

If you have any feedback or questions please leave a comment below. Also, it would be great if you could let me know if you encounter any issues, or find any bugs in the tool or instructions. Until next time, happy scaping everyone!
