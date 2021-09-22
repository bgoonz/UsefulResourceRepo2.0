{% from "php/map.jinja" import php with context %}

php-xdebug:
  pkg.installed:
    - name: {{ php.xdebug_pkg }}
