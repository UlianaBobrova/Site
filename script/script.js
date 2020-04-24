
window.addEventListener('DOMContentLoaded', function(){
'use strict';
 
//Таймер
function countTimer(deadLine) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');


    function getTimeRemaining() {

      let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
 //разница между этими датами. Получаем секунды из млсек
        timeRemaining = (dateStop - dateNow) / 1000,

 //Вычисляем часы, минуты и сек до deadLine
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        
        return {timeRemaining, seconds, minutes, hours};
    }

    function updateClock() {

        let timer = getTimeRemaining();
        let timeInterval = setInterval(updateClock, 1000);

        timerHours.textContent = timer.hours;
        timerHours.innerHTML = ('0' + timer.hours).slice(-2);
        timerMinutes.textContent = timer.minutes;
        timerMinutes.innerHTML = ('0' + timer.minutes).slice(-2);
        timerSeconds.textContent = timer.seconds;
        timerSeconds.innerHTML = ('0' + timer.seconds).slice(-2);  
   
        if (timer.timeRemaining <= 0) {
            clearInterval(timeInterval);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }    
    }

updateClock();

}
countTimer('25 april 2020');

//Меню
const toggleMenu = () => {

//ищем элементы
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItem = menu.querySelectorAll('ul>li');

//скрывание меню
        const handlerMenu = () => {
            //toggle - убирает или добавляет прописанный в скобках класс
            menu.classList.toggle('active-menu'); //анимированное меню

            // if(!menu.style.transform || menu.style.transform === 'translate(-100%)') {
            //     menu.style.transform = 'translate(0)';
            // } else{
            //     menu.style.transform = 'translate(-100%)';
            // }    
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        //Нажимаем на пункты меню -> меню скрывается
        menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu));
            
};


toggleMenu();


//popup
const togglePopUp = () => {
    //получает popup окна
    const popup = document.querySelector('.popup'),
    //получаем popup кнопки
    popupBtn = document.querySelectorAll('.popup-btn'),
    //получаем крестик на popup окне
    popUpClose = document.querySelector('.popup-close'),
    popupContent = document.querySelector('.popup .popup-content');
  
   
//Анимация кнопок, свойство opacity
    let popupOpacity = () => {
        if(screen.width > 768) {
            let count = 0;
            let opInterval = setInterval (() => {   
                popup.style.display = 'block';
                popupContent.style.opacity = count;
                count += 0.3;
    
                    if (count >= 1) {
                        clearInterval(opInterval);  
                    }
            }, 80);
        } else {
            popup.style.display = 'block';
        }
    };

//Нажатие на кнопки
    popupBtn.forEach((elem) => 
    // elem.addEventListener('click', () => {
    //     popup.style.display = 'block';
        elem.addEventListener('click', popupOpacity));
    
//Закрытие модального окна    
    popUpClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
};

togglePopUp();









});