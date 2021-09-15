require 'rspec/core/rake_task'

SPEC_SUITES = [
 { :id => :models, :title => 'models', :pattern => "spec/models/*_spec.rb" },
 { :id => :acceptance, :title => 'acceptance', :pattern => "spec/acceptance/*.feature" }
]

namespace :spec do
 namespace :suite do
   SPEC_SUITES.each do |suite|
     desc "Run all specs in #{suite[:title]} spec suite"
     RSpec::Core::RakeTask.new(suite[:id]) do |t|
       t.pattern = suite[:pattern]
       t.verbose = false
     end
   end
   desc "Run all spec suites"
   task :all  do
     SPEC_SUITES.each do |suite|
       Rake::Task["spec:suite:#{suite[:id]}"].execute
     end
   end
 end
end
