// Check for the various File API support.
if (window.File && window.FileReader) {
  // Great success! All the File APIs are supported.
} else {
  alert("Required File APIs to save/load progress are not available.");
}

function update_rewards(item_id, clue_level) {
  // Update the TT reward that a user has clicked on
  // Either selected it, or deselect it
  var element = document.getElementById(item_id + "-img");

  if (!rewards[clue_level][item_id]) {
    // If the element is not selected (false), then select it (true)
    // Also, add tt-selected css class to remove opacity
    rewards[clue_level][item_id] = true;
    element.setAttribute("class", "tt-selected");
  } else {
    // If the element is selected (true), then deselect it (false)
    // Also, remove tt-notselected css class to add opacity back
    rewards[clue_level][item_id] = false;
    element.setAttribute("class", "tt-notselected");
  }
}

function reload_rewards(clue_level, item_id, status) {
  // Reload the TT rewards that a user has previously saved

  // Make string for fetching the image ID
  var element = document.getElementById(item_id + "-img");

  if (status) {
    // If the element is not selected (false), then select it (true)
    // Also, add tooltipselected css class to remove opacity
    rewards[clue_level][item_id] = true;
    element.setAttribute("class", "tt-selected");
  } else {
    // If the element is selected (true), then deselect it (false)
    // Also, remove tooltipselected css class to add opacity back
    rewards[clue_level][item_id] = false;
    element.setAttribute("class", "tt-notselected");
  }
}

function clear_interface() {
  // Loop the rewards object, and set everything to false
  // Then reload interface
  for (var clue_level in rewards) {
    for (var item_id in rewards[clue_level]) {
      reload_rewards(clue_level, item_id, false);
    }
  }
}

function save_json() {
  // Save a JSON string representation of the user selections
  var text = JSON.stringify(rewards);
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", "rewards.json");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

window.onload = function () {
  // Get the file input
  var fileInput = document.getElementById("file_input");

  fileInput.addEventListener("change", function (e) {
    // Start by clearing all entries
    clear_interface();

    // Get the entry and check if it is JSON
    var file = fileInput.files[0];
    var textType = /json.*/;
    if (file.type.match(textType)) {
      // Read the JSON File
      var reader = new FileReader();
      reader.onload = function (e) {
        var rawJSON = reader.result;
        // Parse the JSON data
        let jsonObject = JSON.parse(rawJSON);
        // Loop the input JSON file and set entries to true
        for (var clue_level in jsonObject) {
          for (var item_id in jsonObject[clue_level]) {
            var status = jsonObject[clue_level][item_id];
            reload_rewards(clue_level, item_id, status);
          }
        }
      };
      reader.readAsText(file);
    } else {
      alert("File type not supported!");
    }
  });
};

function screenshot() {
  var element = document.getElementById("tt-block");
  html2canvas(element, { allowTaint: true }).then(function (canvas) {
    document.body.appendChild(canvas);
    console.log("DONE");
  });
}
