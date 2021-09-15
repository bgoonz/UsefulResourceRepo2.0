# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'compass' do
  #watch('^src/(.*)\.s[ac]ss')
  watch('^app/assets/stylesheets/(.*)\.s[ac]ss')
end

guard 'livereload' do
  watch(%r{app/.+\.(erb|haml)})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{(public/|app/assets).+\.(css|js|html)})
  #watch(%r{(app/assets/.+\.css)\.s[ac]ss}) { |m| m[1] }
  #watch(%r{(app/assets/stylesheets/.+\.css)\.s[ac]ss}) { |m| m[1] }
  watch(%r{(app/assets/.+\.js)\.coffee}) { |m| m[1] }
  watch(%r{config/locales/.+\.yml})
end
