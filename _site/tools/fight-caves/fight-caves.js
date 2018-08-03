"use strict";

// Author: Thomas Laurenson (rsn = PHOIL)
// Name: fight-caves.js
// Version: 1.0.0
// Description: Javascript file to predict OSRS fight caves spawns and map then accordingly

// Object of all possible spawn locations for first 2-3 waves
// The user input MUST match one of these strings to get the start number
var possible_spawns = {
    "nw,sw,se": 3,
    "nw,se,sw": 3,
    "nw,c,se": 7,
    "nw,se,c": 7,
    "nw,c,s": 12,
    "nw,s,c": 12,
    "c,nw,sw": 2,
    "c,sw,nw": 2,
    "c,se,sw": 8,
    "c,sw,se": 8,
    "c,s,se": 13,
    "c,se,s": 13,
    "se,sw,c": 0,
    "se,c,sw": 0,
    "se,s,nw": 5,
    "se,nw,s": 5,
    "se,sw,s": 9,
    "se,s,sw": 9,
    "s,se,sw": 14,
    "s,sw,se": 14,
    "s,nw,c,c,se": 6,
    "s,c,nw,c,se": 6,
    "s,nw,c,c,s": 11,
    "s,c,nw,c,s": 11,
    "sw,c,nw": 1,
    "sw,nw,c": 1,
    "sw,se,s": 4,
    "sw,s,se": 4,
    "sw,s,nw": 10,
    "sw,nw,s": 10
};

// The current wave, used when algorithm determines mobs for each wave
var current_wave = 1;

// The current DISPLAYED wave, used for displaying mobs on the map
var current_display_wave = 1;

// The last wave displayed, used to determine what wave to display first
var last_wave_displayed = 0;

// Object to store all wave mobs and spawn locations
// For example:
// 1: 22,S;
// 2: 22,NW;22,C;
// 3: 45,C;
// ...
// 62: 360,NW;360,C;
// 63: 702,C;108,S;108,SE;108,SW;108,C;
var spawns = {};

// string variable to store user input of first 2 (or 3) waves and location
var spawns_from_user = "";

// Array of strings for each spawn location, used to loop for function re-assignment
var locations = ["nw", "c", "sw", "s", "se"];

function printspawn(wave) {
    if (wave >= 31) {
        spawns[current_wave] = spawns[current_wave] + "360,";
        return wave - 31;
    }
    if (wave >= 15) {
        spawns[current_wave] = spawns[current_wave] + "180,";
        return wave - 15;
    }
    if (wave >= 7) {
        spawns[current_wave] = spawns[current_wave] + "90,";
        return wave - 7;
    }
    if (wave >= 3) {
        spawns[current_wave] = spawns[current_wave] + "45,";
        return wave - 3;
    }
    spawns[current_wave] = spawns[current_wave] + "22,";
    return wave - 1;
}

function getspawn(loc) {
    var spawnarr = [3, 5, 2, 1, 5, 3, 4, 1, 2, 3, 5, 4, 1, 2, 4],
        sval = spawnarr[loc];
    if (sval === 1) {
        spawns[current_wave] = spawns[current_wave] + "nw;";
    }
    if (sval === 2) {
        spawns[current_wave] = spawns[current_wave] + "c;";
    }
    if (sval === 3) {
        spawns[current_wave] = spawns[current_wave] + "se;";
    }
    if (sval === 4) {
        spawns[current_wave] = spawns[current_wave] + "s;";
    }
    if (sval === 5) {
        spawns[current_wave] = spawns[current_wave] + "sw;";
    }
    return;
}

function jadspawn(start) {
    var i = 1;

    spawns[current_wave] = spawns[current_wave] + "702,";
    getspawn(start);

    while (i < 5) {
        spawns[current_wave] = spawns[current_wave] + "108,";
        getspawn((start + i) % 15);
        i += 1;
    }
    return;
}

