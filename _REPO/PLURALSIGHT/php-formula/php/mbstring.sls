{% from "php/map.jinja" import php with context %}

{% set mbstring_pkg = salt['pillar.get']('php:mbstring_pkg', php.mbstring_pkg) %}

php-mbstring:
  pkg.installed:
    - name: {{ mbstring_pkg }}
