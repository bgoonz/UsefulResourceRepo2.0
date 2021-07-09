{% from "pam/map.jinja" import pam with context %}

ccreds:
  pkg.installed:
    - name: {{ pam.ccreds_pkg }}

