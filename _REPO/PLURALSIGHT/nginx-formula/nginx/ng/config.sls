# nginx.ng.config
#
# Manages the main nginx server configuration file.

{% from 'nginx/ng/map.jinja' import nginx with context %}

nginx_config:
  file.managed:
    - name: {{ nginx.lookup.conf_file }}
    - source: salt://nginx/ng/files/nginx.conf
    - template: jinja
    - context:
        config: {{ nginx.server.config|json() }}
