function update_rewards(item, category) {
    // Update the TT reward that a user has clicked on
    // Either selected it, or deselect it
  
    var element = document.getElementById(item);
  
    if (!rewards[item]) {
      // If the element is not selected (false), then select it (true)
      // Also, add tooltipselected css class to remove opacity
      rewards[item] = true;
      element.setAttribute("class", "tt-selected");
    }
    else {
      // If the element is selected (true), then deselect it (false)
      // Also, remove tooltipselected css class to add opacity back
      rewards[item] = false;
      element.setAttribute("class", "tt-notselected");
    }
  }
  
  function reload_rewards(item, category, status) {
    // Reload the TT rewards that a user has previously saved
  
    var element = document.getElementById(item);
    var parent_element = element.parentNode;
  
    if (status) {
      // If the element is not selected (false), then select it (true)
      // Also, add tooltipselected css class to remove opacity
      rewards[category][item] = true;
      parent_element.setAttribute("class", "tooltip tooltipselected");
    }
    else {
      // If the element is selected (true), then deselect it (false)
      // Also, remove tooltipselected css class to add opacity back
      rewards[category][item] = false;
      parent_element.setAttribute("class", "tooltip");
    }
  }
  
  function save_json() {
    // Save a JSON string representation of the user selections
    localStorage.setItem('rewards_saved', JSON.stringify(rewards));
  }
  
  function load_json() {  
    // Read a previously saved user selection
    var retrievedJSONString = localStorage.getItem('rewards_saved');
  
    // Parse the JSON string representation to an object
    var retrievedObject = JSON.parse(retrievedJSONString);
  
    // Loop the retrieved object, and update the "rewards" object
    // Call reload_rewards() to fix selected and not-selected items
    for (var key in retrievedObject) {
      // console.log("KEY: " + key);
      if (retrievedObject.hasOwnProperty(key)) {
        for (var key2 in retrievedObject[key]) {
          // console.log("KEY2: " + key2);
          // console.log("SATUS: " + retrievedObject[key][key2])
          reload_rewards(key2, key, retrievedObject[key][key2]);
        }
      }
    }
  }
  
  function clear_interface() {
    // Loop the rewards object, and set everything to false
    // Then reload interface
    for (var key in rewards) {
      // console.log("KEY: " + key);
      if (rewards.hasOwnProperty(key)) {
        for (var key2 in rewards[key]) {
          // console.log("KEY2: " + key2);
          // console.log("SATUS: " + retrievedObject[key][key2])
          reload_rewards(key2, key, false);
        }
      }
    }
  }
  
  function screenshot() {
    var element = document.getElementById("block");
    html2canvas(element, {
        onrendered: function(canvas) {
          //document.body.appendChild(canvas);
          Canvas2Image.saveAsPNG(canvas);
        }
      });
  }
  
  //Creating dynamic link that automatically click
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
      //after creating link you should delete dynamic link
      //clearDynamicLink(link); 
    }
  
  //Your modified code.
  function printToFile(div) {
    html2canvas(div, {
      onrendered: function (canvas) {
        var myImage = canvas.toDataURL("image/png");
              //create your own dialog with warning before saving file
              //beforeDownloadReadMessage();
              //Then download file
              downloadURI("data:" + myImage, "yourImage.png");
            }
          });
  }