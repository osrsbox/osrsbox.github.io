// Fetch models_summary.json on page load
// Then generate osrs-models table
$.getJSON("https://www.osrsbox.com/osrsbox-db/models_summary.json", function(data) {
    var table = $('#search-results').DataTable({
        data:  sanitizeData(data),
        "order": [[ 0, "asc" ]],
        "iDisplayLength": 50,
        columns: [
            { data: 'model_id' },
            { data: 'name' },
            { data: 'type' },
            { data: 'type_id' }
        ]
        })  
});

// Format original models_summary.json structure into array
function sanitizeData(data) {
  var d = [];
  Object.keys(data).forEach(function(key) {
    d.push(data[key]);
  });
  return d;
}
