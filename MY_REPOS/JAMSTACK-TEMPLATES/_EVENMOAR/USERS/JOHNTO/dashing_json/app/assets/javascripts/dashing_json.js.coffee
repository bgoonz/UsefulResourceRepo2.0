# Let's make the json extra pretty.
#
# Adapted from Pumbaa80's answer on:
# http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript

$ ->
  json.syntaxHighlight()
  
  
json =
  syntaxHighlight: ->
    for jsonElem in $('.dashing-json-raw')
      do (jsonElem) ->
        jsonData = $(jsonElem).attr('data-dashing-json')
        if(typeof jsonData != 'string') 
          jsonData = JSON.stringify(jsonData, undefined, 2)
        jsonData = jsonData.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        $('.dashing-json-parsed').append(json.doSyntaxHighlighting(jsonData))
  
  doSyntaxHighlighting: (jsonData) ->
    jsonData.replace /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) -> 
      if(/^"/.test(match))
        cls = if /:$/.test(match) then 'key' else 'string'
      else if(/true|false/.test(match))
        cls = 'boolean'
      else if (/null/.test(match))
        cls = 'null'
      else if (/[0-9]+/.test(match))
        cls = 'number'

      return '<li class="' + cls + '">' + match + '</li>'
