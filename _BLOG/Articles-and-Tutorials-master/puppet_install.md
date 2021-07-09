# Why and HowTo Install Puppet on a DigitalOcean Cloud Server

### Introduction

This article, is the first in a series of instructional-guides on the popular configuration-management tool: Puppet. However, this article provides only a cursory and simplistic overview of the benefits of automated provisioning tools, such as Puppet – and focuses the balance of your valuable time on providing a walk-through on deploying Puppet on your system. The many benefits of configuration-management tools can not be captured in a short-read, as this article strives to be. To determine (i.) whether _any_ configuration-management tool would be of benefit to you and/or (ii.) which one, e.g. [Chef](<http://en.wikipedia.org/wiki/Chef_(software)> "From Wikipedia | The free encyclopedia"), [Puppet](<http://en.wikipedia.org/wiki/Puppet_(software)> "From Wikipedia | The free encyclopedia"), [Salt](<http://en.wikipedia.org/wiki/Salt_(software)> "From Wikipedia | The free encyclopedia"), among others, you'll be better served by additional research on your own. With that...

If you manage more than one server, your life can be made much easier by employing a configuration-management tool to provision, configure and manage your servers and the applications they host. Using Puppet, or Chef, you can easily automate repetitive tasks, quickly deploy critical applications, and proactively manage change: from scaling 2, 5 or 10s of servers to 1000s, on-premise or in the cloud. Puppet is available as both open source and commercial software. While Puppet Enterprise is the commercially supported, packaged release of Puppet, you can manage up to 10 nodes free. This article focuses on deploying the open-source release within a client-server framework.

## Benefits

---

Puppet is a cross-platform framework enabling system administrators to perform common tasks. It is a model-driven solution that requires little coding knowledge to use. While Chef calls its models _recipes_, Puppet refers to them as _manifests_. A group of manifests is called a _module_. There are modules to configure packages like Apache, Nginx, and MySQL. You can also use manifests and modules to alter file permissions, users and groups, and more. As one can see, these models, or manifests and modules, can carry out a variety of tasks; making Puppet helpful not only during the initial installation of a server, but also throughout the server's entire life cycle; and useful in both large and small deployments. In addition, Puppet has an amazing and active community whose members share modules and other useful information in two main repositories (referenced below).

At first glance, a system administrator might dismiss the idea of a configuration-management tool. Some believe that the same results can be achieved with machine images, i.e. snapshots, and shell scripts. As one author so eloquently put it: This is equivalent to a lumberjack who has just heard about chainsaws, but doesn't see why anyone would ever want more than an ax. What many system admins fail to recognize, is the value of the limited time on their hands. One of the strengths that a configuration-management tool brings to the table is automating repetitive tasks, freeing up system admins so they can focus on more important matters.

## Planning

---

Puppet allows for centralized management by employing a client-server, or agent-master, model. The central, or administrative, server is commonly referred to as the Puppet _master_ which services Puppet _clients_. While only one server is needed to function as the Puppet master, you can have a nearly infinite number of Puppet client, or agent, nodes. However, it _is_ possible to deploy Puppet in such a way where each individual server acts as both the Puppet master and client. You must decide on a deployment type before installing:

### Agent/ Master a/k/a Client/ Server

Agent nodes, or Puppet clients, pull their configurations from a Puppet master server. Admins must manage node certificates, but will only have to maintain manifests and modules on the Puppet master server, and can more easily take advantage of features like reporting and external data sources.

You must decide in advance which server will be the master and install **puppetmaster** on it before installing **puppet** on any agents or clients. The master should be a [dedicated machine with a fast processor, lots of RAM, and a fast disk](https://puppetlabs.com/puppet/requirements/ "Puppet Components & Requirements").

### Standalone

Every node compiles its own configuration from manifests. Admins must regularly sync Puppet manifests and modules to every node.

## Preparing

---

By default, Puppet clients look for the Puppet master server by contacting the host with the name **puppet**, via DNS:

- Identify, or [create](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server "How to Create Your First DigitalOcean Droplet Virtual Server"), a server to act as the Puppet _master_ and make a note of its IP address;
- Identify, or [create](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server "How to Create Your First DigitalOcean Droplet Virtual Server"), the server(s) that will act as the Puppet client(s);
- Check that each server has (i.) a unique hostname (in Ubuntu, the relevant commands are):

      hostname

  and (ii.) a fully qualified domain name (FQDN):

      hostname -f

  If modifications are needed, the hostname can be set by executing:

      sudo vim /etc/hostname

  _See_ [Installing and Using the Vim Text Editor on a DigitalOcean Cloud Server](https://www.digitalocean.com/community/articles/installing-and-using-the-vim-text-editor-on-an-cloud-server). Then, tap the i key on your keyboard, and add (or edit):

      [hostname]

  (While not mandatory, it's advisable to name the host that will act as the master server: `puppet`.) To save your changes, tap the Esc key on your keyboard, followed by the following keystrokes: : then w then q and, finally Enter. Next, execute the following commands:

      sudo vim /etc/hosts

  and add a line below the initial `127.0.0.1 localhost.localdomain localhost` line, that reads:

      127.0.1.1  [hostname].yourdomain.tld  [hostname]

  Finally, execute the following commands:

      sudo /etc/init.d/hostname restart

- [Create a DNS A record or a CNAME](https://www.digitalocean.com/community/articles/how-to-set-up-a-host-name-with-digitalocean "How to Set Up a Host Name with DigitalOcean") for the hostname **puppet** within your domain, pointing to the node that will serve as the Puppet master, i.e. **puppet.yourdomain.tld.**

If you do not wish to use DNS, you can add entries to the respective servers' **/etc/hosts** files. However, doing so is a tedious process **and goes against what we want to accomplish with _automated_, configuration management**. For example, let's assume that your central, or Puppet _master_, server will be **ny1.yourdomain.tld** at IP address: 1.2.3.4. On Ubuntu, you should execute the following command:

    sudo vim /etc/hosts

<table><tbody><tr class="odd"><td>127.0.0.1</td><td>  localhost.localdomain</td><td>  localhost</td><td>  puppet</td></tr><tr class="even"><td>127.0.1.1</td><td>  ny1.yourdomain.tld</td><td>  ny1</td><td></td></tr><tr class="odd"><td>1.2.3.4</td><td>  ny1.yourdomain.tld</td><td>  ny1</td><td>  puppet</td></tr></tbody></table>

On each Puppet _client_, add an entry in the client's **/etc/hosts** file for the Puppet master (below, we assume that one of your Puppet clients is **sf1.yourdomain.tld** at IP address: 1.2.3.5):

<table><tbody><tr class="odd"><td>127.0.0.1</td><td>  localhost.localdomain</td><td>  localhost</td><td></td></tr><tr class="even"><td>127.0.1.1</td><td>  sf1.yourdomain.tld</td><td>  sf1</td><td></td></tr><tr class="odd"><td>1.2.3.5</td><td>  sf1.yourdomain.tld</td><td>  sf1</td><td></td></tr><tr class="even"><td>1.2.3.4</td><td>  ny1.yourdomain.tld</td><td>  ny1</td><td>  puppet</td></tr></tbody></table>

### Avoiding Firewall Issues

CentOS ships with extremely restrictive **iptables** rules, which may need to be modified. If you previously deployed an **iptables** firewall on your server (or have some servers in a NAT environment), ensure that your **master server** is **allow**ing incoming, **TCP** connections on **port 8140**.

### Update Your Packages

Once the servers are built and the appropriate ports have been opened in the firewall, update all your packages:

    sudo apt-get update && sudo apt-get -y upgrade && sudo apt-get -y dist-upgrade &&  sudo apt-get -y autoremove && sudo reboot

## Install _puppetmaster_ on Central Server

---

You have several options for installing **puppetmaster**. You can either use the package available in your operating system's repository or you can use Puppet Labs' apt repository. Because some OS repositories are slow to update their packages, it is recommended to install **puppetmaster** from the Puppet Labs repository, so that you do not end up with out-dated releases. To enable the Puppet Labs repository:

1.  Download the "puppetlabs-release" package for your [OS version](http://docs.puppetlabs.com/guides/puppetlabs_package_repositories.html "Puppet Labs maintains official package repositories for several of the more popular Linux distributions"). You can see a full list of these packages on the front page of [http://apt.puppetlabs.com/](http://apt.puppetlabs.com). They are all named **puppetlabs-release-\[CODE NAME\].deb**;
2.  Install the package by running **dpkg -i** .

For example, to install **puppetmaster** on your central, or administrative, server running Ubuntu 12.04 LTS (nicknamed Precise Pangolin), from the Puppet Labs repo, execute the following commands in a terminal:

    sudo wget http://apt.puppetlabs.com/puppetlabs-release-precise.deb
    sudo dpkg -i puppetlabs-release-precise.deb
    sudo apt-get update && sudo apt-get -y install puppetmaster

Installation instructions for other Linux distros, OS X, Windows, the BSDs or Solaris are available, here: [Installing Puppet](http://docs.puppetlabs.com/guides/installation.html#installing-puppet-1)

### Configuring _puppetmaster_ on Central Server

Next, execute the following commands:

    sudo mkdir -p /etc/puppet/{manifests,modules/{profiles,roles}}
    sudo touch /etc/puppet/manifests/{site.pp,templates.pp,nodes.pp}

Puppet's behavior can be customized with a [rather large collection of settings](http://docs.puppetlabs.com/references/stable/configuration.html "Puppet Labs | Docs: Configuration Reference"). Most of these can be safely ignored, but you'll almost definitely have to modify some of them. Puppet's main configuration file is found at **/etc/puppet/puppet.conf** and is ordered with the following headers, or blocks: **\[main\]**, **\[agent\]** and **\[master\]**.

Settings for agent nodes, or Puppet clients, should go in the **\[agent\]** or **\[main\]** blocks of **puppet.conf**. Along the same lines, settings for the Puppet master server should go in the **\[master\]** or **\[main\]** blocks of **puppet.conf**.

**NOTE:** Puppet masters are usually also agent nodes, or Puppet clients, themselves. Settings in **\[main\]** will be available to both services and settings in the **\[master\]** and **\[agent\]** blocks will override the settings in **\[main\]**.

### Standalone Nodes

Settings for standalone Puppet nodes should go in the **\[main\]** block of **puppet.conf**. Puppet's default settings are generally appropriate for standalone nodes. No additional configuration is necessary unless you intend to use centralized reporting or an [external node classifier](http://docs.puppetlabs.com/guides/external_nodes.html "An external node classifier is an arbitrary script or application which can tell Puppet which classes a node should have.").

### Avoiding DNS Pitfalls

At this point, we need to provide **puppetmaster** its fully qualified domain name (FQDN), so that it can properly format SSL certficates. First, you need to assess your current environtment:

- Does the node that's going to function as the Puppet master have only one (1) hostname--that is, **NO** aliases?

If (i) the answer is "yes" to that question AND (ii) you created a DNS _A record_ for your Puppet master, execute the following commands and edits:

    sudo service puppetmaster stop
    sudo rm -rf /var/lib/puppet/ssl
    sudo vim /etc/puppet/puppet.conf

and add the following line, under the **\[main\]** header/ block:

    server = puppet.yourdomain.tld

If you created a DNS CNAME for your Puppet master AND/OR your master server has hostname aliases, then execute the following steps:

    sudo service puppetmaster stop
    sudo rm -rf /var/lib/puppet/ssl
    sudo vim /etc/puppet/puppet.conf

Under the **\[master\]** header/block, add a comma-separated list of all of your master server's aliasas, e.g.:

    dns_alt_names = puppet, [alias1], [alias2], puppet.yourdomain.tld

Now, execute:

    sudo service puppetmaster start

### Install **puppetmaster**'s Dependencies

Before moving on to installing **puppet** on agent/ client nodes, update all your packages on the master server one last time:

    sudo apt-get update && sudo apt-get -y upgrade && sudo apt-get -y dist-upgrade &&  sudo apt-get -y autoremove && sudo reboot

## Install _puppet_ on Client Server(s)

---

Again, we're going to install **puppet** from the Puppet Labs repository. On client nodes running Ubuntu 12.04 LTS, execute:

    sudo wget http://apt.puppetlabs.com/puppetlabs-release-precise.deb
    sudo dpkg -i puppetlabs-release-precise.deb
    sudo apt-get update && sudo apt-get -y install puppet

Click here, for: [Instructions on enabling Puppet Labs' repos for other Linux distros](http://docs.puppetlabs.com/guides/puppetlabs_package_repositories.html "Puppet Labs maintains official package repositories for several of the more popular Linux distributions").

**REMEMBER:** One of Puppet's best features is that it is cross-platform; thus, your clients are NOT required to run the same OS as the Puppet master. From a practical perspective, this flexibility is amazing because it will allow a developer to quickly and efficiently spin up new DigitalOcean droplets of varying OSes, to test and debug their apps. When the staging server is no longer needed, it can be destroyed (to save on monthly costs) with confidence, because Puppet, coupled with DigitalOcean's API and snapshot support, can deploy a new droplet (literally) within seconds the next time a staging environment is needed.

### Configure _puppet_ on Client Server(s)

Once **puppet** is installed, we need to configure the Puppet client so that it can connect to the Puppet master. We do this with the following command and edits:

    sudo vim /etc/puppet/puppet.conf

and add the following:

    [agent]
    server = puppet.yourdomain.tld
    report = true
    pluginsync = true
    certname = [hostname of Puppet client].yourdomain.tld

Now, we need to configure the Puppet client to start automatically, with the following command:

    sudo vim /etc/default/puppet

and edit the line that begins with **START**, so that it reads:

    START=yes

Then, start the service:

    sudo service puppet start

Repeat these steps for every Puppet client.

## Configure Secure Communications

---

Every time you deploy a new Puppet client, log in to the Puppet _master_ and execute the following command to view a list of SSL certificates waiting to be signed:

    sudo puppet cert --list

Then, on the Puppet _master_, sign the client certificate in queue by executing the following command:

    sudo puppet cert --sign [hostname of Puppet client]

Congratulations! The new Puppet client will now be able to successfully connect to, and securely communicate with, the Puppet master.

## Installing Puppet Modules

---

Modules are self-contained bundles of code and data. You can [write your own modules](http://docs.puppetlabs.com/puppet/2.7/reference/modules_fundamentals.html#module-layout) or you can download pre-built modules. As stated earlier, there are repositories of pre-existing modules, written and contributed by users, that solve a wide variety of problems. Instead of recreating the proverbial 'wheel,' you can use Puppet's integrated Module Tool, which allows you to execute Puppet subcommands to find and manage modules from the [Puppet Forge](https://forge.puppetlabs.com). Its interface is similar to several common package managers, and makes it easy to search for and install new modules from the command line. For information and examples on the various Module Tool subcommands, refer to Puppet Labs' [Docs: Installing Modules](http://docs.puppetlabs.com/puppet/2.7/reference/modules_installing.html). In addition to [Puppet Forge](https://forge.puppetlabs.com), another popular repository with user-submitted manifests & modules that solve common problems is available on [GitHub](https://github.com/puppetlabs).

Nearly all Puppet manifests belong in modules. The sole exception is the main **site.pp** manifest, which contains site-wide and node-specific code. To make a module available to Puppet, place it in one of the directories in Puppet's [modulepath](http://docs.puppetlabs.com/references/stable/configuration.html#modulepath). The **modulepath** is a list of directories separated by the system path-separator character. On 'nix systems, this is the colon (:),while Windows uses the semi-colon (;). The most common default modulepaths are:

- **/etc/puppetlabs/puppet/modules:/opt/puppet/share/puppet/modules** (for Puppet Enterprise); or
- **/etc/puppet/modules:/usr/share/puppet/modules** (for open source Puppet);

To see your currently configured modulepath, execute the following command:

    sudo puppet config print modulepath

If you want both the Puppet master and Puppet agents to have access to modules, set the modulepath in [puppet.conf](http://docs.puppetlabs.com/guides/configuring.html "Puppet's behavior can be customized with a rather large collection of settings. Most of these can be safely ignored, but you'll almost definitely have to modify some of them.") under the **\[main\]** block, i.e.

    modulepath = /etc/puppet/modules:/usr/share/puppet/modules

Modulepath is a setting, among others, that can be different per [environment](http://docs.puppetlabs.com/guides/environment.html "Manage your module releases by dividing your site into environments.").

## Learn to Use Puppet

---

You can [learn](http://docs.puppetlabs.com/learning "Puppet Labs | Docs: Learning Puppet - Index"), and practice using, Puppet in a safe and convenient virtual environment, by downloading the [Learning Puppet VM](http://info.puppetlabs.com/download-learning-puppet-VM.html) (free) for VMware or VirtualBox. Although the VM and examples use Puppet Enterprise, the lessons also apply to the open source release of Puppet. Any new Puppet user should start at the [Learning Puppet - Index](http://docs.puppetlabs.com/learning "Puppet Labs | Docs: Learning Puppet - Index").

## What's Next?

---

Additional articles on practical uses of Puppet are forthcoming. Check

### Revision Control

Before we get too far along though, you'll notice we've got a couple of configuration, `.pp`, files. As you configure more and more resources you'll find yourself adding to this collection of files. This collection of files also needs to be managed and we strongly recommend you implement a revision control system, such as Subversion or Git. You should place all your manifests and potentially other aspects of your Puppet configuration under revision control and preferably host your repository on another system. The repository should be regularly backed up. This will allow you to make changes to your manifests and configuration and know you can safely roll them back or recreate an earlier state without needing to re-write or edit a large number of files.

## Additional Resources

---

- [Puppet Labs | Open Source Release Installation Guide](http://docs.puppetlabs.com/guides/installation.html);
- [Puppet Labs | Puppet Enterprise Installation Guide](http://docs.puppetlabs.com/pe/latest/install_basic.html);
- [Puppet Labs Documentation](http://docs.puppetlabs.com/);
- [Puppet Core Types Cheat Sheet](http://docs.puppetlabs.com/puppet_core_types_cheatsheet.pdf);
- [The Puppet Community](https://puppetlabs.com/community/overview).

As always, if you need help with the basic setup & configuration of Puppet, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • Updated 8/06/2013
