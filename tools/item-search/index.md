---
layout: tool
title: OSRSBOX | Item Search for Old School RuneScape
tool_name: Item Search for Old School RuneScape
tool_desc: Search an exhaustive and up-to-date list of OSRS Item ID numbers and Item names
include_custom_css: 
- //cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css
include_custom_script: 
- //cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
- item-search.js
---

<p>This tool is a simple web application for looking up item names and finding the in-game item ID. You can also search in reverse, looking up a specific item ID number and getting the corresponding item name. The table is dynamic and can be sorted on each column, and searched interactively.</p>

<table id="search-results" class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Icon</th>
      <th scope="col">Name</th>
      <th scope="col">ID</th>
    </tr>
  </thead>
</table>
