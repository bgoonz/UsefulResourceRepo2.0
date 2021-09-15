ready = ->
  typedBody = $('#elemenTyped').data('text')
  Typed.new '#elemenTyped',
    strings: [
      typedBody
    ],
    typeSpeed: 0,
    backSpeed: 0
  return

$(document).ready ready
$(document).on 'turbolinks:load', ready
