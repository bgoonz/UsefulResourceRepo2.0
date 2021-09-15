function process(data) {
  
}
//{...}中的代码段执行完后销毁 
{
    let someReallyBigData = { };
    process(someReallyBigData);
}
var btn = document.getElementById("button");
btn.addEventListener("click", function click(evt) {
    console.log("clicked");
    process(evt.data);
}, false);