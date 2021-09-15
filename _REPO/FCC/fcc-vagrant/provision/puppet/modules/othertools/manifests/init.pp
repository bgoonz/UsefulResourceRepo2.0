class othertools {
  package { "git":
    ensure => latest,
    require => Exec['aptUpdate'] }
  package { "m4":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "ruby":
    ensure => latest,
    require => Exec['aptUpdate']  }
  package { "vim-common":
    ensure => latest,
    require => Exec['aptUpdate']  }
  package { "curl":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "htop":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "g++":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "build-essential":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "texinfo":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "libbz2-dev":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "libcurl4-openssl-dev":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "libexpat-dev":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "libncurses-dev":
    ensure => present,
    require => Exec['aptUpdate']  }
  package { "zlib1g-dev":
    ensure => present,
    require => Exec['aptUpdate']  }
}