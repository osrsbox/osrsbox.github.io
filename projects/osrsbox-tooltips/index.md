---
layout: project
title: OSRSBOX | An Old School RuneScape (OSRS) Tooltip Library
project_name: OSRSBox Tooltips
project_desc: An Old School RuneScape (OSRS) Tooltip Library to display tooltips for OSRS items on mouse hover
include_tooltips: true
---

This web page is the documentation for the [osrsbox-tooltip project](https://github.com/osrsbox/osrsbox-tooltips). This project provides JavaScript and CSS files for creating Old School RuneScape (OSRS) tooltips to enhance user experience on fan websites. The repository hosts the files necessary to implement OSRS tooltips on web pages. For example, check out the lovely <span class="osrstooltip" id='21021' title='Please wait ...'>[Ancestral robe top]</span> and their stats! Maybe you are rich and melee focussed, so the <span class="osrstooltip" id='13239' title='Please wait ...'>[Primordial boots]</span> would be a better choice! With those boots and no cash stack left, you might be forced to eat a <span class="osrstooltip" id='325' title='Please wait ...'>[Sardine]</span>.

The project style and idea is based on World of Warcraft (WOW) tooltips - primarily the [WOWhead tooltips](http://www.wowhead.com/tooltips) that are used on the WOWhead website and other WOW fan sites. You can see a more thorough working demo of WOWhead tooltips [here](http://wow.zamimg.com/widgets/power/demo.html).

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

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

The only modification you need to make is 1) The item text name; and 2) The OSRS item ID number. Both must be manually entered. To help, you can use my [OSRS Item ID and Item Name Search Tool]({{ site.url }}/tools/item-search). You can also manually look at the [summary.json](https://github.com/osrsbox/osrsbox-db/blob/master/docs/items-summary.json) file provided on the osrsbox-db project site. If you want to automate your own search, the `summary.json` file is also publically available using the osrsbox-db API using a GET request on the [summary.json](https://www.osrsbox.com/osrsbox-db/summary.json) file.

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

The following code provides a full working example of a header with links to the JavaScript and CSS files hosted on osrsbox.com:

{% highlight html %}
<head>
  <link rel="stylesheet" type="text/css" href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
  <script type="text/javascript" src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
</head>
{% endhighlight %}

In addition to supplying the base JavaScript and CSS files for the OSRSBox tooltips, there is also the option available to specify Subresource Integrity (SRI) values to ensure the files downloaded from OSRSBox have not been tampered with. For more information on this topic, please read the [Subresource Integrity article by the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). SRI values are provided for each released version of the tooltips library. All SRI values are provided in the [README.md file on the osrsbox-tooltips GitHub repository](https://github.com/osrsbox/osrsbox-tooltips). If you want to use SRI, the following code snippet is an example when using version 1.0.3 of the tooltip library.

{% highlight html %}
<head>
  <link rel="stylesheet" type="text/css" href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips_1.0.3.min.css" integrity="sha384-9mY6KMmSmxJ+swWAGPYvmY+El1r2PucSe81+ZMMb1yeu2G7d9xmnB/B5mSaz4r4s" crossorigin="anonymous">
  <script type="text/javascript" src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips_1.0.3.min.js" integrity="sha384-pgVu9tb6SJRGSVFeXBOlMSsLB88OhsqYscMOL4GvMxezQhjo04Uz/rcOdT4hBApx" crossorigin="anonymous"></script>
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

### 3) Tooltip Formats

The previous tooltip examples only used the default _full_ tooltips formats, where a tooltip with detailed metadata and item stats (if the item is equipable) is included. However, you can tailor your tooltip format based on the requirements of your usage. The image below displays the four (4) different tooltip types, or formats, that are available.

{% include figure.html path="projects/osrsbox-tooltips/tooltip-types.png" alt="Visual summary of the four types of OSRSBox tooltips." %}

As mentioned, by default the _full_ tooltip format will be used, and no additional configuration is required to use this format. However, you can specify a different format using the `data-type` HTML element. For example, if you just want to show the bonuses of the <span class="osrstooltip" id='12006' data-type="bonuses" title='Please wait ...'>[Abyssal tentacle]</span> then you can specify the `data-type` as `"bonuses"`. Similarly, if you just want the tooltip to display the item icon and the item name for the <span class="osrstooltip" id='12004' data-type="short" title='Please wait ...'>[Kraken tentacle]</span>, you can specify the `data-type` as `"short"`. For further examples, see below for an example of each of the four different tooltip formats.

{% highlight html %}
<span class="osrstooltip" id='2615' data-type="full" title='Please wait ...'>[Rune platebody (g)]</span>
<span class="osrstooltip" id='2617' data-type="half" title='Please wait ...'>[Rune platelegs (g)]</span>
<span class="osrstooltip" id='2619' data-type="short" title='Please wait ...'>[Rune full helm (g)]</span>
<span class="osrstooltip" id='2621' data-type="bonuses" title='Please wait ...'>[Rune kiteshield (g)]</span>
{% endhighlight %}

### Full working example

Sometimes code snippets can be difficult to understand or implement. Therefore, the following HTML code is a full working example of how to use OSRS tooltips on a web page. This is a barebones example with minimal page formatting and style. 

The website code includes a hoverable text tooltip in the form of an item name, as well as a hoverable thumbnail image example. 

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>OSRSBOX | Simple HTML Example using OSRS Tooltips by PH01L</title>
  <!-- External links to osrsbox-tooltip library (JS and CSS) -->
  <link rel="stylesheet" type="text/css" href="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
  <script type="text/javascript" src="https://www.osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
</head>
<body>
  <span class="osrstooltip" id='2615' title='Please wait ...'>[Rune platebody (g)]</span>
  <span class="osrstooltip" id='2617' title='Please wait ...'><img class="" height="32" width="32" src="https://www.osrsbox.com/osrsbox-db/items-icons/2617.png"></span>
</body>
</html>
{% endhighlight %}

## Project Feedback and Contribution

I would thoroughly appreciate any feedback regarding the tooltips project, especially problems with the inaccuracies of the data displayed in the tooltips, as well as missing items. So if a tooltip for a specific item is not working correctly, please let me know. The same goes for any discovered bugs, or if you have a specific feature request. The best method is to [open a new Github issue](https://github.com/osrsbox/osrsbox-tooltips/issues) in the project repository. In addition, please feel free to submit a pull request if you have code that you wish to contribute - I would thoroughly appreciate the helping hand. For any code contributions, the best method is to [open a new GitHub pull request](https://github.com/osrsbox/osrsbox-tooltips/pulls) in the project repository.

This project has started to be used by other developers of Old School RuneScape fan websites - which is great! Also, a special thanks to the following GitHub users who have already contributed to the project:

- @jburleigh1
- @Bartvhelvert
- @HexRealm