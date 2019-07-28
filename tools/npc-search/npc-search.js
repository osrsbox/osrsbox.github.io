// Fetch npcs-summary.json on page load
// Then generate osrs-npcs table
$.getJSON("https://www.osrsbox.com/osrsbox-db/npcs-summary.json", function(data) {
    var table = $('#search-results').DataTable({
        data:  sanitizeData(data),
        "order": [[ 1, "asc" ]],
        "iDisplayLength": 50,
        columns: [
            { data: 'name' },
            { data: 'id' }
        ]
        })  
});

// Format original JSON structure into array
function sanitizeData(data) {
  var d = [];
  Object.keys(data).forEach(function(key) {
    d.push(data[key]);
  });
  return d;
}