function printwave(start, wave) {
    var i = 0,
        curwave = wave;

    spawns[current_wave] = "";

    if (curwave === 63) {
        jadspawn((start) % 15);
        return;
    }
    while (curwave > 0) {
        curwave = printspawn(curwave);
        getspawn((start + i) % 15);
        i += 1;
    }
    return;
}

function clear_display() {
    // Clear all location marker images
    var i = 0;
    for (i = 0; i < locations.length; i++) {
        document.getElementById("spawn-" + locations[i]).src = "images/empty.png";
    }
}

function clear_display_onclicks() {
    // Clear all location marker onclicks
    var i = 0;
    for (i; i < locations.length; i++) {
        document.getElementById("spawn-" + locations[i]).onclick = function() {};
    }
}

function clear_display_offsets() {
    // Clear all location offset marker images and style
    var i = 0;
    for (i; i < locations.length; i++) {
        document.getElementById("spawn-" + locations[i] + "-offset").src = "images/empty.png";
        //document.getElementById("spawn-" + locations[i] + "-offset").style="width:100px;height:92px;";
    }
}

function clear_display_prayer() {
    // Clear all prayer marker images
    document.getElementById("prayer-previous").src = "images/prayer-empty.png";
    document.getElementById("prayer-current").src = "images/prayer-empty.png";
    document.getElementById("prayer-next").src = "images/prayer-empty.png";
}

function wave1(location) {
    // Add user input location to spawn string
    spawns_from_user = spawns_from_user + location + ",";

    // Debug: log wave name and spawn location to console
    console.log("wave1");
    console.log(spawns_from_user);

    // Update location markers for wave2a
    document.getElementById("spawn-nw").onclick = function() {
        wave2a("nw");
    };
    document.getElementById("spawn-c").onclick = function() {
        wave2a("c");
    };
    document.getElementById("spawn-sw").onclick = function() {
        wave2a("sw");
    };
    document.getElementById("spawn-s").onclick = function() {
        wave2a("s");
    };
    document.getElementById("spawn-se").onclick = function() {
        wave2a("se");
    };

    // Put an empty image in location as it will not be used in wave2a
    document.getElementById("spawn-" + location).src = "images/empty.png";
    document.getElementById("spawn-" + location).onclick = function() {};

    // Update the text-line to display next prompt for user
    document.getElementById("text-line").innerHTML = "<b>WAVE 2:</b> <br> Where did the next two level 22s spawn?";
}

function wave2a(location) {
    // Add user input location to spawn string
    spawns_from_user = spawns_from_user + location + ",";

    // Debug: log wave name and spawn location to console
    console.log("wave2a");
    console.log(spawns_from_user);

    // Update location markers for wave2b
    document.getElementById("spawn-nw").onclick = function() {
        wave2b("nw");
    };
    document.getElementById("spawn-c").onclick = function() {
        wave2b("c");
    };
    document.getElementById("spawn-sw").onclick = function() {
        wave2b("sw");
    };
    document.getElementById("spawn-s").onclick = function() {
        wave2b("s");
    };
    document.getElementById("spawn-se").onclick = function() {
        wave2b("se");
    };

    // Put an empty image in locations as it will not be used in wave 2s
    document.getElementById("spawn-" + location).src = "images/empty.png";
    document.getElementById("spawn-" + location).onclick = function() {};
}

