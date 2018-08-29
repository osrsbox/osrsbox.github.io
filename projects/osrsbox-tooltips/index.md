---
layout: project
title: OSRSBOX | An Old School RuneScape (OSRS) Tooltip Library
project_name: OSRSBox Tooltips
project_desc: An Old School RuneScape (OSRS) Tooltip Library to display tooltips for OSRS items on mouse hover
include_tooltips: true
---

This web page is the documentation for the [osrsbox-tooltip project](https://github.com/osrsbox/osrsbox-tooltips). This project provides JavaScript and CSS files for creating Old School RuneScape (OSRS) tooltips to enhance user experience on fan websites. The repository hosts the files necessary to implement OSRS tooltips on web pages. For example, check out the lovely <span class="osrstooltip" id='21021' title='Please wait ...'>[Ancestral robe top]</span> and their stats! Maybe you are rich and melee focussed, so the <span class="osrstooltip" id='13239' title='Please wait ...'>[Primordial boots]</span> would be a better choice! With those boots and no cash stack left, you might be forced to eat a <span class="osrstooltip" id='325' title='Please wait ...'>[Sardine]</span>.

The project style and idea is based on World of Warcraft (WOW) tooltips - primarily the [WOWhead tooltips](http://www.wowhead.com/tooltips) that are used on the WOWhead website and other WOW fan sites. You can see a more thorough working demo of WOWhead tootips [here](http://wow.zamimg.com/widgets/power/demo.html).

## Quick Start

Inlcude JavaScript and CSS library files in your web page header:

{% highlight html %}
<head>
  <link rel="stylesheet" type="text/css" href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
  <script type="text/javascript" src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
</head>
{% endhighlight %}

Include a span element in your the web page body. The example below will create a tooltip for the <span class="osrstooltip" id='11806' title='Please wait ...'>[Saradomin godsword]</span> on your page.

{% highlight html %}
<span class="osrstooltip" id='11806' title='Please wait ...'>[Saradomin godsword]</span>
{% endhighlight %}

The only modification you need to make is: 1) The item text name; and 2) The OSRS item ID number. Both must be manually enetered. To help, you can use my [OSRS Item ID and Item Name Search Tool]({{ site.url }}/tools/item-search). You can also manually look at the [summary.json](https://github.com/osrsbox/osrsbox-db/blob/master/docs/summary.json) file provided on the osrsbox-db project site. If you want to automate your own search, the `summary.json` file is also publically available using the osrsbox-db API using a GET request on the [summary.json](https://www.osrsbox.com/osrsbox-db/summary.json) file.

## Detailed Usage Guide with Examples

The osrsbox-tooltip library provides support for tooltips on your web page. OSRS tooltips are pretty simple to use. The process requires two main additions to your web page: 1) Inclusion of the JavaScript and CSS code in your web page header; and 2) Inclusion of HTML elements in your web page body to display some text or an image which is hovered over to display the actual tooltip.

### 1) Include JavaScript and CSS style sheet in the web page header

The JavaScript code (osrsbox-tooltips.js) needs to be included the HTML source code header for the web page when you want to use OSRS tooltips.

{% highlight html %}
<script type="text/javascript" src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
{% endhighlight %}

The CSS style code (osrsbox-tooltips.css) also needs to be included the HTML source code header for the web page when you want to use OSRS tooltips.

{% highlight html %}
<link rel="stylesheet" type="text/css" href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
{% endhighlight %}

The following code provides a full working example of a header with links to the the JavaScript and CSS files hosted on osrsbox.com:

{% highlight html %}
<head>
  <link rel="stylesheet" type="text/css" href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
  <script type="text/javascript" src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
</head>
{% endhighlight %}

### 2) Include HTML element to show tooltip

Once the OSRS tooltip library has been included in the header we can create HTML elements which have tooltips when a user hovers their mouse over the element. The OSRS tooltip library is included using HTML span elements, so can be included anywhere. Common techniques include displaying text - usually item names. You could also have a thumbnail image with a tooltip. Some code below indicates the use of each method.

Text example:

{% highlight html %}
<span class="osrstooltip" id='2615' title='Please wait ...'>[Rune platebody (g)]</span>
{% endhighlight %}

Image example:

{% highlight html %}
<span class="osrstooltip" id='2617' title='Please wait ...'><img class="" height="32" width="32" src="https://www.osrsbox.com/osrsbox-db/items-icons/2617.png"></span>
{% endhighlight %}

### Full working example

Sometimes code snippets can be difficult to understand or implement. Therefore, the following HTML code is a full working example of how to use OSRS tooltips on a web page. This is barebones example with minimal page formatting and style. 

Code includes a hoverable text in the form of an item name, as well as a hoverable thumbnail image example. 

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>OSRSBOX | Simple HTML Example using OSRS Tooltips by PH01L</title>
  <!-- External links to osrsbox-tooltip library (JS and CSS) -->
  <link href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css" rel="stylesheet" type="text/css">
  <script src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js" type="text/javascript">
  </script>
</head>
<body>
  <span class="osrstooltip" id='2615' title='Please wait ...'>[Rune platebody (g)]</span>
  <span class="osrstooltip" id='2617' title='Please wait ...'><img class="" height="32" width="32" src="https://www.osrsbox.com/osrsbox-db/items-icons/2617.png"></span>
</body>
</html>
{% endhighlight %}

## Project Feedback and Contribution

This is an independent project (thus far). However, I would thoroughly appreciate any feedback regarding the project, especially problems with the inaccuracies of the JSON files and missing items. The best method is to post a Github issue with a feature request, bug or other problem. 
