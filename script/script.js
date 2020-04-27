
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

//Пишем слайдер

const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
    btn = document.querySelectorAll('portfolio-btn');
    let dotClass = document.querySelector('.portfolio-dots');
    let dot = document.querySelectorAll('ul > li');
    // console.log(dot);
    const slider = document.querySelector('.portfolio-content');

    //номер активного слайда
    let currentSlide = 0;
    //переменная для stopSlide
    let interval;
    
    //выносим удаление класса в отдельную функцию.Принимает 3 аргумента-элемент,индекс,класс,кот.хотим добавить\удалить
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

//добавляем точки к слайдам
//     const addDots = () => {
//         for (let i = 0; i < slide.length-1; i++) {
//         let newDot = dot[0].cloneNode();
//         newDot.classList.remove('dot-active');
//         dotClass.append(newDot);
//         dot = document.querySelectorAll('.dot');
//     };   
// };
// addDots(); 
    const addDots = () => {

        for (let i = 0; i < slide.length; i++) {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dotClass.appendChild(dot);
        dot = document.querySelectorAll('.dot');
        console.log(dot);
        dot.item(0).classList.add('dot-active');
 
            dot.forEach((elem) => {
           // elem.classList.add('dot');
            console.log(elem);
            });
        }        
    }; 

    addDots(); 

//функция для автоматического перелистывания слайдов
    const autoPlaySlide = () => {
        //у текущего слайда убираем класс active, добавляем его следующему
        //slide[currentSlide].classList.remove('portfolio-item-active');
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        //ограничиваем кол-во слайдов. Последнему текущему примваиваем самый первый слайд
        if (currentSlide >= slide.length){
            currentSlide = 0;
        }
        // slide[currentSlide].classList.add('portfolio-item-active');
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    //для запуска слайда. Можем принимать скорость переключения слайдов.Задаем параметр по умолчанию 3сек
    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    //для остановки слайда.При наведении на стрелочки и на точки останавливать слайдер
    const stopSlide = () => {
        clearInterval(interval);
    };

//Делаем логику между переключением слайдов по стрелкам и точкам
    slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

    //при клике на сам слайд вызывается класс.Ограничиваем вход условием, не выполняется дальнейшее, если кликаем НЕ на эти элементы
            if(!target.matches('#arrow-right, #arrow-left, .dot')) {
            return;
            }
//убираем активные классы у слайда
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

//если цель события была кнопка next,тогда мы прибавляем к current slide 1
            if(target.matches('#arrow-right')) {
        currentSlide++;
            }else if(target.matches('#arrow-left')){
        currentSlide--;
                } else if(target.matches('.dot')){
                    dot.forEach((elem, index) => {
                        if(elem === target){
                        currentSlide = index;
                        }
                    });
                }
    //для переключения слайдов по кругу
        if(currentSlide >= slide.length){
        currentSlide = 0;
        }
        if(currentSlide < 0) {
        currentSlide = slide.length -1;
        }
    //добавляем активные классы у слайда
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');

    });

//Обработчики событий(замирание слайда) при наведении мышки на стрелки и точки и увод мышки
    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        startSlide();
        }
    });

   startSlide(1500);
};

slider();

//Блок Наша команда

const command = () => {
    const commandPeople = document.querySelector('#command');
    let photo = document.querySelectorAll('.command__photo');
    
    photo.forEach((elem) => elem.addEventListener('mouseenter', (event) => {
    event.target.dataset.currentImg = event.target.src;
    event.target.src = event.target.dataset.img;
    })
  );

    photo.forEach((elem) => elem.addEventListener('mouseleave', (event) => {
    event.target.src = event.target.dataset.currentImg ;
    })
  );

};

command();

});