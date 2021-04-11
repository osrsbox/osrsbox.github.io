---
layout: tool
title: OSRSBOX | Object Search for Old School RuneScape
tool_name: Object Search for Old School RuneScape
tool_desc: Search an exhaustive and up-to-date list of OSRS Object ID numbers and Object names
include_custom_css: 
- //cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css
include_custom_script: 
- //cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js
- object-search.js
---

<p>This tool is a simple web application for looking up Object names and finding the in-game Object ID. You can also search in reverse, looking up a specific Object ID number and getting the corresponding Object name. The table is dynamic and can be sorted on each column, and searched interactively.</p>

<table id="search-results" class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">ID</th>
    </tr>
  </thead>
</table>
