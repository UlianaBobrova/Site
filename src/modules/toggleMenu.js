'use strict';
const toggleMenu = () => {

    //ищем элементы
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul > li');
    
    //скрывание меню
            const handlerMenu = () => {
                //toggle - убирает или добавляет прописанный в скобках класс
                if(!menu.style.transform || menu.style.transform === 'translate(-100%)') {
                    if(!menu.classList.toggle('active-menu')){
                        menu.classList.toggle('active-menu');
                    }  
                    menu.style.transform = 'translate(0)';
                    } else{
                    menu.style.transform = 'translate(-100%)';            
                }    
            };
     
            btnMenu.addEventListener('click', handlerMenu);
      
            menu.addEventListener('click', (event) => {
                let target = event.target;
    
                if (target.classList.contains('close-btn')){
                    menu.style.transform = 'translate(-100%)';
                    //menu.classList.remove('active-menu');
                } else {
                target = target.closest('menu');
                menu.style.transform = 'translate(-100%)'; 
            } 
                // if (!target) {
                // menu.style.transform = 'translate(-100%)';   }
        });
        
            //closeBtn.addEventListener('click', handlerMenu);
            //Нажимаем на пункты меню -> меню скрывается
            //menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu);             
    };
    

    export default toggleMenu;