function(
  s // audio source
){
    return(s=new Audio(s)) // create instance, using source
        .play(), // play
         s       // return instance for other stuff
}