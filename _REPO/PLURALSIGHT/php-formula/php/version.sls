{% set version = salt['pillar.get']('php:version', '5.4') %}

{% if grains['os_family'] == "RedHat" %}
  {% if version == "5.6" %}

#    epel_release:
#      pkgrepo.managed:
#        - humanname: Webtatic EPEL
#        - mirrorlist: https://mirror.webtatic.com/yum/el7/$basearch/mirrorlist
#        - require_in:
#          - pkg: php

    install_pubkey_webtatic:
      file.managed:
        - name: /etc/pki/rpm-gpg/RPM-GPG-KEY-webtatic-el7
        - source: https://mirror.webtatic.com/yum/RPM-GPG-KEY-webtatic-el7
        - source_hash: md5=6877c97f7aa9982dc1ff2550dbba14f6

    webtatic:
      pkgrepo.managed:
        - humanname: Webtatic Repository EL7 - $basesearch
        - mirrorlist: https://mirror.webtatic.com/yum/el7/$basearch/mirrorlist
        - gpgcheck: 1
        - gpgkey: file:///etc/pki/rpm-gpg/RPM-GPG-KEY-webtatic-el7
        - require_in:
          - pkg: php

    php:
      pkg.installed:
        - name: php56w

  {% endif %}
{% endif %}