function wave2b(location) {
    // Add user input location to spawn string
    spawns_from_user = spawns_from_user + location;

    // Debug: log wave name and spawn location to console
    console.log("wave2b");
    console.log(spawns_from_user);

    // Put an empty (black) image in locations as it will not be used in wave 2s
    document.getElementById("spawn-" + location).src = "images/empty.png";

    // If SOUTH was the first lvl 22 spawn, wave 3 info is needed
    // If SOUTH was not first spawn, determine all mob spawn locations
    if (spawns_from_user.charAt(0) == "s" && ((spawns_from_user.charAt(2) == "c" && spawns_from_user.charAt(4) == "n") || (spawns_from_user.charAt(2) == "n" && spawns_from_user.charAt(5) == "c"))) {

        // Clear all location marker images and onclick events
        clear_display();
        clear_display_onclicks();

        // Reapply location markers for "se" and "s" (the only possible spawns)
        document.getElementById("spawn-se").src = "images/se.png";
        document.getElementById("spawn-s").src = "images/s.png";
        document.getElementById("spawn-s").onclick = function() {
            wave3("s");
        };
        document.getElementById("spawn-se").onclick = function() {
            wave3("se");
        };

        // Also place a level 45 mob in center (the correct location)
        document.getElementById("spawn-c").src = "images/45.png";

        // Update the text-line to display next prompt for user
        document.getElementById("text-line").innerHTML = "<b>WAVE 3/4:</b> <br> Where did the second level 45 spawn?";
    } else {
        // Update the last displayed wave... therefore, map wave 3 first
        last_wave_displayed = 2;

        // Pass user input to check if valid spawn locations have been provided
        check_spawns();
    }
}

function wave3(location) {
    // Add user input location to spawn string
    spawns_from_user = spawns_from_user + ",c," + location;

    // Debug: log wave name and spawn location to console
    console.log("wave3");
    console.log(spawns_from_user);

    // Update the last displayed wave... therefore, map wave 5 first
    last_wave_displayed = 4;    

    // Pass user input to check if valid spawn locations have been provided
    check_spawns();
}

function check_spawns() {
    // Check user input is valid
	var start = 0;
	
    if (spawns_from_user in possible_spawns) {
        console.log(">>> SUCCESSS: SPAWN LOCATION FOUND...");
        start = possible_spawns[spawns_from_user];
        console.log(start);
        var done = determine_spawns(start);
        document.getElementById("text-line").style.display = "none";
    } else {
        // Clear all location markers images
        clear_display();

        // Something went wrong with spawn mapping (user input error)
        document.getElementById("text-line").innerHTML = "ERROR: Locations do not match database. Refresh";
    }
}

function determine_spawns(start) {
    // Based on user input, invoke algorithm to determine all wave spawns
    var wave = 1;
    var i = 1;
    for (i; i <= 63; i++) {
        printwave(start, wave);
        current_wave += 1;
        wave += 1;
        start += 1;
    }

    // Since we will display the waves next, enable the HTML buttons to cycle
    document.getElementById("previous-button").disabled = false;
    document.getElementById("next-button").disabled = false;

    // Insert offset images now, they were not displayed before as they overlap the location markers
    console.log("ADDING OFFSET IMAGES");
    var i = 0;
    var div_name = "gui-holder";
    for (i; i < locations.length; i++) {
        // Basically, loop locations and (for each) create a new HTML element for each offset
        var elem = document.createElement("img");
        elem.setAttribute("src", "images/empty.png");
        elem.setAttribute("id", "spawn-" + locations[i] + "-offset");
        elem.setAttribute("class", "spawn-" + locations[i] + "-offset");
        elem.width = "100";
        elem.height = "92";
        document.getElementById(div_name).appendChild(elem);
    }

    // All done, display the first wave
    display_wave(last_wave_displayed + 1);
}

function print_wave() {
    var i = 1;

    for (i; i <= 63; i++) {
        // Copy each wave mob list into new string
        var mobs = spawns[i];

        // Remove the last character (if it is a semi colon)
        mobs = mobs.replace(/;$/, "");
        console.log(mobs)

        // Split on each semi colon, to get list of mobs
        var res = mobs.split(";");
        console.log(res)
    }
}

