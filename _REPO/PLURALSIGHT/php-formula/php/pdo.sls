{% from "php/map.jinja" import php with context %}

php-pdo:
  pkg.installed:
    - name: {{ php.pdo_pkg }}
    - require_in:
       - pkg: php-fpm
