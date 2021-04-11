// Fetch item-search.json on page load
// Then generate osrs-items table
$.getJSON(
  "https://www.osrsbox.com/osrsbox-db/items-search.json",
  function (data) {
    var table = $("#search-results").DataTable({
      data: sanitizeData(data),
      fnRowCallback: customFnRowCallback,
      order: [[2, "asc"]],
      iDisplayLength: 50,
      columns: [
        {
          mData: "id",
          mRender: function (data, type, row) {
            return "";
          },
        },
        { data: "name" },
        { data: "id" },
        { data: "type" },
        { data: "duplicate" },
      ],
    });
  }
);

// Format original summary.json structure into array
function sanitizeData(data) {
  var d = [];
  Object.keys(data).forEach(function (key) {
    d.push(data[key]);
  });
  return d;
}

// Custom function callback for datatables
// Will generate img tags at render time (pseudo lazy loading)
function customFnRowCallback(nRow, aData, iDisplayIndex) {
  $("td:eq(0)", nRow).html(
    "<img src='https://www.osrsbox.com/osrsbox-db/items-icons/" +
      aData["id"] +
      ".png'></img>"
  );
  return nRow;
}
