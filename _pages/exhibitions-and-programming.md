---
layout: default
id: exhibitions
permalink: /exhibitions-and-programming/
classes:
  - exhibitions
include_categories:
  - exhibitions
  - exhibition programming
published: true
---

<div id="main">
<div class="page__inner-wrap" id="{% if page.id %}{{ page.id }}{% endif %}">

  <div class="categories-wrap">

    {% for current_category in page.include_categories %}

        {% assign c = current_category %}

        <a class="archive__category" href="/{{ c | replace: ' ','-' }}/"><h1><span class="ar">{{site.data.translations.category[c]}}</span><span class="bold"> / </span><span class="en">
        {% assign c_title = c | split: " " %}
        {% for word in c_title %}
          {{ word | capitalize }}
        {% endfor%}
        </span></h1></a>
        {% assign category_posts = site.posts | where: 'categories', c %}
        {% include post-row.html posts = category_posts %}

    {% endfor %}


  </div>

</div>
</div>