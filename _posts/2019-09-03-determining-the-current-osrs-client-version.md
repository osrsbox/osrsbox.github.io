---
layout: post
title: "OSRSBox | Blog | Determining the Current OSRS Client Version"
name: "Determining the Current OSRS Client Version"
desc: "A technique to determine the current OSRS client version without deobfuscating"
tags:
- Client
- Python
add_to_popular_list: false
thumbnail: osrs-coding.png
---

A while ago I wrote an article that outlined how to [Determine OSRS Cache Version using RuneLite]( {% post_url 2018-08-03-osrs-cache-research-determine-client-version %}). The purpose of the article was that I wanted to know: _Which version of the client/cache was I working on?_ Unfortunately, the technique I used is no longer relevant as it used the now closed source RuneLite deobfuscator. You could probably determine the official client version using another deobfuscator, but I found a different, simpler technique!

This post outlines a simple method to determine the current OSRS client version and provides the Python code that implements the solution. I wrote a simple script to connect to the OSRS game servers and query if the client version number I provided is correct. Although I provide code snippets and a full solution written in the Python programming language, the technique can be implemented in any programming language.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Background: Determining the OSRS Client Version

Until recently, I thought the only technique to determine the OSRS client version was to download the official client and extract the information using a deobfuscator. Like I mentioned, the RuneLite deobfuscator is no longer publicly available. However, there other deobfuscators available such as the [OSRS-Deobfuscator by zeruth](https://github.com/zeruth/OSRS-Deobfuscator) that is an open-source deobfuscator/refactor tool for Old School RuneScape which is available on GitHub. 

When looking around GitHub the other day I found a nifty project on GitHub named [osrs-update-monitor authored by Rune Labs](https://github.com/Runetek/osrs-update-monitor). The project hosts the source code for a simple web application which provides a REST API that provides the current OSRS client revision. I was interested to see how they got the current client revision or version number. I was thinking that they would have manually determined the OSRS client version, then uploaded the data to a web app. But they did not! Instead, there was a very simple Python class that determined the client revision number by connecting to the OSRS game servers (like a game client would) and checking if a supplied revision number (an integer) was the current version! Crazy!

The important piece of source code that checks the current client version is located in the [`osrs_updates/proto.py` file](https://github.com/Runetek/osrs-update-monitor/blob/master/osrs_updates/proto.py) of the project. Interestingly, in the `_check_rev` function, there was a reference to the original author/creator of the program/method. The comment references a post from the RSHacking website to a [post by pyroryan about the handshake code to determine the client revision](https://rs-hacking.com/forum/index.php?/topic/177-2/?p=1399) - note that you need an account to view the linked post. The code was very similar to the Python class in the [osrs-update-monitor authored by Rune Labs](https://github.com/Runetek/osrs-update-monitor) project. This project did have a link to a live web application - but it seems the REST API is no longer working, and the project was last updated in 2017. Nevertheless, the code is still freely available under an MIT license. 

The method to check the current OSRS client revision is well described by the original author as a _hardshake_. You can send a specific request (an integer) to an OSRS game server and the server will respond if the client version you provided is current and up-to-date, or outdated. This means that you have to keep _guessing_ the version number until you get it right. But this is pretty easy, as the version numbers increment logically. For example, revision 141 is followed by revision 142, and so on. Pretty simple stuff.

This _handshake_ makes perfect sense to be implemented. If you have a player who runs your game client, you want the client to automatically check if there is a new version available. However, we can leverage this functionality to check the current client version.

## Simple Python Example to Determine OSRS Client Version

In the previous section, we discussed the basic idea behind the _handshake_ technique to determine the current OSRS client version. In this section we will discuss the technique with accompanying source code, written in Python, to provide a technical example of how the process works.

To start, you need to specify a host and a port for the game server. In the example below I am using the `oldschool78.runescape.com` host - but you could use any other available game server (world). The game server port must be set to `43594` - this method must use that port, and other ports are not valid. Below is a code snippet of setting these variables in a Python script.

{% highlight python %}
HOST = 'oldschool78.runescape.com'
PORT = 43594
{% endhighlight %}

As I previously eluded to, this method requires that you _guess_ the client revision number. Therefore, we must specify a revision number (which is an integer) to start _guessing_ from. In the example below, I have started guessing from `174`. From here we can start a loop of numbers, starting from the `initial_revision`. In the example below I specify a `range()` which starts at `174` and continues trying to guess until `174 + 50`, or `224`.

{% highlight python %}
# Set the first client version number to validate
initial_revision = 174
# Loop revision numbers starting from initial_revision
for revision_number in range(initial_revision, initial_revision + 50):
    print("Checking revision: %d" % revision_number)
{% endhighlight %}

The next block of code is indented in the `range()` loop specified above. The code is a little complex if you have not used the `socket` or `struct` libraries in Python, but the general logic of the program is pretty simple. Start by connecting to the game server using the `closing` function. Take the provided `revision_number` and pack it using the specified format: `>bi` which means pack the data into a binary representation using big-endian integer type. The `sock.send` does like it reads - send the packed data to the server. The `response` is received from the server and is `unpack`ed from the binary format to an integer.

{% highlight python %}
# Open connection to server
with closing(create_connection((HOST, PORT))) as sock:
# Pack the revision number
packed_revision = pack('>bi', 15, revision_number)
# Send to the game server
sock.send(packed_revision)
# Unpack the server response to an integer
response = unpack('b', sock.recv(1))[0]
{% endhighlight %}

Like I just mentioned, the `unpack`ed `response` is an integer. There are two possible responses from the game server. The value `6` means the client revision number is not current. The value `0` means the client revision number is current! So, we can write a simple `if` statement to check if the `response` value equals `0`, and if it does... It is the current client revision number!

{% highlight python %}
if response == 0:
    print("Found OSRS client revision: %d" % revision_number)
    quit()
{% endhighlight %}

## Full Python Script Examples

Sometimes it can be difficult to reconstruct an authors code snippets into a functioning script. So I have included the entire scripts here for use. The script below is a very simple implementation without any modularity, but it gets the job done.

{% highlight python %}
from contextlib import closing
from socket import create_connection
from struct import pack, unpack

HOST = 'oldschool78.runescape.com'
PORT = 43594

if __name__ == '__main__':
    # Set the first client version number to validate
    initial_revision = 174
    # Loop revision numbers starting from initial_revision
    for revision_number in range(initial_revision, initial_revision + 50):
        print("Checking revision: %d" % revision_number)
        # Open connection to server
        with closing(create_connection((HOST, PORT))) as sock:
            # Pack the revision number
            packed_revision = pack('>bi', 15, revision_number)
            # Send to the game server
            sock.send(packed_revision)
            # Unpack the server response to an integer
            response = unpack('b', sock.recv(1))[0]
            # If the integer response is 0, the revision_number is correct
            if response == 0:
                print("Found OSRS client revision: %d" % revision_number)
                quit()
{% endhighlight %}

The script above is a little too simple for my liking, and it is hard to expand on easily. I have provided another script below which is slightly more modular.

{% highlight python %}
from contextlib import closing
from socket import create_connection
from struct import pack, unpack

HOST = 'oldschool78.runescape.com'
PORT = 43594
RESPONSE_OUTDATED = 6
RESPONSE_CURRENT = 0

def check_response_code(response_code):
    if response_code == RESPONSE_CURRENT:
        return True
    elif response_code == RESPONSE_OUTDATED:
        return False
    else:
        # Response is not 0, or 6
        return False

def decode_response(response):
    return unpack('b', response)[0]

def encode_request(revision):
    return pack('>bi', 15, revision)

def check_revision_code(revision):
    with closing(create_connection((HOST, PORT))) as sock:
    sock.send(encode_request(revision))
    response = decode_response(sock.recv(1))
    return check_response_code(response)

def run(start, limit=50):
    for revision_number in range(start, start + limit):
        print("Checking revision: %d" % revision_number)
        if check_revision_code(revision_number):
            print("Found OSRS client revision: %d" % revision_number)
            return
        else:
            print('Response code 6 for: %d' % revision_number)

if __name__ == '__main__':
    # Set the first client version number to validate
    initial_revision = 174
    run(start=initial_revision)
{% endhighlight %}

## Side Note: Determining the OSRS Client using RuneLite

I had this post half-written for a couple of months. In that time, I noticed that the RuneLite client now displays the current OSRS client version number in the _Info_ panel - as displayed in the image below. This method is even simpler, especially since many OSRS players use the RuneLite client.

{% include figure.html path="blog/osrs-client-version/runelite-osrs-client-version.png" alt="RuneLite Info Panel showing the current OSRS client version number." %}

## Conclusion

This post is a short and simple method to check the current OSRS client version. This _handshake_ method is pretty straightforward and simple to implement. I find it a lot easier than downloading the game pack, setting up a deobfuscator and manually checking the client revision number. If anyone else knows of any other simple methods to determine the current client version number, please feel free to post a comment... I always appreciate feedback and find this sort of thing very interesting. Of course, many thanks to the developers (pyroryan and Rune Labs) who documented this technique and provided source code examples. I hope that this is of use to someone also interested in determining the current OSRS client revision, or version. Until next time - happy scaping everyone!
