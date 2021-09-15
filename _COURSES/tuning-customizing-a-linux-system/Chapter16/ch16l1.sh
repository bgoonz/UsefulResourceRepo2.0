#!/bin/sh
#
# firewall	Set and activate firewall rules and IPmasq
#
# chkconfig: 2345 70 25
# description: Activate/Deactivates firewall rules and masquerading.
# probe: false

PATH=/sbin:/bin:/usr/sbin:/usr/bin
. /etc/rc.d/init.d/functions
. /etc/sysconfig/network
[ ${NETWORKING} = "no" ] && exit 0

if [ -x /etc/sysconfig/firewall ]; then
    . /etc/sysconfig/firewall
else
    action "Firewall setup: No /etc/sysconfig/firewall" /bin/false
    exit 1
fi

case "$1" in 
  start)
	# enable reverse path filtering (prevents IP spoofing across interfaces;
	# e.g. prevents someone outside from pretending to be inside;) enable
	# on relevant int/ext interfaces ONLY; others are none of our business
	for iface in $extiface $intiface; do
	    echo 1 > /proc/sys/net/ipv4/conf/$iface/rp_filter
	done

	# flush table & set default policies: DROP everything except what we
	# explicitly allow
	iptables -F
	iptables -t nat -F
	iptables -P INPUT DROP
	iptables -P OUTPUT DROP
	iptables -P FORWARD DROP

	# localhost is friendly
	iptables -A INPUT -i lo -j ACCEPT
	iptables -A OUTPUT -o lo -j ACCEPT

	# DO accept input related to legitimate connections
	iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

	# DO allow traffic originating from this machine to go out
	iptables -A OUTPUT -s $extip -j ACCEPT

	# specifically allow forwarding of internal iface to external iface,
	# and activate MASQUERADING (AKA SNAT with auto-remangling)
	iptables -A INPUT -i $intiface -j ACCEPT
	iptables -A FORWARD -i $intiface -o $extiface -j ACCEPT
	iptables -A FORWARD -m state -i $extiface -o $intiface \
		 --state ESTABLISHED,RELATED -j ACCEPT
	iptables -t nat -A POSTROUTING -o $extiface -j MASQUERADE

	# set up DNAT redirections, to relay ssh, web, etc. to internal server
	for port in $redir_ports; do
	    # first allow the packets into the system...
	    iptables -A FORWARD -i $extiface -o $intiface -p tcp \
		     --dport $port -j ACCEPT
	    # ...and then send them where they belong
	    iptables -t nat -A PREROUTING -p tcp -i $extiface --dport $port \
		     -j DNAT --to $intserver
	done

	# enable ssh connections to this machine from internal net ONLY
	iptables -A INPUT -i $intiface -p tcp --dport ssh -j ACCEPT

	# allow traffic generated on this machine to the internal network
	iptables -A OUTPUT -o $intiface -j ACCEPT 

	# drop reserved/private IP packets that come in from outside
	# these get dropped by the default policies anyway, but dropping them
	# here keeps them from getting logged below, which reduces log spam
	iptables -A INPUT -i $extiface -s 192.168.0.0/16 -j DROP
	iptables -A INPUT -i $extiface -s 10.0.0.0/8 -j DROP
	iptables -A INPUT -i $extiface -s 172.16.0.0/16 -j DROP

	# log everything else that's about to get dropped -- i.e. log anomalies
	iptables -A INPUT -m limit --limit 5/second -j LOG
	iptables -A OUTPUT -m limit --limit 5/second -j LOG
	iptables -A FORWARD -m limit --limit 5/second -j LOG

	# Finally, enable IP forwarding now that everything is safe
	echo "1" > /proc/sys/net/ipv4/ip_forward

	action "Firewall startup" /bin/true
	;;
  stop)
	iptables -F
	iptables -X
	iptables -P INPUT ACCEPT
	iptables -P OUTPUT ACCEPT
	iptables -P FORWARD ACCEPT
	echo "0" > /proc/sys/net/ipv4/ip_forward
	action "Firewall shutdown [WARNING: system is unprotected]" /bin/true
	;;
  status)
	[ 0 != `cat /proc/sys/net/ipv4/ip_forward` ] && \
		echo "Forwarding enabled."
	echo "Firewall rules:"
	echo "***************"
	iptables -L
	echo
	echo "NAT rules:"
	echo "**********"
	iptables -t nat -L
	;;
  restart)
	$0 stop
	$0 start
	;;
esac
