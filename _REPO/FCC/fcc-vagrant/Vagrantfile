# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "freecodecamp.dev"
  config.vm.boot_timeout = 900

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  config.vm.box_check_update = false

  # Hostmanager plugin must be installed with vagrant
  # for these commands to work. Check README.md for
  # more information.
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true

  # Rename the default user
  # config.ssh.username = "fccuser"
  # config.ssh.private_key_path = "~/.vagrant.d/insecure_private_key"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.10.10"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "./freecodecamp", "/home/vagrant/freecodecamp", create: true

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:

  config.vm.provider "virtualbox" do |vb|
    vb.name = "fcc-box"
    vb.gui = false
    vb.cpus = 1
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", "75"]
    vb.memory = "1024"
  end

  config.vm.provision "puppet" do |puppet|
    puppet.manifests_path = "provision/puppet/manifests"
    puppet.manifest_file = "main.pp"
    puppet.module_path = "provision/puppet/modules"
    puppet.options = [
      '--verbose',
      '--debug',
    ]
  end
end