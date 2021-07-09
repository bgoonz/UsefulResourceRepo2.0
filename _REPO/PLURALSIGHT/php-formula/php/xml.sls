{% from "php/map.jinja" import php with context %}

php-xml:
  pkg.installed:
    - name: {{ php.xml_pkg }}
    - watch_in:
      - service: php-fpm