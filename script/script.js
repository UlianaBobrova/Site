
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
    const portfolio = document.querySelector('.portfolio');
    let dotClass = portfolio.querySelector('.portfolio-dots');
    const slider = document.querySelector('.portfolio-content');
    let dot = dotClass.querySelectorAll('ul > li');
    
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

// addDots(); 
    const addDots = () => {

        for (let i = 0; i < slide.length; i++) {

        dot = document.createElement('li');
        dot.classList.add('dot');
        dotClass.append(dot);
      
        dot = portfolio.querySelectorAll('.dot');
        dot[currentSlide].classList.add('dot-active');
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
    //const commandPeople = document.querySelector('#command');
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

//Калькулятор

// const checkInput = () => {
//     const inpute = document.querySelectorAll('input');

//     input.forEach((elem) => elem.addEventListener('input', (event) => {
//         event.target.value = event.target.value.replace(/\D/gi, '');
//     })
//     );
// };

// counter();

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
    let total = 0,
    countValue = 1,
    dayValue = 1;
    //находим выбранный нами селект,выводим нужную нам options через соответствующий индекс
    const typeValue = calcType.options[calcType.selectedIndex].value,
         squareValue = +calcSquare.value;

//если количество помещений > 1, то получаем десятую долю         
        if(calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
        }

//срок исполнения. CalсDay вообще существует и <5 или <10
        if(calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
        }else if(calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
        }    
//пока пользователь не заполнит 2 первых поля, в total должен выводиться 0
        if(typeValue && squareValue) {
        total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        } 

    //вывод на страницу
        totalValue.textContent = total;
    };
        
    calcBlock.addEventListener('change', (event) => {
            const target = event.target;
//1-ый способ: ищем класс, на котором произошло событие, перечислив все 4 эл-та
            // if (target.matches('.calc-type') || target.matches('.calc-square') ||
            // target.matches('.calc-day') || target.matches('.calc-count')) {
            // }
//2-ой способ: сравниваем таргет с полученными элементами
            // if(target === calcType || target === calcSquare || target === calcDay ||
            //      target === calcCount) {
            //          console.log(1);
            //      }
//3-ий способ - проверяем на тег select и инпута
        if(target.matches('select') || target.matches('input')) {
                //функция,которая считает итоговую цену
            countSum();
            }

    });
    };
//при вызове калькулятора передаем ему цену price
    calc(100);

//очистка input-ов
    const clearInput = () => {
        document.querySelectorAll('input').forEach((item) => {
            item.value = ''; 
        });
    };
   
    //send-ajax-form
    const sendForm = () => {
//переменные с сообщениями,которые мы будем передавать пользователю
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
           
        //const form = document.getElementById('form1');
        const forms = document.querySelectorAll('form');
        const inputEmail = document.querySelectorAll('.form-email');
        const inputTel = document.querySelectorAll('.form-phone');
        const inputName = document.querySelectorAll('.form-name');
        const inputMessage = document.querySelector('.mess');
     
        // const loadMessage1 = document.querySelector('#fountainG');
        // loadMessage1.style.display = 'none';
        //создаем элемент для прелоадера
        // const preload1 = document.createElement('div');
        // preload1.classList.add('#fountainG_1');

        inputEmail.forEach((elem) => elem.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^a-z\.\-\+\@\_0-9]/gi, '');
            })
        );

        inputTel.forEach((elem) => elem.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^0-9+]/gi, '');
            })
        );

        inputName.forEach((elem) => elem.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
            })         
        );

        inputMessage.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
        });

//div для хранения сообщений для пользователя
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        const preloadTotal = document.createElement('div');
        preloadTotal.id = 'fountainG';
        const preload1 = document.createElement('div');
        preload1.id = 'fountainG_1';
        preload1.classList.add('fountainG');
        preloadTotal.appendChild(preload1);
        const preload2 = document.createElement('div');
        preload2.id = 'fountainG_2';
        preload2.classList.add('fountainG');    
        preloadTotal.appendChild(preload2);
        const preload3 = document.createElement('div');
        preload3.id = 'fountainG_3';
        preload3.classList.add('fountainG');
        preloadTotal.appendChild(preload3);
        
//вешаем на форму обработчик события,срабатывает submit
        forms.forEach((elem) => elem.addEventListener('submit', (event) => {
            //отменяем стандартное поведение,чтобы страница не перезагружалась после кнопки submit
            event.preventDefault();
            elem.appendChild(statusMessage);
            elem.appendChild(preloadTotal);
            //когда состояние readyState поменялось с 0 появилось сообщение Загрузка...
            //statusMessage.textContent = loadMessage;
            preloadTotal.style.display = 'block';

            const formData = new FormData(elem);
            //Если серверу надо передать в JSON-формате,извлекаем данные из formData,переберем данные с цикле for of
            let body = {};
            //с помощью метода .entries вытащим значения из formData.Получаем массив
            for(let val of formData.entries()) {
            //Добавляем полученные данные в body. Значения с ключом.Получаем объект
                body[val[0]] = val[1];                   
            }
            // //делаем тоже самое с циклом forEach
            // formData.forEach((val, key) => {
            //     body[key] = val;
            // });  
            //в postData передаем body, callback-фун-ию(outputData-оповещение пользователя) 
            postData(body)
            
                    .then((response) => {
                        if(response.status !== 200) {
                            throw new Error('Status network not 200');
                        }
                        statusMessage.style.color = 'white';
                        preloadTotal.style.display = 'none';
                        statusMessage.textContent = successMessage;
                        setTimeout(() => {statusMessage.textContent = ''}, 5000);
                    })
                    .catch((error) => {
                        statusMessage.style.color = 'white';
                        preloadTotal.style.display = 'none';
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            //     () => { 
            //     statusMessage.style.color = 'white';
            //     statusMessage.textContent = successMessage;
            //     }, 
            //     (error) => {
            //     statusMessage.style.color = 'white';
            //     statusMessage.textContent = errorMessage;
            //     console.error(error);
            //     }
            // );
            clearInput();
            })
        );
        
        //функция обращения к серверу
        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });   
        };
    //         return new Promise((resolve, reject) => {
    //         const request = new XMLHttpRequest();
    //         //readeyStateChange отслеживать после XMLHttpRequest,чтобы отслеживать процесс. Это событие возникает,когда меняется состояние readyState
    //         request.addEventListener('readystatechange', () =>{     
    //             if(request.readyState !== 4) {
    //                 return;
    //             }
    //             if(request.status === 200) {
    //                 resolve(request.status);
    //                 //outputData();   
    //             } else {
    //                 reject(request.statusText);
    //                 //errorData(request.status);
    //             }
    //         });

    //         //метод POST для отправки данных на сервер.URL-пишем путь до файла server.php 
    //         request.open('POST', './server.php');
    //         //настройка заголовков.Второй параметр-значение,надо указать,что мы данные отправляем с формы
    //         // request.setRequestHeader('Content-type', 'multipart/form-data');
    //         request.setRequestHeader('Content-type', 'application/json');
    //         //перед отправкой, надо данные получить при помощи javaScript.Это удобнее сделать через объект FormData,считывает все данные из формы,input,все,что содержится в форме и имеет формат name
          
    //         //открываем соединение и отправляем данные с помошью метода send
    //         // request.send(formData);

    //         //вместо formData будем отправлять body в формате JSON
    //         request.send(JSON.stringify(body));
    //         });

    //     };
    };

    sendForm();
});