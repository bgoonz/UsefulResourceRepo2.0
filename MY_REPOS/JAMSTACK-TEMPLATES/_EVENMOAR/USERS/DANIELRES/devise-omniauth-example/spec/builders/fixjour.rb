require 'fixjour'

Fixjour do
  define_builder(User) do |klass, overrides|
    u = klass.new({:email => next_email_address, :name => 'P T', :password => 'password', :password_confirmation => 'password'}.merge(overrides))
    u.confirmed_at = Time.now
    u
  end
end

def next_email_address
  @@email_addr_cnt ||= 1
  @@email_addr_cnt += 1
  "x#{@@email_addr_cnt}@example.com"
end