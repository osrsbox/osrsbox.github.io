---
layout: default
title: OSRSBox | osrsbox-tooltips | An Old School Runescape (OSRS) Tooltip Library
---

# osrsbox-tooltips
## An Old School Runescape (OSRS) Tooltip Library

This web page is the documentation for the [osrsbox-tooltip project](https://github.com/osrsbox/osrsbox-tooltips). This project provides JavaScript and CSS files for creating Old School RuneScape (OSRS) tooltips to enhance user experience on fan websites. The repository hosts the files necessary to implement OSRS tooltips on web pages. For example, check out the lovely <span class="tooltip osrs-tooltip" id='21021' title='Please wait ...'>[Ancestral robe top]</span> and their stats! Maybe you are rich and melee focussed, so the <span class="tooltip osrs-tooltip" id='13239' title='Please wait ...'>[Primordial boots]</span> would be a better choice! With those boots and no cash stack left, you might be forced to eat a <span class="tooltip osrs-tooltip" id='325' title='Please wait ...'>[Sardine]</span>.

The project style and idea is based on World of Warcraft (WOW) tooltips - primarily the [WOWhead tooltips](http://www.wowhead.com/tooltips) that are used on the WOWhead website and other WOW fan sites. You can see a more thorough working demo of WOWhead tootips [here](http://wow.zamimg.com/widgets/power/demo.html).

## Quick Start

Inlcude JavaScript and CSS library files in your web page header:

{: .code-box}
```html
<head>
  <link rel="stylesheet" type="text/css" href="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
  <script type="text/javascript" src="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
</head>
```

Include a span element in your the web page body. The example below will create a tooltip for the <span class="tooltip osrs-tooltip" id='11806' title='Please wait ...'>[Saradomin godsword]</span> on your page.

{: .code-box}
```html
<span class="tooltip osrs-tooltip" id='11806' title='Please wait ...'>[Saradomin godsword]</span>
```

The only modification you need to make is: 1) The item text name; and 2) The OSRS item ID number. Both must be manually enetered. To help, you can find a [master list of OSRS item ID numbers](http://osrsbox.com/osrsbox-db/items.csv) from the [osrsbox-db project site](https://github.com/osrsbox/osrsbox-db).

## Detailed Usage Guide with Examples

The osrsbox-tooltip library provides support for tooltips on your web page. OSRS tooltips are pretty simple to use. The process requires two main additions to your web page: 1) Inclusion of the JavaScript and CSS code in your web page header; and 2) Inclusion of HTML elements in your web page body to display some text or an image which is hovered over to display the actual tooltip.

### 1) Include JavaScript and CSS style sheet in the web page header

The JavaScript code (osrsbox-tooltips.js) needs to be included the HTML source code header for the web page when you want to use OSRS tooltips.

{: .code-box}
``` html
<script type="text/javascript" src="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
```

The CSS style code (osrsbox-tooltips.css) also needs to be included the HTML source code header for the web page when you want to use OSRS tooltips.

{: .code-box}
```html
<link rel="stylesheet" type="text/css" href="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
```

The following code provides a full working example of a header with links to the the JavaScript and CSS files hosted on osrsbox.com:

{: .code-box}
```html
<head>
  <link rel="stylesheet" type="text/css" href="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css">
  <script type="text/javascript" src="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js"></script>
</head>
```

### 2) Include HTML element to show tooltip

Once the OSRS tooltip library has been included in the header we can create HTML elements which have tooltips when a user hovers their mouse over the element. The OSRS tooltip library is included using HTML span elements, so can be included anywhere. Common techniques include displaying text - usually item names. You could also have a thumbnail image with a tooltip. Some code below indicates the use of each method.

Text example:

{: .code-box}
```html
<span class="tooltip osrs-tooltip" id='2615' title='Please wait ...'>[Rune platebody (g)]</span>
```

Image example:

{: .code-box}
``` html
<span class="tooltip osrs-tooltip" id='2617' title='Please wait ...'><img class="" height="32" width="32" src="http://osrsbox.com/osrsbox-db/items-icons/2617.png"></span>
```

### Full working example

Sometimes code snippets can be difficult to understand or implement. Therefore, the following HTML code is a full working example of how to use OSRS tooltips on a web page. This is barebones example with minimal page formatting and style. 

Code includes a hoverable text in the form of an item name, as well as a hoverable thumbnail image example. 

{: .code-box}
```html
<!DOCTYPE html>
<html>
<head>
  <title>OSRSBOX | Simple HTML Example using OSRS Tooltips by PH01L</title>
  <!-- External links to osrsbox-tooltip library (JS and CSS) -->
  <link href="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.css" rel="stylesheet" type="text/css">
  <script src="http://osrsbox.com/osrsbox-tooltips/osrsbox-tooltips.js" type="text/javascript">
  </script>
</head>
<body>
  <span class="tooltip osrs-tooltip" id='2615' title='Please wait ...'>[Rune platebody (g)]</span>
  <span class="tooltip osrs-tooltip" id='2617' title='Please wait ...'><img class="" height="32" width="32" src="http://osrsbox.com/osrsbox-db/items-icons/2617.png"></span>
</body>
</html>
```

## Project feedback and contribution

This is an independant project (thus far). However, I would thoroughly appreciate any feedback regarding the project. The best method is to post an appropriate Github issue with a feature request or bug. 

## Project goal list

+ Include support for non-equipable items in tooltips
+ Categorise tooltips: maybe based on additional information that could be displayed. Examples include farming supplies, better potions with doses information, edible items with healing etc.