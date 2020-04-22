---
layout: page
title: Projects
description: This is my projects page.
permalink: /projects
---

<div class="projects" markdown="1">
{% for project in site.data.projects %}
- <span class="projects-entry">[{{ project.title }}]({{ project.demo.live }}) <span class="projects-entry-links">{% if project.demo.repository %} [<i class="fas fa-code-branch"></i>]({{ project.demo.repository }}) {% endif %} {% if project.demo.live %} [<i class="fas fa-globe"></i>]({{ project.demo.live }}) {% endif %}</span></span>
  
  {{ project.description }}

  {% for image in project.demo.images %} [<i class="far fa-images"></i>]({{ image }}){:data-rel="lightcase" data-rel="lightcase:{{ project.title | slugify }}"} {% endfor %}

  {% for stackUsed in project.used %} `{{ stackUsed }}` {% endfor %}
{% endfor %}

</div>