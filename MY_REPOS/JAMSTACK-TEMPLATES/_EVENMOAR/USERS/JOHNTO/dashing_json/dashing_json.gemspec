# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'dashing_json/version'

Gem::Specification.new do |spec|
  spec.name          = "dashing_json"
  spec.version       = DashingJson::VERSION
  spec.authors       = ["John Otander"]
  spec.email         = ["johnotander@gmail.com"]
  spec.description   = %q{Make your JSON absolutely dashing in your rails HTML views.}
  spec.summary       = %q{Make your JSON absolutely dashing in your rails HTML views.}
  spec.homepage      = "https://github.com/johnotander/dashing_json"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
