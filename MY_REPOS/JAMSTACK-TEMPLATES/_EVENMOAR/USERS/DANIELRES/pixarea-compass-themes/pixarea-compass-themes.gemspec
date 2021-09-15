# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "pixarea-compass-themes/version"

Gem::Specification.new do |s|
  s.name        = "pixarea-compass-themes"
  s.version     = Pixarea::Compass::Themes::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Daniel Reszka"]
  s.email       = ["draens@hotmail.com"]
  s.homepage    = "https://github.com/danielres/pixarea-compass-themes"
  s.summary     = %q{A supra-modular CSS theming system based on COMPASS}
  s.description = %q{A supra-modular CSS theming system based on COMPASS}

  s.rubyforge_project = "pixarea-compass-themes"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.has_rdoc = false
  s.add_dependency("compass", [">= 0.11.beta.3"])

end
