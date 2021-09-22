Notify-by-SES
=============

Send Nagios notifications using SES as the email transport.

Usage
-----

* `npm install notify-by-ses -g`
* use the following configuration as a jumping off point in Nagios:

```nagios
# contact configuration file used by ansible-nagios.
define contact {
  contact_name                             ses
  alias                                    SES Pseudo-Contact
  service_notification_period              24x7
  host_notification_period                 24x7
  service_notification_options             w,u,c,r
  host_notification_options                d,u,r
  service_notification_commands            notify-by-ses-service
  host_notification_commands               notify-by-ses-host
  pager                                    {{nagios_admin_email}}
}

define command {
  command_name    notify-by-ses-service
  command_line   /usr/bin/notify-by-ses -k "{{nagios_aws_access_key_id}}" -s "{{nagios_aws_access_key_secret}}" -n "$NOTIFICATIONTYPE$" -h "$HOSTNAME$" -t "$SERVICESTATE$" -d "$SERVICEDISPLAYNAME$" -a "$HOSTADDRESS$" -o "$SERVICEOUTPUT$" -p "$CONTACTPAGER$"
}

define command {
  command_name    notify-by-ses-host
  command_line   /usr/bin/notify-by-ses -y Host -k "{{nagios_aws_access_key_id}}" -s "{{nagios_aws_access_key_secret}}" -n "$NOTIFICATIONTYPE$" -h "$HOSTNAME$" -t "$HOSTSTATE$" -d "$HOSTDISPLAYNAME$" -a "$HOSTADDRESS$" -o "$HOSTOUTPUT$" -p "$CONTACTPAGER$"
}
```

Configuration Options
--------------------

* **-r**: use the **-r** flag to specify an AWS region, defaults to 'email.us-east-1.amazonaws.com'.

Using With Ansible
-------------------

* *notify-by-ses* is designed to be used along with [ansible-nagios](https://github.com/npm/ansible-nagios).
