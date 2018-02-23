---
layout: default
permalink: /works/
id: works
include_categories:
 - works
---

<div id="main" role="main">
  {% include sidebar.html %}

  <div id="{{ page.id }}">

    {% for current_category in page.include_categories %}

        {% assign c = current_category %}

        <h2 class="archive__category">{{ c }}</h2>

        {% include category-row.html cat = c %}

    {% endfor %}


  </div>
</div>