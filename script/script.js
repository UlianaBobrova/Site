
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
countTimer('27 april 2020');

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

toggleMenu();

//popup

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
                count += 0.2;
    
                    if (count >= 1) {
                        clearInterval(opInterval);  
                    }
            }, 100);
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

togglePopUp();

//Табы

const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
    tab = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

//функция меняющая контент, перебирает все табы,показывает выбранный, передаем в нее индекс нашего таба
const toggleTabContent = (index) => {
    for(let i = 0; i < tabContent.length; i++) {
//полученный индекс сравниваем с индексом tab
        if(index === i) {
            //таб с таким индексом будет показываться на странице
            tab[i].classList.add('active');
            tabContent[i].classList.remove('d-none');
        } else {
            tab[i].classList.remove('active');
            tabContent[i].classList.add('d-none');
        }
    }
};

//второй вариант этой функции 20 урок 18 минута. С методом closest()
    tabHeader.addEventListener('click', (event) => {
        let target = event.target;

            while(target !== tabHeader) {
                //проверяем, что кликнули именно по tab
                if (target.classList.contains('service-header-tab')) {
            //проверяем на какой tab мы кликнули
                tab.forEach((item, i) => {
                //если элемент соответствует нашему target
                    if(item === target) {
                    toggleTabContent(i);
                    }
                });
                return;
            }
//в while проверили,что target не является tabHeader,зашли в цикл,если target не с классом service-header-tab,даем target класс родителя
                target = target.parentNode;
            }
    });

};

tabs();






});