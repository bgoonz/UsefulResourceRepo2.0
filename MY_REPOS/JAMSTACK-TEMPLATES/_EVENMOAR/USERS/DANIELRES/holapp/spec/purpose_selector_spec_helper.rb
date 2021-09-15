def the(purpose)
  "[data-purpose=#{purpose}]"
end

def have_the purpose
  have_css "[data-purpose=#{purpose}]"
end
