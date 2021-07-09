let sidebarTOCBtn = document.getElementById( 'sidebar-toc-btn' )
sidebarTOCBtn.addEventListener( 'click', function ( event ) {
  event.stopPropagation()
  if ( document.body.hasAttribute( 'html-show-sidebar-toc' ) ) {
    document.body.removeAttribute( 'html-show-sidebar-toc' )
  } else {
    document.body.setAttribute( 'html-show-sidebar-toc', true )
  }
} )
