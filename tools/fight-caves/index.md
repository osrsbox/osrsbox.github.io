---
layout: tool
title: OSRSBOX | Fight Caves Spawn Predictor
tool_name: Fight Caves Spawn Predictor
tool_desc: Visually maps every mob in the Fight Caves, including Jad!
redirect_from:
  - fc/fc.html
---

<style>
/* INTRO BLURB CONFIGURATION */
.intro {
	overflow: hidden;
}
.intro p {
	text-align: justify;
}
.clear_intro {
	display: block;
    margin: 0 auto;    
	width: 450px;
	height: 90px;
	line-height: 30px;	
	background-color: #4CAF50;
	font-weight: bold;
	text-align: center;
	height: 30px;
	font-size: large;
	font-weight: bold;
    text-align: center;
}
.clear_intro:hover {
	cursor: pointer;
	color: black;
}

/* MAIN GUI POSITION */
.gui-holder {
	position: relative;
	margin-left: auto;
	margin-right: auto;
    width: 450px;
    max-width: 450px;
	min-height: 600px;
	max-height: 800px;	
}

/* BASE MAP POSIITON */
.gui-holder .map-image {
	position: absolute;
	top: 120px;
}

/* TEXT LINE CONFIGURATION */
.text-line {
	position: absolute;
	width: 450px;
	top: 70px;
	color: white;
	text-align: center;
}
.wave-text-line {
	position: absolute;
	top: 150px;
	left: 265px;
	color: red;
	font-weight: bold;
}

/* BUTTON POSITIONS AND CONFIGURATION */
.button {
	position: absolute;
	height: 30px;
	width: 130px;
	border-radius: 8px;
	background-color: white;
	color: black;
	border: 2px solid #e7e7e7;	
}
.button:hover {
	background-color: #e7e7e7;
}
.previous-button {
    top: 10px;
	left: 20px;
}
.current-button {
    top: 10px;
	left: 160px;
}
.next-button {
    top: 10px;
	left: 300px;
}

/* PRAYER POSITIONS */
.prayer-previous {
	position: absolute;
	top: 50px;
	left: 60px;
}
.prayer-current {
	position: absolute;
	top: 50px;
	left: 200px;
}
.prayer-next {
	position: absolute;
	top: 50px;
	left: 340px;
}

/* SPAWN POSITIONS */
.spawn-nw {
	position: absolute;
	top: 185px;
	left: 60px;
}
.spawn-c {
	position: absolute;
	top: 290px;
	left: 170px;
}
.spawn-sw {
	position: absolute;
	top: 410px;
	left: 55px;
}
.spawn-s {
	position: absolute;
	top: 410px;
	left: 180px;
}
.spawn-se {
	position: absolute;
	top: 345px;
	left: 300px;
}

/* SPAWN OFFSET POSITIONS */
.spawn-nw-offset {
	position: absolute;
	top: 205px;
	left: 80px;
}
.spawn-c-offset {
	position: absolute;
	top: 310px;
	left: 190px;
}
.spawn-sw-offset {
	position: absolute;
	top: 430px;
	left: 75px;
}
.spawn-s-offset {
	position: absolute;
	top: 430px;
	left: 200px;
}
.spawn-se-offset {
	position: absolute;
	top: 365px;
	left: 320px;
}

/* REFRESH PAGE CONFIGURATION */
.refresh-page {
	display: block;
    margin: 0 auto;
    width: 450px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	background-color: #4CAF50;
	font-size: large;
	font-weight: bold;
}
.refresh-page:hover {
	cursor: pointer;
	color: black;
	background-color: #4CAF50;
}
</style>
        
<div id="intro" class="intro">
    <p>This tool determines where monsters in the fight caves minigame will spawn and then puts them on the map below. Once the spawns are discovered, the map will display the first wave. Use the Previous Wave and Next Wave buttons to go up or down through the waves. Also, under each wave button, there will be an prayer icon to help you choose what overhead prayer to use (e.g. Protect from Missles).</p>
    <p>All you need to do is start the fight caves minigame, and enter the first few spawns that you observe by clicking the location markers on the map. For example, if the first level 22 Tz-Kih spawns in the north west, hit the NW button. If the next two spawn in the center and south, hit the C and S buttons.</p>
  
    <div class="clear_intro" onclick="clear_intro();">
      CLICK HERE TO HIDE THE PANEL ABOVE
    </div>
    <!-- /.clear_intro -->
  </div>
  <!-- /.intro -->
  
  <div class="application">
    <div id="gui-holder" class="gui-holder">
  
      <img class="map-image" src="images/map.png" alt="HTML5 Icon" style="width:450px;height:465px;">
  
      <!-- Buttons to control which wave to view -->
      <button type="button" id="previous-button" class="button previous-button" onclick="javascript:display_wave(63)" disabled>Previous Wave</button>
      <button type="button" id="current-button" class="button current-button" onclick="" disabled>Current Wave</button>
      <button type="button" id="next-button" class="button next-button" onclick="javascript:display_wave(2)" disabled>Next Wave</button>
  
      <!-- Image placeholders to indicate what overhead prayer to use -->
      <img id="prayer-previous" class="prayer-previous" src="images/prayer-empty.png" alt="" style="width:50px;height:50px;">
      <img id="prayer-current" class="prayer-current" src="images/prayer-empty.png" alt="" style="width:50px;height:50px;">
      <img id="prayer-next" class="prayer-next" src="images/prayer-empty.png" alt="" style="width:50px;height:50px;">
  
      <!-- User help text -->
      <p id="text-line" class="text-line"><b>WAVE 1:</b>
        <br> Where did the first level 22 spawn?</p>
  
      <!-- Current wave number banner -->
      <p id="wave-text-line" class="wave-text-line"></p>
  
      <!-- Spawn locations -->
      <img id="spawn-nw" class="spawn-nw" src="images/nw.png" alt="" style="width:100px;height:92px;" onclick="javascript:wave1('nw')">
      <img id="spawn-c" class="spawn-c" src="images/c.png" alt="" style="width:100px;height:92px;" onclick="javascript:wave1('c')">
      <img id="spawn-sw" class="spawn-sw" src="images/sw.png" alt="" style="width:100px;height:92px;" onclick="javascript:wave1('sw')">
      <img id="spawn-s" class="spawn-s" src="images/s.png" alt="" style="width:100px;height:92px;" onclick="javascript:wave1('s')">
      <img id="spawn-se" class="spawn-se" src="images/se.png" alt="" style="width:100px;height:92px;" onclick="javascript:wave1('se')">
  
    </div><!-- /.gui-holder -->
  
    <div class="refresh-page" onclick="javascript:refresh_page()">
      Reload Interface
    </div><!-- /.refresh-page -->
  </div><!-- /.application -->        
<script type="text/javascript" src="fight-caves.js"></script>
