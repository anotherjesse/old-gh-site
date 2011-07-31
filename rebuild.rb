require 'rubygems'
require 'simplenote'

class NV
  def initialize(creds)
    @api = SimpleNote.new
    @api.login creds['email'], creds['password']
  end

  def all_keys
    @api.get_index.select { |n| !n['deleted'] }.collect { |n| n['key'] }
  end

  def get_key(key)
    note = @api.get_note(key)
    lines = note.parsed_response.split("\n")
    title = lines.shift
    lines.shift if lines.first == ''
    shared = lines.first == 'www'
    lines.shift if shared
    body = lines.join("\n").strip

    return :created => note.headers['note-createdate'],
      :modified => note.headers['note-modifydate'],
      :title => title,
      :shared => shared,
      :path => "notes/" + title.downcase.gsub(/[^a-zA-Z0-9]+/, '-'),
      :body => body
  end

  def get_notes
    all_keys.collect { |k| get_key(k) }
  end

  def shared_notes
    get_notes.select { |n| n[:shared] }
  end

  def build
    notes = shared_notes
    notes.each { |n| build_note(n) }
    build_index(notes)
  end

  def build_note(note)
    open(note[:path] + '.md', 'w') do |f|
      f.write "---\n"
      f.write "title: #{note[:title]}\n"
      f.write "layout: note\n"
      f.write "date: #{note[:modified]}\n"
      f.write "---\n\n"
      f.write note[:body]
    end
  end

  def build_index(notes)
    open('index.md', 'w') do |f|
      f.write "---\n"
      f.write "layout: index\n"
      f.write "---\n\n"
      f.write '<ol class="posts home">'
      notes.each do |note|
        f.write "  <li>"
        f.write "   <span class='date'>Last Update: #{note[:modified]}</span>"
        f.write "    ▸ <a href='#{ note[:path] }.html'>#{ note[:title] }</a>"
        f.write "  </li>"
      end
      f.write "</ol>"
    end
  end

end

nv = NV.new YAML.load(open('simplenote.yml'))
nv.build
