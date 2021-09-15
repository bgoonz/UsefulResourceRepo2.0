# A sample Guardfile
# More info at https://github.com/guard/guard#readme

group :specs do

  guard 'rspec', focus_on_failed: false do
    watch(%r{^spec/**/.+_spec\.rb$})
    watch(%r{^models/(.+)\.rb$})  { |m| "spec/models/#{m[1]}_spec.rb" }
    # watch(%r{^lib/(.+)\.rb$})     { |m| "spec/lib/#{m[1]}_spec.rb" }
    watch('spec/spec_helper.rb')  { "spec" }
    watch(%r{^lib/.+\.rb})
  end
  # guard 'cucumber', cli: '--format progress 2> tmp/errors.log' do
  guard 'cucumber', cli: '--format pretty' do
    watch(%r{^features/.+\.feature$})
    watch(%r{^models/(.+)\.rb$})  { |m| "features/#{m[1]}.feature" }
    watch(%r{^features/support/.+$}) { 'features' }
    watch(%r{^features/step_definitions/(.+)_steps\.rb$}) { |m| Dir[File.join("**/#{m[1]}.feature")][0] || 'features' }
    watch(%r{^lib/.+\.rb}){ 'features' }
  end

end


group :livereload do
  guard 'livereload' do
    watch(%r{views/.+\.(erb|haml|slim)$})
    # watch(%r{app/helpers/.+\.rb})
    watch(%r{assets/stylesheets/(.*)\.sass}) { |m| "/#{m}.css" }
    # watch(%r{config/locales/.+\.yml})
    # watch(%r{(assets/stylesheets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
  end
end