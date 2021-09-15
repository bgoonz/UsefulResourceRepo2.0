# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'archivable/version'

Gem::Specification.new do |spec|
  spec.name          = "archivable"
  spec.version       = Archivable::VERSION
  spec.authors       = ["John Otander"]
  spec.email         = ["johnotander@gmail.com"]
  spec.summary       = %q{Archive your Rails models rather than delete them.}
  spec.description   = %q{Archive your Rails models rather than delete them, with model and controller concerns.}
  spec.homepage      = "https://github.com/johnotander/archivable"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency 'activesupport'
  spec.add_dependency 'activerecord'
  spec.add_dependency 'meta_magic'

  spec.add_development_dependency 'bundler', '~> 1.11'
  spec.add_development_dependency 'rake'
  spec.add_development_dependency 'rspec'
  spec.add_development_dependency 'actionpack'
  spec.add_development_dependency 'sqlite3'
end
