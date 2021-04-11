// Fetch models_summary.json on page load
// Then generate osrs-models table
$.getJSON(
  "https://www.osrsbox.com/osrsbox-db/models-summary.json",
  function (data) {
    var table = $("#search-results").DataTable({
      data: sanitizeData(data),
      order: [[0, "asc"]],
      iDisplayLength: 50,
      bAutoWidth: false,
      columns: [
        { data: "model_ids" },
        { data: "model_name" },
        { data: "model_type" },
        { data: "model_type_id" },
      ],
      columnDefs: [
        { width: "30%", targets: 0, class: "wrap" },
        { width: "27.5%", targets: 1 },
        { width: "25%", targets: 2 },
        { width: "17.5%", targets: 3 },
      ],
    });
  }
);

// Format original models_summary.json structure into array
function sanitizeData(data) {
  var d = [];
  Object.keys(data).forEach(function (key) {
    d.push(data[key]);
  });
  return d;
}
