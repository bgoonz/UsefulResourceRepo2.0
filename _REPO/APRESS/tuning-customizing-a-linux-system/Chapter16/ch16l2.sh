# variables read by the firewall startup script
extiface=eth0
intiface=eth1
intip=192.168.0.1
extip=`/sbin/ifconfig $extiface 2> /dev/null | sed -n \
      's/^.*inet addr:\(\([0-9]*\.\)*[0-9]*\) *.*$/\1/p'`
redir_ports="ssh http https"
intserver=192.168.0.3
