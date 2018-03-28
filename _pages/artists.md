---

layout: single
title: Artists
permalink: /artists/
id: artists

---

<div class="artists-grid">
{% for a in site.data.authors %}

{% assign author = a[1] %}
{% include author-single.html %}

{% endfor %}
</div>