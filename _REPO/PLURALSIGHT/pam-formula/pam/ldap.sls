{% from "pam/map.jinja" import pam with context %}

ldap:
  pkg.installed:
    - name: {{ pam.ldap_pkg }}

{{ pam.ldap_config }}:
  file.managed:
    - source: salt://pam/files/ldap.conf
    - user: root
    - group: root
    - mode: 644

ldap_conf:
  file.append:
    - name: {{ pam.ldap_config }}
    - text:
      - host {{ salt['pillar.get']('pam:ldap:host') }}
      {% if salt['pillar.get']('pam:ldap:port') %}
      - port {{ salt['pillar.get']('pam:ldap:port') }}
      {% endif %}
      - base {{ salt['pillar.get']('pam:ldap:base') }}
      - ldap_version {{ salt['pillar.get']('pam:ldap:version', 3) }}
      - bind_policy {{ salt['pillar.get']('pam:ldap:policy') }}
      {% if salt['pillar.get']('pam:ldap:binddn') %}
      - binddn {{ salt['pillar.get']('pam:ldap:binddn', '') }}
      - bindpw {{ salt['pillar.get']('pam:ldap:bindpw', '') }}
      {% endif %}
      - scope {{ salt['pillar.get']('pam:ldap:scope', 'sub') }}
      - pam_lookup_policy {{ salt['pillar.get']('pam:ldap:pam_lookup_policy', 'yes') }}
      - pam_groupdn {{ salt['pillar.get']('pam:ldap:pam_groupdn') }}
      - pam_member_attribute {{ salt['pillar.get']('pam:ldap:pam_member_attribute', 'member') }}
      - pam_password {{ salt['pillar.get']('pam:ldap:pam_password') }}
      {% if salt['pillar.get']('pam:ldap:ssl') %}
      - ssl {{ salt['pillar.get']('pam:ldap:ssl') }}
      {% endif %}
      {% if salt['pillar.get']('pam:ldap:tls_checkpeer') == 'yes' %}
      - tls_checkpeer {{ salt['pillar.get']('pam:ldap:tls_checkpeer', 'no') }}
      - tls_cacertfile {{ salt['pillar.get']('pam:ldap:tls_cacertfile', '') }}
      - tls_cacertdir {{ salt['pillar.get']('pam:ldap:tls_cacertdir', '') }}
      {% endif %}
