def the purpose_name
  "[data-purpose=#{purpose_name}]"
end

def click selector
  find( selector ).click
end
