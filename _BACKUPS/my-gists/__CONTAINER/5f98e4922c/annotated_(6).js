function(
  m, // method - get, post, whatever
  u, // url
  c, // [callback] if passed -> asych call
  d, // [post_data]
  x
){
    with(x=new XMLHttpRequest)
        return onreadystatechange=function(){ // filter only readyState=4 events
            readyState^4||c(this) // if callback passed and readyState == 4 than trigger Callback with xhr object
        },
        open(m,u,c), // open connection with Method and Url and asyCh flag
        send(d), // send Data
        x
}