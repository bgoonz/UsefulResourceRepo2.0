const root = document.documentElement;
const button = document.querySelector(".special-button");
const colorInput = document.querySelector("#choose-theme-color");
 
document.addEventListener("mousemove", e => {
    /* Frank's eyes */
    const Frank_x = e.clientX / innerWidth;
    const Frank_y = e.clientY / innerHeight;

    root.style.setProperty('--mouse-x', Frank_x);
    root.style.setProperty('--mouse-y', Frank_y);

    /* Button Gradient Effect */
    const Button_x = e.pageX - e.target.offsetLeft;
    const Button_y = e.pageY - e.target.offsetTop;    
 
    button.style.setProperty('--x', `${Button_x}px`);
    button.style.setProperty('--y', `${Button_y}px`);
});

/* Themed Site */
colorInput.addEventListener("change", function() {
    root.style.setProperty('--themeColor', this.value);
});