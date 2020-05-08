const togglePopUp = () => {
    //получает popup окна
    const popup = document.querySelector('.popup'),
    //получаем popup кнопки
        popupBtn = document.querySelectorAll('.popup-btn'),
    //получаем крестик на popup окне
    // popUpClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup .popup-content');

        
//Анимация кнопок, свойство opacity
    let popupOpacity = () => {
        if(screen.width > 768) {
            let count = 0;
            let opInterval = setInterval (() => {   
                popup.style.display = 'block';
                popupContent.style.opacity = count;
                count += 0.02;
    
                    if (count >= 1.2) {
                        clearInterval(opInterval);  
                    }
            }, 20);
        } else {
            popup.style.display = 'block';
        }
    };

//Нажатие на кнопки
    popupBtn.forEach((elem) => 
        elem.addEventListener('click', popupOpacity));
    
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
};


export default togglePopUp;