{% from "php/map.jinja" import php with context %}

include:
  - php.package

php:
  pkg.installed:
    - name: {{ php.php_pkg }}
