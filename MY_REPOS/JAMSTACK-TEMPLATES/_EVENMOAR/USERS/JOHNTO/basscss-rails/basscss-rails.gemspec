# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'basscss/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "basscss-rails"
  spec.version       = Basscss::Rails::VERSION
  spec.authors       = ["John Otander"]
  spec.email         = ["johnotander@gmail.com"]
  spec.summary       = %q{Include BASSCSS in your Rails apps.}
  spec.description   = %q{Include BASSCSS, a simple, responsive CSS toolkit based on OOCSS principles in your Rails apps.}
  spec.homepage      = "https://github.com/johnotander/basscss-rails"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
end
