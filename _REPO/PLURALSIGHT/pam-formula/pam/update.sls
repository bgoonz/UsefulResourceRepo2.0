{% from "pam/map.jinja" import pam with context %}

{% if grains.os_family == 'Debian' %}
pam-auth-update:
  cmd.run:
    - name: DEBIAN_FRONTEND=noninteractive pam-auth-update --force
{% endif %}

#TODO: pam-config
#TODO: authconfig