---
layout: post
title: "OSRSBox | Blog | Dumping Old School RuneScape Chat Using RuneLite"
name: "Dumping Old School RuneScape Chat Using RuneLite"
desc: "A simple RuneLite plugin to dump in-game chat to JSON"
tags:
- Programming
- RuneLite
- Data
add_to_popular_list: false
thumbnail: runelite-coding.png
---

If you have read blog posts I have previously written... you will know that I am a big fan of OSRS, programming, and data! This post combines all these. I wanted to do some data analysis of in-game chat - stay tuned for the next post which crunches some chat data looking at spam filtering and sentiment analysis!

Before that can be done, the first thing is to write a program that can grab chat data from the game. This is pretty essential... and I am not going to manually copy and paste every chat message that appears on world 1 at the Grand Exchange. Instead, I needed some type of program to dump the chat messages to a specific structure so that it is easy to process and analyze. The solution - like usual is a simple RuneLite plugin.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Dumping Chat? What? Why?

We probably all know the [Chat Interface](https://oldschool.runescape.wiki/w/Chat_Interface) in OSRS all too well. Lots of stuff ends up there: spam messages, expensive monster drops, game events, etc. The visual example provided below - just in case you don't know what this thing is:

{% include figure.html path="blog/chat-analysis/chatbox.png" alt="The Old School RuneScape chatbox." %}

The information provided in the chat is pretty extensive. Especially when you include the additional functionality provided by a couple of sweet RuneLite plugins.

So why dump chat data? I can think of several reasons. Wiki devs might want to dump chat to see the examine messages to update the wiki - when you right-click examine an item, NPC, or object. You might want to keep a record of all the amazing messages you send to your friends?! Ok - on a serious note, I wanted to dump chat to perform some text analysis. I stumbled across an old post of the /r/2007scape subreddit called [Data Analysis: 4000 World 1 G.E. Messages](https://www.reddit.com/r/2007scape/comments/64v24j/data_analysis_4000_world_1_ge_messages_datasheet/). The user `Rprrr` dumped 4000 chat messages a did a simple content analysis. I wanted to do something similar.

## A Simple RuneLite Plugin to Dump Chat Messages

Since RuneLite has such extensive API functions and there are so many examples of different plugins - it makes writing something like a chat dumper plugin easy. This section goes into some discussion of writing the chat dumper. If you would just rather see the code, have a look at the [`ChatDumper` plugin](https://github.com/osrsbox/osrsbox-plugins/tree/master/plugins/chatdumper) on my GitHub repo.

Like I said, this plugin was based on a variety of other, similar chat plugins. Reviewing other code (which has got the tick from the RuneLite devs) makes writing this sort of thing super easy. The two plugins I mainly used were:

1. [`chathistory` plugin](https://github.com/runelite/runelite/tree/master/runelite-client/src/main/java/net/runelite/client/plugins/chathistory) which saves the chat history between sessions (logging in and out, or world-hopping)
1. [`chatfilter` plugin](https://github.com/runelite/runelite/tree/master/runelite-client/src/main/java/net/runelite/client/plugins/chatfilter) which provides the ability to filter messages in the chat interface - commonly used to filter spam

Looking at both of these plugins, they used the `ChatMessage` event - which provides an _event_ to listen to.

```
import net.runelite.api.events.ChatMessage;
```

The `ChatMessage` event is the key here. Whenever a chat message is received (displayed in the chatbox) an event is triggered by the client. We can just hook into this event and do something with the chat message. A simple example is provided below:

{% highlight java %}
    @Subscribe(priority = -2) // run after ChatMessageManager
    public void onChatMessage(ChatMessage chatMessage)
    {
        final MessageNode messageNode = chatMessage.getMessageNode();
        
        // Some other code that does something cool with chat messages
    }
{% endhighlight %}

For each chat message, the data is provided in a `MessageNode` object. Have a look at the [RuneLite API docs on the MessageNode](https://static.runelite.net/api/runelite-api/net/runelite/api/MessageNode.html), and you will see you can get stuff like:

- Message ID
- Message timestamp
- Message type
- Message value
- Message sender

From here, the rest of the plugin development is pretty easy - as RuneLite does all the heavy lifting already. I wrote a very simple class the store the data I was interested in for each chat message. Below is a little snippet of the setters for the class.

{% highlight java %}
    @Setter
    private String name = null;
    @Setter
    private String sender = null;
    @Setter
    private int timestamp = -1;
    @Setter
    private String type = null;
    @Setter
    private String value = null;
    @Setter
    private int world = -1;
{% endhighlight %}

Also, I added a simple function to convert the passed `MessageNode` object argument to something more JSON friendly. This involved converting objects (such as the Enum type object to a string).

{% highlight java %}
    public void populateChatMessageData(MessageNode messageNode, int world)
    {
        this.name = messageNode.getName();
        this.sender = messageNode.getSender();
        this.timestamp = messageNode.getTimestamp();
        this.type = messageNode.getType().name();
        this.value = messageNode.getValue();
        this.world = world;
    }
{% endhighlight %}

Each returned message is saved into a simple `ArrayList` called `messages`. As a side note, instead of rolling a custom class I could have used the `QueuedMessage` class, but it didn't have exact data I wanted - as I wanted to add the world the chat message was dumped from. If you are interested, have a look at the [`QueuedMessage` class](https://github.com/runelite/runelite/blob/master/runelite-client/src/main/java/net/runelite/client/chat/QueuedMessage.java).

The last thing to do is save the messages to a JSON file. I have messaged around with a couple of different JSON libraries for Java. The best is GSON - something I should have used from the start. 

{% highlight java %}
    Gson gson = new GsonBuilder().create();
    String json = gson.toJson(messages);

    try (FileWriter fw = new FileWriter(fileOut))
    {
        fw.write(json);
    }
    catch (IOException e)
    {
        e.printStackTrace();
    }
{% endhighlight %}

So, as a little summary... the plugin operation is super simple:

1. Use the `ChatMessage` event to get each chat message
1. For each message, convert to a specific class with the properties I wanted
1. Append the message object to an `ArrayList`
1. Export to a JSON file

To provide some context of what data you will get with this plugin, I have provided an example below.

{% highlight java %}
[
  {
    "name": "",
    "timestamp": 1595105840,
    "type": "WELCOME",
    "value": "Welcome to Old School RuneScape.",
    "world": 301
  },
  {
    "name": "",
    "timestamp": 1595105840,
    "type": "GAMEMESSAGE",
    "value": "There are a lot of people on this world. You might want to switch to a quieter one.<br>You can do so by using the world switcher in the logout menu.",
    "world": 301
  },
  {
    "name": "Player1",
    "timestamp": 1595105840,
    "type": "PUBLICCHAT",
    "value": "Be in | Frostbez | cc For Daily Bond Giveaways!",
    "world": 301
  }
{% endhighlight %}

Pretty sweet! Couple notes here. The `timestamp` property is an epoch - which is easy to convert in most programming languages. The `type` property is really useful, and indicates the type of message - the types are explained in the [`ChatMessageType` class](https://github.com/runelite/runelite/blob/master/runelite-api/src/main/java/net/runelite/api/ChatMessageType.java). You could filter specific messages in the plugin - and I added a specific config to demonstrate this. But I wanted all the chat, and can easily filter during analysis.

## Using the ChatDumper Plugin

As I briefly mentioned, the [`ChatDumper` plugin](https://github.com/osrsbox/osrsbox-plugins/tree/master/plugins/chatdumper) source code is on my GitHub repo. To use this, you need to have an environment set up to build RuneLite from the source. Once you have that, just copy the `chatdumper` folder to your RuneLite plugins folder, compile the project, and run. This sort of plugin is not exactly useful to many people, and not something that should even be in the [RuneLite Plugin Hub](https://runelite.net/plugin-hub/) - but might be useful to other data-geeks or devs.

## Conclusion

Given the crazy plugins that people in the OSRS community are producing - this is not groundbreaking stuff. I am writing stuff like this to document my developer journey, keen notes for myself, and (hopefully) help out other people who may not have as much programming experience or knowledge of the RuneLite client.

The whole purpose of this project was to get some chat data to perform some analysis. So far I have dumper about 10k chat messages, and will hopefully get some time to crunch some data soon! Until next time... Happy scaping everyone!
