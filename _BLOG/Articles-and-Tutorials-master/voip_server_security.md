# Security Hardening your FreePBX & Asterisk VoIP Server

### Introduction

This article builds on [Deploy a VoIP Private Branch Exchange (PBX) Server on CentOS 6.4]().

At a minimum, you should review and deploy the following security measures:

- Configure Fail2Ban by commencing at **Step Two** of [How To Protect SSH with fail2ban on CentOS 6 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-protect-ssh-with-fail2ban-on-centos-6);
- Install & configure DenyHosts. _See_ [How To Install DenyHosts on CentOS 6 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-install-denyhosts-on-centos-6); and
- Deploy a firewall. _See_ [How To Setup a Basic IP Tables Configuration on Centos 6 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-setup-a-basic-ip-tables-configuration-on-centos-6) and open the following ports, for the initial setup and testing phase:

  - 1194 (TCP) for OpenVPN
  - 1720 (TCP)
  - 2000 (TCP)
  - 2727 (UDP)
  - 4520 (UDP)
  - 4569 (UDP)
  - 5000 (UDP)
  - 5038 (TCP)
  - 5060 (TCP & UDP)
  - 5061 (TCP)
  - 10000-20000 (UDP)

    **Note:** Remember to close any unused ports once you deploy your Asterisk server into production.

- You are **strongly** encouraged to secure the traffic between your VoIP server and your softphones & hard phones via an encrypted, VPN tunnel. While OpenVPN was automatically installed by the FreePBX install script, you need to configure it to your specific environment, _see_ [How to Setup and Configure an OpenVPN Server on CentOS 6 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-setup-and-configure-an-openvpn-server-on-centos-6);
- Finally, carry out the rudimentary security measures outlined in [Initial Server Setup with CentOS 6 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-centos-6) (this particular step was not completed before because the install & upgrade scripts needed to be deployed as the `root` user).