function display_wave(wave_number) {
    // First clear the map for new mobs to display
    clear_display();
    clear_display_onclicks();
    clear_display_offsets();
    clear_display_prayer();

    // Update current wave button to display wave number
    document.getElementById("wave-text-line").textContent = "Wave Number: " + wave_number;

    // Copy each wave mob list into new string
    var mob_list = spawns[wave_number];

    // Remove the last character (if it is a semi colon)
    mob_list = mob_list.replace(/;$/, "");

    // Split on each comma, to get list of mobs
    var mobs = mob_list.split(";");
    console.log("WAVE " + wave_number + ": " + mobs);

    // Object for determining if a location has been plotted
    // Helps when two mobs spawn in the same location
    var plotted = {
        "nw": false,
        "c": false,
        "sw": false,
        "s": false,
        "se": false}

    // Loop the list of mobs and display on map
    var i = 0;
    for (i; i < mobs.length; i++) {
        // Split on comma, to get level and location
        var level = mobs[i].split(",")[0];
        var location = mobs[i].split(",")[1];

        // Set image with extracted mob level and location
        // Also check if location has been plotted or not
        if (plotted[location]) {
            document.getElementById("spawn-" + location + "-offset").src = "images/" + level + ".png";
            document.getElementById("spawn-" + location + "-offset").style = "width:100px;height:92px;"
        } else {
            plotted[location] = true;
            document.getElementById("spawn-" + location).src = "images/" + level + ".png";
        }
    }

    // Determine next and previous wave numbers
    var next_wave_number = 0;
    var previous_wave_number = 0;

    if (wave_number == 1) {
        previous_wave_number = 63;
        next_wave_number = 2;
    } else if (wave_number == 63) {
        previous_wave_number = 62;
        next_wave_number = 1;
    } else {
        previous_wave_number = wave_number - 1;
        next_wave_number = wave_number + 1;
    }

    // Fetch previous, current and next mobs to determine prayer
    var previous_mobs = spawns[previous_wave_number];
    var current_mobs = spawns[wave_number];
    var next_mobs = spawns[next_wave_number];

    // Determine what prayer for previous wave
    if (previous_mobs.indexOf("360") != -1 && previous_mobs.indexOf("90") != -1) {
        document.getElementById("prayer-previous").src = "images/prayer-rangedmagic.png";
    } else if (previous_mobs.indexOf("360") != -1) {
        document.getElementById("prayer-previous").src = "images/prayer-magic.png";
    } else if (previous_mobs.indexOf("90") != -1) {
        document.getElementById("prayer-previous").src = "images/prayer-ranged.png";
    }

    // Determine what prayer for current wave
    if (current_mobs.indexOf("360") != -1 && current_mobs.indexOf("90") != -1) {
        document.getElementById("prayer-current").src = "images/prayer-rangedmagic.png";
    } else if (current_mobs.indexOf("360") != -1) {
        document.getElementById("prayer-current").src = "images/prayer-magic.png";
    } else if (current_mobs.indexOf("90") != -1) {
        document.getElementById("prayer-current").src = "images/prayer-ranged.png";
    } else if (current_mobs.indexOf("702") != -1) {
        document.getElementById("prayer-current").src = "images/prayer-rangedmagic.png";
    }

    // Determine what prayer for next wave
    if (next_mobs.indexOf("360") != -1 && next_mobs.indexOf("90") != -1) {
        document.getElementById("prayer-next").src = "images/prayer-rangedmagic.png";
    } else if (next_mobs.indexOf("360") != -1) {
        document.getElementById("prayer-next").src = "images/prayer-magic.png";
    } else if (next_mobs.indexOf("90") != -1) {
        document.getElementById("prayer-next").src = "images/prayer-ranged.png";
    } else if (next_mobs.indexOf("702") != -1) {
        document.getElementById("prayer-next").src = "images/prayer-rangedmagic.png";
    }

    // Update buttons to previously specified previous and next wave buttons
    document.getElementById("previous-button").onclick = function() {
        display_wave(previous_wave_number);
    };
    document.getElementById("next-button").onclick = function() {
        display_wave(next_wave_number);
    };
}

function clear_intro() {
    // Make the intro text and image dissapear
    document.getElementById("intro").style.display = "none";
}

function refresh_page() {
    // Reload the page. Also make the intro text and image dissapear
    location.reload(true)
    document.getElementById("intro").style.display = "none";
}
