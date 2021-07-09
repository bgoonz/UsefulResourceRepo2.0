{% from "php/map.jinja" import php with context %}

{% if grains['os_family'] == 'Debian' %}

{% set use_ppa = salt['pillar.get']('php:use_ppa', none) %}
{% if use_ppa is not none %}

  ppa:
    pkgrepo.managed:
      - ppa: {{ salt['pillar.get']('php:ppa_name', 'ondrej/php5') }}
    pkg.latest:
      - name: php5
      - refresh: True

{% endif %}

{% endif %}