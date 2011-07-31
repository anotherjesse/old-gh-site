require 'rake'
require 'nv'

desc "delete generated md files"
task :clean do
  File.delete('index.md')
  Dir.glob('notes/*.md') do |fn| 
    File.delete(fn)
  end
end

desc "recreate the md files after cleaning"
task :rebuild => :clean do
  nv = NV.new YAML.load(open('simplenote.yml'))
  nv.build
end

task :default => :rebuild

