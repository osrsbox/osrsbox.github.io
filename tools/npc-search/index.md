---
layout: tool
title: OSRSBOX | NPC Search for Old School RuneScape
tool_name: NPC Search for Old School RuneScape
tool_desc: Search an exhaustive and up-to-date list of OSRS NPC ID numbers and NPC names
include_custom_css: 
- //cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css
include_custom_script: 
- //cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
- npc-search.js
---

<p>This tool is a simple web application for looking up NPC names and finding the in-game NPC ID. You can also search in reverse, looking up a specific NPC ID number and getting the corresponding NPC name. The table is dynamic and can be sorted on each column, and searched interactively.</p>

<table id="search-results" class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">ID</th>
    </tr>
  </thead>
</table>
