# INFO: included modules
include othertools

# INFO: Puppet Config
# INFO: List out provisioning stages
stage { 'pre': before => Stage['main'] }
stage { 'post': require => Stage['main'] }

# INFO: Global variables
$node_version   = '4.2.2'
$home_dir       = '/home/vagrant'
$bin            = '/usr/local/bin:/usr/bin:/bin'
$nvm_path       = [
  "/usr/local/bin",
  "/usr/bin",
  "/bin",
  "${home_dir}/.nvm/versions/node/v${node_version}/bin"
]
$default_user   = 'vagrant'

# INFO: List classes in stages
class { 'aptGetUpdate': stage => pre }
# class { 'othertools': stage => pre }
# class { 'nodejs': stage => main }
class { 'mongodb': stage => main }
class { 'fccmodule':
  node_version  => $node_version,
  home_dir      => $home_dir,
  default_bin   => $bin,
  nvm_path      => $nvm_path,
  default_user  => $default_user,
  stage => post
}

# INFO: add aptGetUpdate to catalog
class aptGetUpdate {
  exec { 'aptUpdate':
    command => 'sudo apt-get update',
    path => '/bin:/usr/bin'
  }
}

# INFO: add mongodb with params to catalog
class mongodb {
  class { '::mongodb::globals':
    manage_package_repo => true,
    bind_ip             => ["127.0.0.1"],
  }->
  class { '::mongodb::server':
    port    => 27017,
    verbose => true,
    ensure  => "present"
  }->
  class { '::mongodb::client': }
}

# INFO: add nodejs with set globals to catalog
class { 'nodejs::globals':
  version => $node_version
}->
class { 'nodejs': }