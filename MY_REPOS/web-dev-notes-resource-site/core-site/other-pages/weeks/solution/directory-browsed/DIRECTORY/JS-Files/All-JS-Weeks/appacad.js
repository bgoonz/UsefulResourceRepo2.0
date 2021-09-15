window.addEventListener('DOMContentLoaded', e => {
    const nodeList = document.querySelectorAll(".masthead__btn-icons"); 
    const gear = nodeList[nodeList.length-1]; 
    const menu = document.querySelector(".pref");
    const searchIcon = nodeList[1];
    const input = document.querySelector(".masthead__menu-and-search-input");
    const hamburger = nodeList[0]; 
    const sideBar = document.querySelector(".sidebar");
    const sideBarInteractive = document.querySelector(".sidebar__interactive")
    const sideBarSubmenu = document.querySelector(".sidebar__submenu");

    gear.addEventListener('click', e => {
        if (menu.classList.contains("pref--hidden")) {
            menu.classList.remove("pref--hidden");
        } else {
            menu.classList.add("pref--hidden"); 
        }
    });
    menu.addEventListener('click', e => {
        menu.classList.add("pref--hidden");
    });

    searchIcon.addEventListener('click', e => {
        if (input.classList.contains("masthead__menu-and-search-input--hidden")) {
            input.classList.remove("masthead__menu-and-search-input--hidden");  
        } else {
            input.classList.add("masthead__menu-and-search-input--hidden"); 
        }
    });

    hamburger.addEventListener('click', e => {
        if (sideBar.classList.contains("sidebar--hidden")) {
            sideBar.classList.remove("sidebar--hidden");
            sideBarInteractive.addEventListener('click', e => {
                if (sideBarSubmenu.classList.contains("sidebar__submenu--hidden")) {
                    sideBarSubmenu.classList.remove("sidebar__submenu--hidden");
                } else {
                    sideBarSubmenu.classList.add("sidebar__submenu--hidden");
                }
            })
        } else {
            sideBar.classList.add("sidebar--hidden"); 
        }
    });

});