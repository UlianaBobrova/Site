'use strict';
const togglePopUp = () => {
    //получает popup окна
    const popup = document.querySelector('.popup'),
    //получаем popup кнопки
        popupBtn = document.querySelectorAll('.popup-btn');
        console.log(popupBtn);
    //получаем крестик на popup окне
    // popUpClose = document.querySelector('.popup-close'),
        const popupContent = document.querySelector('.popup .popup-content');
        
//Анимация кнопок, свойство opacity
    let popupOpacity = () => {
        if(screen.width > 768) {
            let count = 0;
            let modalInterval;
            let modalAnimate = function() {
                modalInterval = requestAnimationFrame(modalAnimate);
                if(count <= 1.2) {
                    popup.style.display = 'block';
                    popupContent.style.opacity = count;
                    count += 0.02;
                    console.log(count);
                } else {
                    cancelAnimationFrame(modalInterval);
                }
            };
            modalInterval = requestAnimationFrame(modalAnimate);
        } else {
           popup.style.display = 'block';
        }
    };

//Закрытие модального окна    
    popup.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('popup-close')){
            popup.style.display = 'none';

        } else {
            target = target.closest('.popup-content');
            if(!target) {
                popup.style.display = 'none';
            }
        }      
    });
//Нажатие на кнопки
    popupBtn.forEach((elem) => 
        elem.addEventListener('click', popupOpacity));
};


export default togglePopUp;