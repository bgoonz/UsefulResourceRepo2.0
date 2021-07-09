{% from "php/map.jinja" import php with context %}

php-odbc:
  pkg.installed:
    - name: {{ php.odbc_pkg }}
