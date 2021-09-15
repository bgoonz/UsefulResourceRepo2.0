function getBordersInViewport(element) {
    var boundingClientRect = element.getBoundingClientRect(),
        viewportWidth = innerWidth,
        viewportHeight = innerHeight;

    var bordersViewport = {
        top: boundingClientRect.top >= 0 && boundingClientRect.top <= innerHeight,
        right: boundingClientRect.right >= 0 && boundingClientRect.right <= viewportWidth,
        bottom: boundingClientRect.bottom >= 0 && boundingClientRect.bottom <= innerHeight,
        left: boundingClientRect.left >= 0 && boundingClientRect.left <= viewportWidth,
        all: false
    };
    
    if (!bordersViewport.top || !bordersViewport.bottom) {
        bordersViewport.left = bordersViewport.right = false;
    } else if (!bordersViewport.left || !bordersViewport.right) {
        bordersViewport.top = bordersViewport.bottom = false;
    }
    
    bordersViewport.all = bordersViewport.top && 
                          bordersViewport.right && 
                          bordersViewport.bottom && 
                          bordersViewport.left;
    
    return bordersViewport;
}