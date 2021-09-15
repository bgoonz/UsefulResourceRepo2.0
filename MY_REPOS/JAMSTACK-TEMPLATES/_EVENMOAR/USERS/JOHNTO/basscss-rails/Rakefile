require 'bundler/gem_tasks'
require 'fileutils'

task :download do
  puts 'Updating basscss files'
  system 'npm i --save basscss-sass --prefix ./'
end

task :copy do
  puts 'Installing basscss files'
  FileUtils.remove_dir 'app/assets/stylesheets/basscss', :force
  FileUtils.mkdir 'app/assets/stylesheets/basscss'
  FileUtils.cp_r Dir.glob('node_modules/basscss-sass/scss/*.scss'), 'app/assets/stylesheets/basscss/'
end

task :update => [:download, :copy]
