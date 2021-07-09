function(s,l){
   with(new Image) // my lovely ugly hack
       onload=onerror=function(){
           l(this) // pass image to callback
       },
   src=s // set src
}

// shorter one with `this` binding to Image instance in callback by @p01
// function(s,l){with(new Image)onload=onerror=l,src=s}