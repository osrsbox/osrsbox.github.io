---
layout: default
title: OSRSBox | An Old School RuneScape Project
---

<!-- Header -->
<header class="header">
   <div class="overlay d-flex w-100 h-100">
   <div class="container">
   <div class="description d-flex flex-column h-100 w-100 justify-content-center">
        <div class="h1">Welcome to OSRSBox</div>
        <div class="h3 text-muted">A Website for Old School RuneScape Enthusiasts</div>
        <div class="d-none d-md-block">
            <a href="mailto:phoil@osrsbox.com"><i class="header-icon fas fa-envelope-square fa-4x pr-2"></i></a>
            <a href="https://github.com/osrsbox"><i class="header-icon fab fa-github-square fa-4x pr-2"></i></a>
            <a href="https://www.reddit.com/user/PH01L/"><i class="header-icon fab fa-reddit-square fa-4x pr-2"></i></a>
        </div>
    </div>
    </div>
    </div>
    <div class="container">
      <a data-value="chevron-link" href="#"><i class="fas fa-chevron-down fa-4x chevron-down mx-auto" style="color:black;"></i></a>
   </div>
</header>

<!-- Popular Tools and Projects | Jumbotron -->
<div class="jumbotron jumbotron-fluid" id="chevron-link">
<div class="container">
<h1>Popular Tools and Projects</h1>
<p class="lead">Below is a collection of my popular OSRS tools and projects. If you see something useful, please check out my other <a href="{{ site.url }}/tools/">tools</a> and <a href="{{ site.url }}/projects/">projects</a></p>
</div>
</div>

<!-- Popular Tools and Projects | Content -->
<div class="container">
{% for item in site.data.popular %}
    {% assign mod = forloop.index | modulo: 2 %}
    {% if mod == 0 %}
        {% include featurette_left.html object=item %}
    {% else %}
        {% include featurette_right.html object=item %}
    {% endif %} 
    {% if forloop.last == false %}
        <hr class="divider divider-osrsbox">
    {% endif %} 
{% endfor %}
</div>

<!-- Popular Blog Posts | Jumbotron -->
<div class="jumbotron jumbotron-fluid mt-5">
<div class="container">
<h1>Popular Blog Posts</h1>
<p class="lead">Below is a collection of my popular blogs posts. If my ramblings entertain, please check out some other posts on the <a href="{{ site.url }}/blog/">blog</a>, or have a look through the <a href="{{ site.url }}/blog/tags/">tags</a> of all the posts</p>
</div>
</div>

<!-- Popular Blog Posts | Content -->
<div class="container">
{% assign popular_posts = site.posts | where: "add_to_popular_list","true" %}
{% for post in popular_posts %}
    {% include post_outline.html post=post %}
    {% if forloop.last == false %}
        <hr class="divider divider-osrsbox">
    {% endif %}    
{% endfor %}
</div>
