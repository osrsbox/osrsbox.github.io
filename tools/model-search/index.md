---
layout: tool
title: OSRSBOX | Model ID Search for Old School RuneScape
tool_name: Model ID Search for Old School RuneScape
tool_desc: Search an exhaustive and up-to-date list of OSRS Model ID numbers, model names and model types
include_custom_css: 
- //cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css
include_custom_script: 
- //cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js
- model-search.js
---

<p>This tool is a simple web application for looking up the model ID numbers when the item name or item ID is known. You can also search in reverse, looking up a specific model ID number and getting the corresponding item name or item ID. The table is dynamic and can be sorted on each column, and searched interactively.</p>

<table id="search-results" class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Model IDs</th>
      <th scope="col">Model Name</th>
      <th scope="col">Model Type</th>
      <th scope="col">Type ID</th>
    </tr>
  </thead>
</table>
