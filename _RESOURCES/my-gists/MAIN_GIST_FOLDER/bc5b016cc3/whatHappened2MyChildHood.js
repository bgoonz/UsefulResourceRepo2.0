class JobSearch {
 constructor(context, fun, ...magicConchWillIEnjoyThis){
     this.context = context;
       this.fun = fun;
       this.magicConchWillIEnjoyThis = (this.fun===this.context);
    }
 howAboutNow(){
     console.log(this.magicConchWillIEnjoyThis);
    }
}
let reality = new JobSearch ('jobHunt','NO','')
reality.howAboutNow()