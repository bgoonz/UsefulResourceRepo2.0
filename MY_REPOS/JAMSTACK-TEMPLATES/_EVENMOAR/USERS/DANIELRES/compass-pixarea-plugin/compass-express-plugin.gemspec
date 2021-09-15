# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)


Gem::Specification.new do |s|
  s.name        = "compass-pixarea-plugin"
  s.version     = "0.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.5")
  s.authors = ["Daniel Reszka"]
  #s.date = %q{2011-03-16}
  s.description = %q{Personal compass framework built on top of Blueprint}
  s.email = %w{draens@hotmail.com}
  s.has_rdoc = false
  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }  
  s.homepage = %q{http://blog.pixarea.com}
  s.require_paths = ["lib"]
  s.rubyforge_project = "compass-pixarea-plugin"
  s.rubygems_version = %q{1.3.6}
  s.summary = %q{Compass framework}
  s.add_dependency(%q<compass>, [">= 0.10.0"])
end

#  s.platform    = Gem::Platform::RUBY

