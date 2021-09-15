class ApplicationController < ActionController::Base
  protect_from_forgery
  
  
  helper_method :random_pronouncable_password
  
  
  def random_pronouncable_password(size = 8)
    c = %w(b c d f g h j k l m n p qu r s t v w x z ch cr fr nd ng nk nt ph pr rd sh sl sp st th tr)
    v = %w(a e i o u y)
    f, r = true, ''
    (size * 2).times do
      r << (f ? c[rand * c.size] : v[rand * v.size])
      f = !f
    end
    r
  end 
  

  
end
