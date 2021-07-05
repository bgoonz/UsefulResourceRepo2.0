{% from "php/map.jinja" import php with context %}

{% if grains['os_family'] == 'RedHat' %}

{% set use_rpm = salt['pillar.get']('php:use_rpm', none) %}
{% if use_rpm is not none %}

  rpm_public_key:
    file.managed:
      - name: /etc/pki/rpm-gpg/{{ pillar['php']['rpm_public_key'] }}
      - source: {{ pillar['php']['rpm_source'] }}
      - source_hash: {{ pillar['php']['rpm_source_hash'] }}

  rpm_repo:
    pkgrepo.managed:
      - humanname: {{ pillar['php']['rpm_humanname'] }}
      - mirrorlist: {{ pillar['php']['rpm_mirrorlist'] }}
      - gpgcheck: 1
      - gpgkey: file:///etc/pki/rpm-gpg/{{ pillar['php']['rpm_public_key'] }}
      - require:
        - file: rpm_public_key
      - require_in:
        - pkg: php

{% endif %}

{% endif %}