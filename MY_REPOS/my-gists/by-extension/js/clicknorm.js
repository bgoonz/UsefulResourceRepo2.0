var clickType 

function normalizeClick(){
  try {  
    d.createEvent("TouchEvent") 
    clickType = 'touchend' 
    return true  
  }catch (e){  
   clickType = 'click' 
   return false  
  }  
}