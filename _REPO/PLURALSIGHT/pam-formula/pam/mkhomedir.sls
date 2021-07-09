{% from "pam/map.jinja" import pam with context %}

{{ pam.mkhomedir_config }}:
  file.managed:
    - source: salt://pam/files/mkhomedir
    - user: root
    - group: root
